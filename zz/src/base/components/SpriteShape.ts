import { Shape } from "../../../types/type";
import { Scene } from "../Scene";
import { Component } from "./Component";
import { SpriteComponent } from "./Sprite";
import { TransformComponent } from "./Transform";


export class ShapeComponent extends SpriteComponent {
  private color: string;
  private shape: Shape;
  public width: number;
  public height: number;
  public radius: number;
  constructor(color: string, shape: Shape, radius: number)
  constructor(color: string, shape: Shape, width: number, height: number)
  constructor(color: string, shape: Shape, width?: number, height?: number){
    super();
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
      Scene.ctx.fillStyle = this.color;
      if (this.shape === Shape.CIRCLE) {
        Scene.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      } else {
        Scene.ctx.fillRect(0, 0, this.width, this.height);
      }
    })
  }

  tick() {
    this.draw();
  }
  
}