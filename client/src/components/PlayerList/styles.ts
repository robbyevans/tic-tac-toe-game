// src/components/PlayerList/styles.ts
import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
  max-width: 600px;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

export const Username = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

export const Stars = styled.span`
  font-size: 0.9rem;
  color: #f1c40f;
`;

export const InviteButton = styled.button`
  padding: 5px 10px;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #27ae60;
  }
`;

export const StatusDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-left: 10px;
`;
