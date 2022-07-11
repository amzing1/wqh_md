import { ComponentType, Position, Rotation, Scale } from "../../../types/type";
import { Component } from "./Component";
import { BulletController } from "../../scripts/ButtetController";
import { Actor } from "../Actor";


export class TransformComponent extends Component {
  public position: Position;
  public rotation: Rotation;
  public scale: Scale;
  constructor(position: Position, rotation: Rotation, scale: Scale)
  constructor(position: Position, rotation: Rotation, scale: Scale, actor: Actor)
  constructor(position: Position = { x: 0, y: 0 },rotation: Rotation = 0,scale: Scale = { x: 1, y: 1 }, actor?: Actor) {
    actor ? super(ComponentType.TRANSFORM, actor) : super(ComponentType.TRANSFORM);
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }


  computeChildTransform(actor: Actor) {
    const transform = actor.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    transform.position.x += this.position.x;
    transform.position.y += this.position.y;
    const bulletController = actor.getComponent('BulletController') as BulletController;
    if (bulletController) {
      bulletController.initSpeed();
    }
  }
}
