import { Actor } from "../base/Actor";
import { Canvas } from "../base/Canvas";
import { Position, Rotation, Scale, ComponentType } from "../type/type";
import { Component } from "./Component";
import { SpriteImageComponent } from "./SpriteImage";

export class TransformComponent extends Component {
  private _position: Position;
  public rotation: Rotation;
  public scale: Scale;
  constructor(
    actor: Actor,
    position: Position = { x: 0, y: 0 },
    rotation: Rotation = 0,
    scale: Scale = { x: 1, y: 1 }
  ) {
    super(actor, ComponentType.TRANSFORM);
    this._position = position;
    this.rotation = rotation;
    this.scale = scale;
    this.setCenter(position.x, position.y);
  }

  get position(): Position {
    const { x, y } = this._position;
    return {
      x: x,
      y: Canvas.height - y,
    };
  }

  setPosition(x: number, y: number) {
    this._position = { x, y };
  }

  getCenter(): Position {
    const { x, y } = this.scale;
    return {
      x: this._position.x + x / 2,
      y: this._position.y - y / 2,
    } as Position;
  }

  getCenterInCanvas(): Position {
    let {x, y} = this.getCenter();
    y = Canvas.height - y;
    return {x, y};
  }

  setCenter(x: number, y: number) {
    this._position = {
      x: x - this.scale.x / 2,
      y: y + this.scale.y / 2,
    };
  }
}
