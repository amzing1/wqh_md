import { Actor } from "../Actor";

class MoveComponent {
  private speed: number;
  private actor: Actor
  constructor(speed: number, actor: Actor) {
    this.speed = speed;
    this.actor = actor;
  }
}