// src/components/AvatarSelector/styles.ts
import styled from "styled-components";

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const AvatarOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 10px;
`;

export const AvatarImage = styled.img<{ selected: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: ${(props) =>
    props.selected ? "3px solid #3498db" : "2px solid #ccc"};
  cursor: pointer;
  transition: border 0.3s;

  &:hover {
    border: 3px solid #3498db;
  }
`;

export const UploadInput = styled.input`
  margin-top: 10px;
`;
