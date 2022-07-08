import { Speed } from "../../types/type";
import { Actor } from "../Actor";
import { Component } from "../components/Component";
import { SpriteComponent } from "../components/SpriteComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Scene } from "../Scene";

export class BulletController extends Component {
  public speed: number;
  private realSpeed: Speed;
  static bulletPool: Set<Actor>;
  constructor(speed: number) {
    super();
    this.speed = speed;
    this.realSpeed = { x: 0, y: -this.speed };
    BulletController.bulletPool = new Set();
    this.setName('BulletController');
  }

  initSpeed() {
    const transform = this.getActor().getComponent('Transform') as TransformComponent;
    if (transform.rotation === 0) {
      return;
    }
    this.realSpeed.x = this.speed * Math.sin(transform.rotation);
    this.realSpeed.y = -this.speed * Math.cos(transform.rotation);
  }

  move() {
    const transform = this.getActor().getComponent('Transform') as TransformComponent;
    transform.position.x += this.realSpeed.x;
    transform.position.y += this.realSpeed.y;
    const scene = Scene.instance as Scene;
    const { width, height } = scene.getSize();
    const { x, y } = transform.position;
    if (x < 0 || x > width || y < 0 || y > height) {
      BulletController.bulletPool.add(this.getActor());
      const parent = this.getActor().parent;
      if (parent) {
        parent.children.delete(this.getActor());
        this.getActor().parent = null;
        (this.getActor().getComponent('Sprite') as SpriteComponent).visible = false;
      }
    }
  }

  tick() {
    this.move();
  }
}