import React from 'react';
import {
  Container,
  LogoView,
  Logo,
  InputView,
  UrlInput,
  NameInput,
  ButtonView,
  ShortButton,
  ShortButtonText,
  ShortHistory,
  CopyButton,
  CopyIcon,
  ShareButton,
  ShareIcon,
  ShortenedLinks,
  ShortenedLinksView,
  ShortenedLinksName,
  TextContainer,
  ShareContainer,
  ShortHistoryTile,
} from './styles';
import {IShortenedLinksProps} from './App.structure';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetUserShortedLinks from './src/services/GetShortedLinksService';
import Clipboard from '@react-native-community/clipboard';
import {Share} from 'react-native';
import ClipBoardModal from './src/components/ClipboardModal';

function App() {
  const [url, setUrl] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [isLoading, setiIsLoading] = React.useState<boolean>(false);
  const [isValidClipBoard, setIsValidClipBoard] =
    React.useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);
  const [state, setState] = React.useState<boolean>(true);
  const [clipBoardURL, setClipBoardURL] = React.useState<string>('');
  const [shortenedLinks, setShortenedLinks] = React.useState<
    IShortenedLinksProps[]
  >([]);

  const storeLinkInfo = React.useCallback(
    async (info: IShortenedLinksProps) => {
      try {
        const storedData = await AsyncStorage.getItem('@LINKINFO');
        const storedinfo = storedData ? JSON.parse(storedData) : [];
        const formatedStoredInfo = [...storedinfo, info];
        await AsyncStorage.setItem(
          '@LINKINFO',
          JSON.stringify(formatedStoredInfo),
        );
        setName('');
        setUrl('');
        setState(!state);
      } catch (error) {
        console.log('AsyncStorage setInfo error', error);
      }
    },
    [state],
  );

  const getStoredLinkInfo = React.useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@LINKINFO');
      const formattedInfo = jsonValue != null ? JSON.parse(jsonValue) : null;
      setShortenedLinks(formattedInfo);
    } catch (error) {
      console.log('AsyncStorage getInfo error', error);
    }
  }, []);

  const shortenUrl = React.useCallback(async () => {
    if (url.includes('https://') || url.includes('http://')) {
      setiIsLoading(true);
      try {
        const response = await GetUserShortedLinks.getShortedLinks(url);
        if (!response) {
          setiIsLoading(false);
          return;
        }
        storeLinkInfo({url: response, name: name});
      } catch (error) {
        console.log(error);
        return;
      }
      setiIsLoading(false);
    }
  }, [name, storeLinkInfo, url]);

  const shortenedUrl = React.useMemo(() => {
    return shortenedLinks?.map(item => {
      const shareLink = async () => {
        const shareInfoObj = {
          message: `Este é seu link encurtado:
          ${item.name} - ${item.url}`,
          title: 'LinkShortener',
        };
        const result = await Share.share(shareInfoObj, {
          dialogTitle: 'Link encurtado',
        });
        return result;
      };
      return (
        <ShortenedLinksView key={item.name}>
          <TextContainer>
            <ShortenedLinksName>{item.name}:</ShortenedLinksName>
            <ShortenedLinks>{item.url}</ShortenedLinks>
          </TextContainer>
          <ShareContainer>
            <CopyButton onPress={() => Clipboard.setString(item.url)}>
              <CopyIcon name={'copy'} size={20} />
            </CopyButton>
            <ShareButton onPress={shareLink}>
              <ShareIcon name={'share-alt'} size={20} />
            </ShareButton>
          </ShareContainer>
        </ShortenedLinksView>
      );
    });
  }, [shortenedLinks]);

  const getUserCurrentClipBoard = React.useCallback(async () => {
    const currentClipBoard = await Clipboard.getString();
    if (
      currentClipBoard.includes('https://') ||
      currentClipBoard.includes('http://')
    ) {
      setIsValidClipBoard(true);
    }
    if (currentClipBoard !== clipBoardURL && isValidClipBoard) {
      setClipBoardURL(currentClipBoard);
      setIsModalOpened(true);
    }
  }, [clipBoardURL, isValidClipBoard]);

  React.useEffect(() => {
    getStoredLinkInfo();
    getUserCurrentClipBoard();
  }, [getStoredLinkInfo, state, getUserCurrentClipBoard]);

  return (
    <Container>
      <LogoView>
        <Logo source={require('./src/assets/LinkShortener.png')} />
      </LogoView>
      <InputView>
        <UrlInput
          value={url}
          placeholder={'Digite a URL a ser encurtada'}
          placeHolderTexrColor="#393939"
          onChangeText={(text: string) => setUrl(text)}
        />
        <NameInput
          value={name}
          placeholder={'Digite um nome para essa URL'}
          placeHolderTexrColor="#393939"
          onChangeText={(text: string) => setName(text)}
        />
      </InputView>
      <ButtonView>
        <ShortButton
          onPress={() => {
            shortenUrl();
          }}>
          <ShortButtonText>Encurtar</ShortButtonText>
        </ShortButton>
      </ButtonView>
      <ShortHistory showsVerticalScrollIndicator={false}>
        <ShortHistoryTile>Histórico</ShortHistoryTile>
        {shortenedUrl}
      </ShortHistory>
      <ClipBoardModal
        isModalOpened={isModalOpened}
        setIsModalOpened={setIsModalOpened}
        onPress={() => {
          setUrl(clipBoardURL);
          setIsModalOpened(false);
        }}
      />
    </Container>
  );
}

export default App;
