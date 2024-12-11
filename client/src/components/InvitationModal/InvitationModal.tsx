// src/components/InvitationModal/InvitationModal.tsx
import React from "react";
import * as S from "./styles";
import { IUser } from "@src/types";

interface InvitationModalProps {
  sender: IUser;
  acceptInvitation: () => void;
  declineInvitation: () => void;
}

const InvitationModal: React.FC<InvitationModalProps> = ({
  sender,
  acceptInvitation,
  declineInvitation,
}) => {
  return (
    <S.ModalOverlay onClick={declineInvitation}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        {sender.avatar_url && (
          <S.Avatar
            src={sender.avatar_url}
            alt={`${sender.username}'s avatar`}
          />
        )}
        <S.Username>
          {sender.username} invites you to play Tic-Tac-Toe!
        </S.Username>
        <S.ButtonContainer>
          <S.AcceptButton onClick={acceptInvitation}>Accept</S.AcceptButton>
          <S.DeclineButton onClick={declineInvitation}>Decline</S.DeclineButton>
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default InvitationModal;
