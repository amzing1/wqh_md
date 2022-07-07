import { Speed } from "../../types/type";
import { Component } from "../components/Component";
import { TransformComponent } from "../components/TransformComponent";

export class BulletController extends Component {
  public speed: Speed;
  public rotation: number;
  constructor(speed: Speed, rotation: number) {
    super();
    this.speed = speed;
    this.rotation = rotation;
    this.setName('BulletController');
  }

  move() {
    const transform = this.getActor().getComponent('Transform') as TransformComponent;
    transform.position.x += this.speed.x;
    transform.position.y += this.speed.y;
    transform.rotation += this.rotation * Math.PI / 180;
  }

  tick() {
    this.move();
  }
}