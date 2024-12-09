import ActionCable from "actioncable";

const createCable = (token: string | null) => {
  const wsUrl = "ws://localhost:3000/cable";
  if (!token) {
    console.warn("No token provided for ActionCable connection.");
    return ActionCable.createConsumer(wsUrl);
  }

  return ActionCable.createConsumer(`${wsUrl}?token=${token}`);
};

export default createCable;
