interface Position {
  x: number,
  y: number
}
type Rotation = number
type Scale = Position
type Speed = Position

enum ComponentType {
  TRANSFORM,
  SPRITE,
  CONTROLLER,
  COLLIDER_2D,
  AUDIO_PLAYER,
  ANIMATION,
  ANIMATION_STATE_MACHINE
}

enum Action {
  MOVE_LEFT,
  MOVE_RIGHT,
  JUMP
}

enum Shape {
  SQUARE,
  CIRCLE
}

export {
  Position,
  Rotation,
  Scale,
  Speed,
  ComponentType,
  Action,
  Shape
}