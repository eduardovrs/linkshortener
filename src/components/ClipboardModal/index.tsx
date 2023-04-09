import React from 'react';
import {Modal} from 'react-native';
import {IClipBoardModalProps} from './ClipBoardModal.structure';
import {
  ContainerModal,
  ModalTitle,
  ModalSubtitle,
  AcceptButton,
  ButtonView,
  DeclineButton,
  ButtonText,
} from './styles';

function ClipBoardModal({
  isModalOpened,
  setIsModalOpened,
  onPress,
}: IClipBoardModalProps) {
  return (
    <Modal
      visible={isModalOpened}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsModalOpened(false)}>
      <ContainerModal>
        <ModalTitle>Opa, encontramos um link copiado.</ModalTitle>
        <ModalSubtitle>Gostaria de encurtá-lo?</ModalSubtitle>
        <ButtonView>
          <AcceptButton onPress={onPress}>
            <ButtonText>Gostaria</ButtonText>
          </AcceptButton>
          <DeclineButton onPress={() => setIsModalOpened(false)}>
            <ButtonText>Não, obrigado</ButtonText>
          </DeclineButton>
        </ButtonView>
      </ContainerModal>
    </Modal>
  );
}

export default ClipBoardModal;
