import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "react-native";

type GameScreenModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  result: boolean;
};

export const GameScreenModal = (props: GameScreenModalProps) => {
  const { showModal, setShowModal, result } = { ...props };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" className="text-typography-950">
            {result ? "Correct" : "Incorrect"}
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Text className="text-typography-500">
            {result ? "Well done!" : "Unlucky."}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => {
              setShowModal(false);
            }}
          >
            <ButtonText>Next Question</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
