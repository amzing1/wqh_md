import { Position, Rotation, Scale } from "../../types/type";
import { Component } from "./Component";

export class TransformComponent extends Component {
  public position: Position;
  public rotation: Rotation;
  public scale: Scale;
  public maxLeft: number;
  public maxTop: number;
  constructor(
    position: Position = { x: 0, y: 0 },
    rotation: Rotation = 0,
    scale: Scale = { x: 1, y: 1 },
  ) {
    super();
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    this.setName('Transform');
    Promise.resolve(() => {
      const scene = this.getActor().getScene();
      if (!scene) {
        throw new Error('should add actor to a scene');
      }
      const { width, height } = scene.getSize();
      this.setBoundary(width, height);
    })
  }

  setBoundary(maxLeft: number, maxTop: number) {
    this.maxLeft = maxLeft;
    this.maxTop = maxTop;
  }
}
