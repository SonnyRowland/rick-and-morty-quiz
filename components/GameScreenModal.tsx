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
import { useNavigation } from "@react-navigation/native";

import { TOTAL_QUESTIONS } from "@/constants";
import { useGame } from "@/context/GameContext";
import { NavigationProp } from "@/types";

type GameScreenModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  result: boolean;
  correctAnswer?: string;
};

export const GameScreenModal = (props: GameScreenModalProps) => {
  const { showModal, setShowModal, result } = { ...props };

  const { questionNumber } = useGame();
  const navigator = useNavigation<NavigationProp>();

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
            {result ? "Well done! " : "Unlucky. "}
            {props.correctAnswer && (
              <Text>The correct answer was {props.correctAnswer}</Text>
            )}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => {
              if (questionNumber <= TOTAL_QUESTIONS) {
                setShowModal(false);
              } else {
                navigator.reset({
                  index: 0,
                  routes: [{ name: "Results" }],
                });
                return;
              }
            }}
          >
            <ButtonText>
              {questionNumber <= TOTAL_QUESTIONS
                ? "Next Question"
                : "See Results"}
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
