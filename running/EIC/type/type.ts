export interface Position {
  x: number;
  y: number;
}
export type Rotation = number;
export type Scale = Position;
export type Speed = Position;

export enum ComponentType {
  TRANSFORM,
  SPRITE,
  CONTROLLER,
  COLLIDER_2D,
  AUDIO_PLAYER,
  ANIMATION,
  ANIMATION_STATE_MACHINE,
  RIGID_BODY,
  LIGHT
}

export enum Action {
  MOVE_LEFT,
  MOVE_RIGHT,
  JUMP,
  SHOOT,
  LIGHT_ATTACK,
  HEAVY_ATTACK,
}

export enum Shape {
  SQUARE,
  CIRCLE,
}
