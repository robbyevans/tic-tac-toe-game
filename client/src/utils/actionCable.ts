// src/utils/actionCable.ts
import ActionCable from "actioncable";

let cable: ActionCable.Cable | null = null;

/**
 * Returns a singleton ActionCable consumer.
 * @param token - JWT token for authentication
 * @returns ActionCable.Cable instance
 */
const getCable = (token: string | null): ActionCable.Cable => {
  if (!cable) {
    const wsUrl =
      import.meta.env.VITE_ACTION_CABLE_URL || "ws://localhost:3000/cable";
    const url = token ? `${wsUrl}?token=${token}` : wsUrl;
    cable = ActionCable.createConsumer(url);
  } else {
    // If token changes, disconnect the existing cable and create a new one
    const currentUrl = cable.connection.url;
    const newUrl = token
      ? `${
          import.meta.env.VITE_ACTION_CABLE_URL || "ws://localhost:3000/cable"
        }?token=${token}`
      : import.meta.env.VITE_ACTION_CABLE_URL || "ws://localhost:3000/cable";
    if (currentUrl !== newUrl) {
      cable.disconnect();
      cable = ActionCable.createConsumer(newUrl);
    }
  }
  return cable;
};

export default getCable;
