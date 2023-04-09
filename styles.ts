import styled from 'styled-components/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: black;
`;

export const LogoView = styled.View`
  align-items: center;
  justify-content: flex-start;
  height: 30%;
  margin-top: 10%;
`;

export const Logo = styled.Image`
  height: 100%;
`;

export const InputView = styled.View`
  align-items: center;
  height: 25%;
  width: 100%;
  justify-content: space-evenly;
`;

export const UrlInput = styled.TextInput`
  height: 25%;
  width: 80%;
  background-color: #ffffff;
  border-radius: 8px;
  font-size: 16px;
`;

export const NameInput = styled.TextInput`
  height: 25%;
  width: 80%;
  background-color: #ffffff;
  border-radius: 8px;
  font-size: 16px;
`;

export const ButtonView = styled.View`
  align-items: center;
  height: 6%;
  width: 100%;
  margin-bottom: 10%;
`;

export const ShortButton = styled.TouchableOpacity`
  background-color: #5271ff;
  width: 80%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
`;

export const ShortButtonText = styled.Text`
  font-size: 24px;
  color: #ffffff;
`;

export const ShortHistory = styled.ScrollView`
  background-color: #000000;
  width: 85%;
`;

export const ShortenedLinksView = styled.View`
  flex-direction: row;
  background-color: #ffffff;
  margin-bottom: 5%;
  justify-content: space-between;
  border-radius: 8px;
`;

export const ShortenedLinksName = styled.Text`
  height: 30px;
  text-align: center;
  font-size: 16px;
  align-self: center;
  margin: 0 3% 0 3%;
  font-weight: bold;
  color: #000000;
`;

export const ShortenedLinks = styled.Text`
  height: 30px;
  text-align: center;
  font-size: 16px;
  align-self: center;
  color: #5271ff;
  font-weight: bold;
`;

export const CopyButton = styled.TouchableOpacity`
  height: 40px;
  justify-content: center;
`;

export const CopyIcon = styled(FontAwesome5)`
  color: #000000;
`;

export const ShareButton = styled.TouchableOpacity`
  height: 40px;
  margin: 0 15% 0 15%;
  justify-content: center;
`;

export const ShareIcon = styled(FontAwesome5)`
  color: #000000;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  width: 80%;
`;

export const ShareContainer = styled.View`
  width: 20%;
  flex-direction: row;
  align-self: flex-end;
  justify-content: flex-end;
`;
