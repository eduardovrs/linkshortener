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
  DeleteButton,
  DeleteIcon,
} from './styles';
import {IShortenedLinksProps} from './App.structure';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetUserShortedLinks from './src/services/GetShortedLinksService';
import Clipboard from '@react-native-community/clipboard';
import {ActivityIndicator, Share, StatusBar, Text} from 'react-native';
import ClipBoardModal from './src/components/ClipboardModal';

function App() {
  const [url, setUrl] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [isLoading, setiIsLoading] = React.useState<boolean>(false);
  const [isValidClipBoard, setIsValidClipBoard] =
    React.useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);
  const [shouldShowError, setShouldShowError] = React.useState<boolean>(false);
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

  const removeStoredLink = React.useCallback(
    async (linkUrl: string) => {
      const jsonValue = await AsyncStorage.getItem('@LINKINFO');
      const previousLinks = jsonValue ? JSON.parse(jsonValue) : [];

      const removeLink = previousLinks.filter(
        (link: IShortenedLinksProps) => link.url !== linkUrl,
      );
      await AsyncStorage.setItem('@LINKINFO', JSON.stringify(removeLink));
      setShortenedLinks(removeLink);
      setState(!state);
    },
    [state],
  );

  const shortenUrl = React.useCallback(async () => {
    setShouldShowError(false);
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
  }, [name, storeLinkInfo, url]);

  function verifyUrl() {
    const isUrl =
      url.includes('http://') ||
      url.includes('https://') ||
      url.includes('www.');

    return isUrl ? shortenUrl() : setShouldShowError(true);
  }

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
        <ShortenedLinksView key={item.url}>
          <TextContainer>
            <ShortenedLinksName numberOfLines={1}>
              {item.name}:
            </ShortenedLinksName>
            <ShortenedLinks>{item.url}</ShortenedLinks>
          </TextContainer>
          <ShareContainer>
            <CopyButton onPress={() => Clipboard.setString(item.url)}>
              <CopyIcon name={'copy'} size={20} />
            </CopyButton>
            <ShareButton onPress={shareLink}>
              <ShareIcon name={'share-alt'} size={20} />
            </ShareButton>
            <DeleteButton onPress={() => removeStoredLink(item.url)}>
              <DeleteIcon name={'trash'} size={20} />
            </DeleteButton>
          </ShareContainer>
        </ShortenedLinksView>
      );
    });
  }, [removeStoredLink, shortenedLinks]);

  const getUserCurrentClipBoard = React.useCallback(async () => {
    const currentClipBoard = await Clipboard.getString();
    if (
      currentClipBoard.includes('https://') ||
      currentClipBoard.includes('http://') ||
      currentClipBoard.includes('www.')
    ) {
      setIsValidClipBoard(true);
    }
    if (isValidClipBoard && currentClipBoard !== clipBoardURL) {
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
      <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />
      <LogoView>
        <Logo source={require('./src/assets/LinkShortener.png')} />
      </LogoView>
      <InputView>
        {shouldShowError ? (
          <Text style={{color: '#ffffff'}}>Digite uma URL válida</Text>
        ) : null}
        <UrlInput
          value={url}
          placeholder={'Digite a URL a ser encurtada'}
          placeHolderTexrColor="#393939"
          onChangeText={(text: string) => setUrl(text)}
          autoCapitalize="none"
        />
        <NameInput
          value={name}
          placeholder={'Digite um nome para essa URL'}
          placeHolderTexrColor="#393939"
          onChangeText={(text: string) => setName(text)}
          autoCapitalize="none"
        />
      </InputView>
      <ButtonView>
        <ShortButton
          onPress={() => {
            verifyUrl();
          }}>
          {isLoading ? (
            <ActivityIndicator size="small" color={'#FFFFFF'} />
          ) : (
            <ShortButtonText>Encurtar</ShortButtonText>
          )}
        </ShortButton>
      </ButtonView>
      <ShortHistory showsVerticalScrollIndicator={false}>
        <ShortHistoryTile>Histórico</ShortHistoryTile>
        {shortenedUrl}
      </ShortHistory>
      <ClipBoardModal
        isModalOpened={isModalOpened}
        setIsModalOpened={setIsModalOpened}
        clipBoardURL={clipBoardURL}
        onPress={() => {
          setUrl(clipBoardURL);
          setIsModalOpened(false);
        }}
      />
    </Container>
  );
}

export default App;
