import { Speed } from "../../types/type";
import { Component } from "../components/Component";
import { TransformComponent } from "../components/TransformComponent";

export class BulletController extends Component {
  public speed: number;
  private realSpeed: Speed;
  constructor(speed: number) {
    super();
    this.speed = speed;
    this.realSpeed = { x: 0, y: -this.speed };
    this.setName('BulletController');
  }

  initSpeed() {
    const transform = this.getActor().getComponent('Transform') as TransformComponent;
    if (transform.rotation === 0) {
      return;
    }
    this.realSpeed.x = this.speed * Math.sin(transform.rotation);
    this.realSpeed.y = -this.speed * Math.cos(transform.rotation);
    console.log(transform.rotation, this.realSpeed);
  }

  move() {
    const transform = this.getActor().getComponent('Transform') as TransformComponent;
    transform.position.x += this.realSpeed.x;
    transform.position.y += this.realSpeed.y;
  }

  tick() {
    this.move();
  }
}