import styled from 'styled-components/native';

export const ContainerModal = styled.View`
  height: 40%;
  background-color: #ffffff;
  align-items: center;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  flex-direction: column;
  top: 70%;
`;

export const ModalTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin: 10% 0 5% 0;
`;

export const ModalSubtitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

export const ButtonView = styled.View`
  width: 80%;
  margin-top: 5%;
`;

export const AcceptButton = styled.TouchableOpacity`
  height: 25%;
  background-color: #5271ff;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  margin-bottom: 5%;
`;

export const DeclineButton = styled.TouchableOpacity`
  height: 25%;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  border: 3px solid black;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
