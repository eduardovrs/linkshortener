export interface IClipBoardModalProps {
  isModalOpened: boolean;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  clipBoardURL: string;
  onPress: () => void;
}
