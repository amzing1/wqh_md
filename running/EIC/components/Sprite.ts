import { Actor } from "../base/Actor";
import { Canvas } from "../base/Canvas";
import { Scene } from "../base/Scene";
import { ComponentType } from "../type/type";
import { Component } from "./Component";
import { TransformComponent } from "./Transform";

export class SpriteComponent extends Component {
  public visible: boolean;
  public isMirror: boolean;
  constructor(actor: Actor) {
    super(actor, ComponentType.SPRITE);
    this.visible = true;
  }
  draw(callback?: Function) {
    if (this.visible && callback) {
      const transform = this.getActor().getComponent(ComponentType.TRANSFORM) as TransformComponent;
      let { x, y } = transform.getCenterInCanvas();
      Canvas.ctx.save();
      Canvas.ctx.globalCompositeOperation = 'source-over';
      Canvas.ctx.translate(x, y);
      Canvas.ctx.rotate(transform.rotation);
      this.isMirror && Canvas.ctx.scale(-1, 1);
      Canvas.ctx.beginPath();
      callback();
      Canvas.ctx.restore();
    }
  }
  tick() {}
}