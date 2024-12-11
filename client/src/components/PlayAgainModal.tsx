import React from "react";
import styled from "styled-components";

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
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
`;

interface PlayAgainModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

const PlayAgainModal: React.FC<PlayAgainModalProps> = ({
  onAccept,
  onDecline,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Rematch Request</h2>
        <p>Your opponent wants to play again. Accept?</p>
        <Button
          style={{ background: "#2ecc71", color: "#fff" }}
          onClick={onAccept}
        >
          Accept
        </Button>
        <Button
          style={{ background: "#e74c3c", color: "#fff" }}
          onClick={onDecline}
        >
          Decline
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PlayAgainModal;
