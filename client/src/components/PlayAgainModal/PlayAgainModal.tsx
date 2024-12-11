// src/components/PlayAgainModal/PlayAgainModal.tsx
import React from "react";
import * as S from "./styles";

interface PlayAgainModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

const PlayAgainModal: React.FC<PlayAgainModalProps> = ({
  onAccept,
  onDecline,
}) => {
  return (
    <S.ModalOverlay onClick={onDecline}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Rematch Request</h2>
        <p>Your opponent wants to play again. Accept?</p>
        <S.ButtonContainer>
          <S.AcceptButton onClick={onAccept}>Accept</S.AcceptButton>
          <S.DeclineButton onClick={onDecline}>Decline</S.DeclineButton>
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default PlayAgainModal;
