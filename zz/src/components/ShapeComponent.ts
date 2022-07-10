import { Shape } from "../../types/type";
import { Scene } from "../Scene";
import { Component } from "./Component";
import { TransformComponent } from "./TransformComponent";

export class ShapeComponent extends Component {
  private color: string;
  private shape: Shape;
  public width: number;
  public height: number;
  public radius: number;
  public visible: boolean;
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
    this.visible = true;
    this.setName('Shape');
  }
  draw(x: number, y: number) {
    const ctx = Scene.ctx;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.translate(x, y);
    ctx.beginPath();
    if (this.visible) {
      if (this.radius) {
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(0, 0, this.width, this.height);
      }
      
    }
    ctx.restore();
  }

  tick() {
    const transform = this.getActor().getComponent('Transform') as TransformComponent;
    const { x, y } = transform.position;
    this.draw(x, y);
  }
  
}