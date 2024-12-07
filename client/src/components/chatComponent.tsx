// src/components/ChatComponent.tsx

import React, { useEffect, useState } from "react";
import cable from "../utils/actionCable";

interface ChatMessage {
  id: number;
  user: string;
  message: string;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received(data: ChatMessage) {
          setMessages((prev) => [...prev, data]);
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const sendMessage = () => {
    // Assuming you have a method to send messages via the channel
    // For example:
    // subscription.perform('speak', { message: input });
    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.user}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
