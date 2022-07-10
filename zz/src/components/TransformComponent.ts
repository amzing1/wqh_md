import { Position, Rotation, Scale } from "../../types/type";
import { Actor } from "../Actor";
import { Scene } from "../Scene";
import { BulletController } from "../scripts/ButtetController";
import { Component } from "./Component";
import { SpriteComponent } from "./SpriteComponent";

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
  }


  computeChildTransform(actor: Actor) {
    const transform = actor.getComponent('Transform') as TransformComponent;
    transform.position.x += this.position.x;
    transform.position.y += this.position.y;
    const bulletController = actor.getComponent('BulletController') as BulletController;
    if (bulletController) {
      bulletController.initSpeed();
    }
  }
}
