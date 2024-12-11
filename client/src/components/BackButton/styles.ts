// src/components/BackButton/styles.ts
import styled from "styled-components";

export const Button = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }

  &:active {
    background: #1f6391;
    transform: translateY(0);
  }
`;
