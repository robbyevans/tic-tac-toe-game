// src/types/index.ts
export interface IUser {
  id: number;
  username: string;
  avatar_url?: string;
  email?: string;
  stars: number;
  last_seen_at?: string;
}

export interface IMove {
  player_id: number;
  move: number;
}

export interface IGame {
  id: number;
  player1_id: number;
  player2_id: number | null;
  winner_id: number | null;
  status: "waiting" | "ongoing" | "finished";
  moves: IMove[];
}

export interface IInvitation {
  id: number;
  sender_id: number;
  sender_username: string;
  sender_avatar_url?: string;
  status: string;
}

export interface IChatMessage {
  id: number;
  user: string;
  message: string;
}
