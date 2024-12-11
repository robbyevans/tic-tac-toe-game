// src/components/ChatComponent/ChatComponent.tsx
import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";
// import { addChatMessage } from "@src/slices/chatSlice";
import createCable from "@src/utils/actionCable";

interface ChatMessage {
  id: number;
  user: string;
  message: string;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  // const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!token) return;

    const cable = createCable(token);
    const subscription = cable.subscriptions.create("ChatChannel", {
      received(data: ChatMessage) {
        setMessages((prev) => [...prev, data]);
      },
    });

    return () => {
      subscription.unsubscribe();
      cable.disconnect();
    };
  }, [token]);

  const sendMessage = () => {
    if (!input.trim()) return;
    // Assuming you have a method to send messages via the channel
    // For example:
    // subscription.perform('speak', { message: input });
    // Here, we'll simulate sending
    const newMessage: ChatMessage = {
      id: messages.length + 1,
      user: "You",
      message: input,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <S.ChatContainer>
      <S.Messages>
        {messages.map((msg) => (
          <S.Message key={msg.id}>
            <strong>{msg.user}: </strong>
            {msg.message}
          </S.Message>
        ))}
      </S.Messages>
      <S.InputContainer>
        <S.Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <S.SendButton onClick={sendMessage}>Send</S.SendButton>
      </S.InputContainer>
    </S.ChatContainer>
  );
};

export default ChatComponent;
