// src/components/InvitationModal.tsx

import React from "react";
import styled from "styled-components";

interface User {
  id: number;
  username: string;
  avatar_url?: string;
  stars: number;
}

interface InvitationModalProps {
  sender: User;
  acceptInvitation: () => void;
  declineInvitation: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Username = styled.h3`
  margin-bottom: 20px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const AcceptButton = styled.button`
  padding: 10px 20px;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #27ae60;
  }
`;

const DeclineButton = styled.button`
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;

const InvitationModal: React.FC<InvitationModalProps> = ({
  sender,
  acceptInvitation,
  declineInvitation,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Avatar src={sender.avatar_url} alt={`${sender.username}'s avatar`} />
        <Username>{sender.username} invites you to play Tic-Tac-Toe!</Username>
        <ButtonContainer>
          <AcceptButton onClick={acceptInvitation}>Accept</AcceptButton>
          <DeclineButton onClick={declineInvitation}>Decline</DeclineButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default InvitationModal;
