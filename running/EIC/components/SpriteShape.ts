
import { Actor } from "../base/Actor";
import { Canvas } from "../base/Canvas";
import { Scene } from "../base/Scene";
import { Shape } from "../type/type";
import { SpriteComponent } from "./Sprite";

export class SpriteShapeComponent extends SpriteComponent {
  private color: string;
  private shape: Shape;
  public width: number;
  public height: number;
  public radius: number;
  constructor(actor: Actor, color: string, shape: Shape, width?: number, height?: number){
    super(actor);
    this.color = color;
    this.shape = shape;
    if (width && height) {
      this.width = width;
      this.height = height;
    }
    else if (width) {
      this.radius = width;
    }
  }

  draw() {
    super.draw(() => {
      Canvas.ctx.fillStyle = this.color;
      if (this.shape === Shape.CIRCLE) {
        Canvas.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        Canvas.ctx.fill();
      } else {
        Canvas.ctx.fillRect(0, 0, this.width, this.height);
      }
    })
  }

  tick() {
    this.draw();
  }
  
}