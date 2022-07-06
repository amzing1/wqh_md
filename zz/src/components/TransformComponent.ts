import { Actor } from "../Actor";
import { Component } from "./Component";

type Direction = 1 | -1 | 0

export class TransformComponent extends Component {
  private speed: number;
  constructor(speed: number, actor: Actor) {
    super(actor);
    this.speed = speed;
  }
  translate(directionX: Direction, directionY: Direction) {
    let { left, top } = this.actor.getProps();
    left += directionX * this.speed;
    top += directionY * this.speed;
    this.actor.update({ left, top });
  }
}