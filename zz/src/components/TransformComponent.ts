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
    Promise.resolve().then(() => {
      const scene = Scene.instance;
      if (!scene) {
        throw new Error('should add a scene');
      }
      const sprite = this.getActor().getComponent('Sprite') as SpriteComponent;
      this.position.x -= sprite.width / 2;
      this.position.y -= sprite.height / 2;
      const { width, height } = scene.getSize();
      this.setBoundary(width, height);
    })
  }

  setBoundary(maxLeft: number, maxTop: number) {
    this.maxLeft = maxLeft;
    this.maxTop = maxTop;
  }

  computeChildTransform(actor: Actor) {
    const transform = actor.getComponent('Transform') as TransformComponent;
    const sprite = actor.getComponent('Sprite') as SpriteComponent;
    const { width, height } = sprite;
    transform.position.x += this.position.x + width / 2;
    transform.position.y += this.position.y + height / 2;
    const bulletController = actor.getComponent('BulletController') as BulletController;
    if (bulletController) {
      bulletController.initSpeed();
    }
  }
}
