// src/channels/consumer.ts

import ActionCable from "actioncable";
import store from "../store"; // Import the Redux store

const token = store.getState().user.token;

const cable = ActionCable.createConsumer(
  `ws://localhost:3000/cable?token=${token}`
);

export default cable;
