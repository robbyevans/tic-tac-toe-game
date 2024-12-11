// src/components/ChatComponent/styles.ts
import styled from "styled-components";

export const ChatContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
`;

export const Messages = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 15px;
`;

export const Message = styled.div`
  margin-bottom: 10px;
  font-size: 1rem;
  color: #333;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ccd0d5;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`;

export const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    background-color: #1f6391;
  }

  &:disabled {
    background-color: #a0a5ab;
    cursor: not-allowed;
  }
`;
