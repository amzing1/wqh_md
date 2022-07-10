import { Actor } from "../Actor";
import { Collider2DComponent } from "../components/Collider2D";
import { SpriteComponent } from "../components/SpriteComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Scene } from "../Scene";
import { ControllerComponent } from "./Controller";
import { EnemyController } from "./EnemyController";

export class EnemyActor extends Actor {
  constructor(name: string) {
    super(name);
  }
  static createEnemy() {
    if (!Scene.instance) {
      throw Error('no scene instance');
    }
    const { width, height } = Scene.instance.getSize();
    let y = -Math.random() * 100;
    let x = Math.random() * width;
    const planeTransform = new TransformComponent({ x, y }, Math.PI);
    const planeSprite = new SpriteComponent(Scene.ctx, new Image(), 'image/ship.png', 24, 24, 120, 0, 24, 24);
    const planeController = new EnemyController();
    const planeCollider = new Collider2DComponent(24, 24);

    const plane = new Actor('enemy');
    plane.addComponent(planeTransform);
    plane.addComponent(planeSprite);
    plane.addComponent(planeController);
    plane.addComponent(planeCollider);
    Scene.instance.addActor(plane);
  }
}