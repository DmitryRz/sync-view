
import { PlayerAction, RoomEventType } from "@/types/websocket/enums.ts";

export type MessageResponseDto = {
  id: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
};

export type RoomEventDto = {
  userId: string;
  username: string;
  type: RoomEventType;
  timestamp: string;
};

export type VideoSignalDto = {
  action: PlayerAction;
  timestamp: number;
  playbackRate: number;
  sentAt: number;
  initiatorId: string;
};
