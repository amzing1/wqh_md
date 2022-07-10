import { Actor } from "../Actor";
import { Component } from "./Component";
import { TransformComponent } from "./TransformComponent";

export class Collider2DComponent extends Component {
  private width: number;
  private height: number;
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.setName('Collision2D');
  }

  onCollision(actor: Actor, callback: Function) {
    const collision = actor.getComponent('Collision2D') as Collider2DComponent;
    const transform = actor.getComponent('Transform') as TransformComponent;
    if (!collision || !transform) {
      return;
    }
    const selfTransfrom = this.getActor().getComponent('Transform') as TransformComponent;
    const { x: ax, y: ay } = transform.position;
    const { width: aw, height: ah } = collision;
    const { x: sx, y: sy } = selfTransfrom.position;
    const { width: sw, height: sh } = this;

    // 判断两个碰撞矩形是否相交
    const insertRect: number[] = [
      Math.max(ax, sx),
      Math.max(ay, sy),
      Math.min(ax + aw, sx + sw),
      Math.min(ay + ah, sy + sh)
    ]

    if (insertRect[0] > insertRect[2] || insertRect[1] > insertRect[3]) {
      return;
    } else {
      callback();
    }
  }
}