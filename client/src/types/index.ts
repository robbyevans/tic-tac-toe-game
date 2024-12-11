// src/types/index.ts

export interface User {
  id: number;
  username: string;
  avatar_url?: string;
  email?: string;
  stars: number;
  last_seen_at?: string;
}

export interface Move {
  player_id: number;
  move: number;
}

export interface Game {
  id: number;
  player1_id: number;
  player2_id: number | null;
  winner_id: number | null;
  status: "waiting" | "ongoing" | "finished";
  moves: Move[];
}

export interface Invitation {
  id: number; // Update this
  sender_id: number;
  sender_username: string;
  sender_avatar_url?: string;
  status: string;
}
