// src/utils/actionCable.ts

import ActionCable from "actioncable";

// **Function to create a consumer with token**
const createCable = (token: string | null) => {
  if (!token) {
    console.warn("No token provided for ActionCable connection.");
    return ActionCable.createConsumer();
  }

  return ActionCable.createConsumer(`ws://localhost:3000/cable?token=${token}`);
};

export default createCable;
