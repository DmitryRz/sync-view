export const PlayerAction = {
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  SEEK: "SEEK",
  RATE_CHANGE: "RATE_CHANGE",
} as const;

export type PlayerAction = typeof PlayerAction[keyof typeof PlayerAction];

export const RoomEventType = {
  JOIN: "JOIN",
  LEAVE: "LEAVE",
} as const;

export type RoomEventType = typeof RoomEventType[keyof typeof RoomEventType];