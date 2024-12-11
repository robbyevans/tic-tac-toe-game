// src/components/InvitationModal/styles.ts
import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fffaf0;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border: 2px solid #ddd;
  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

export const Username = styled.h3`
  margin-bottom: 20px;
  color: #333;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  margin-top: 20px;
`;

export const BaseButton = styled.button`
  padding: 12px 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

export const AcceptButton = styled(BaseButton)`
  background-color: #2ecc71;
  color: #fff;

  &:hover {
    background-color: #27ae60;
  }
`;

export const DeclineButton = styled(BaseButton)`
  background-color: #e74c3c;
  color: #fff;

  &:hover {
    background-color: #c0392b;
  }
`;
