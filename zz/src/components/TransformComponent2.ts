import { Actor } from "../Actor";
import { Component } from "./Component";

export class TransformComponent extends Component {
  public position: Position;
  public rotation: Rotation;
  public scale: Scale;
  private maxLeft: number;
  private maxTop: number;
  constructor(
    position: Position = { x: 0, y: 0 },
    rotation: Rotation = { x: 0, y: 0 },
    scale: Scale = { x: 1, y: 1 }
  ) {
    super();
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }

  setBoundary(maxLeft: number, maxTop: number) {
    this.maxLeft = maxLeft;
    this.maxTop = maxTop;
  }
}
