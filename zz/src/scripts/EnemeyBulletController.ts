import { Speed } from "../../types/type";
import { Actor } from "../Actor";
import { Component } from "../components/Component";
import { ShapeComponent } from "../components/ShapeComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Scene } from "../Scene";

export class EnemyBulletController extends Component {
  private realSpeed: Speed;
  static bulletPool: Set<Actor>;
  constructor() {
    super();
    this.realSpeed = { x: 0, y: 5 };
    EnemyBulletController.bulletPool = new Set();
    this.setName('EnemyBulletController');
  }

  move() {
    const transform = this.getActor().getComponent('Transform') as TransformComponent;
    transform.position.y += this.realSpeed.y;
    const scene = Scene.instance as Scene;
    const { width, height } = scene.getSize();
    const { x, y } = transform.position;
    if (x < 0 || x > width || y > height) {
      EnemyBulletController.bulletPool.add(this.getActor());
      const parent = this.getActor().parent;
      if (parent) {
        parent.children.delete(this.getActor());
        this.getActor().parent = null;
        (this.getActor().getComponent('Shape') as ShapeComponent).visible = false;
      }
    }
  }

  tick() {
    this.move();
  }
}