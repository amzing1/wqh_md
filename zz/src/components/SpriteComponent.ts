import { Component } from "./Component";
import { TransformComponent } from "./TransformComponent";

export class SpriteComponent extends Component {
  private ctx: CanvasRenderingContext2D;
  private img: HTMLImageElement;
  private src: string;
  public width: number;
  public height: number;
  private sx: number;
  private sy: number;
  private sWidth: number;
  private sHeight: number;
  public visible: boolean;
  constructor(ctx: CanvasRenderingContext2D, img: HTMLImageElement, src: string, width: number = 20, height: number = 20, sx: number = 0, sy :number = 0, sWidth: number = 0, sHeight: number = 0) {
    super();
    this.ctx = ctx;
    this.img = img;
    this.src = src;
    this.width = width;
    this.height = height;
    this.sx = sx;
    this.sy = sy;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.setName('Sprite');
    this.visible = true;
    this.init();
  }
  init() {
    this.img.src = this.src;
    this.img.onload = () => {
      const transform = this.getActor().getComponent('Transform') as TransformComponent;
      const { x, y } = transform.position;
      transform.setBoundary(transform.maxLeft - this.width, transform.maxTop - this.height);
      this.draw(x, y, 0);
    }
  }
  draw(x: number, y: number, rotation: number) {
    this.ctx.save();
    this.ctx.translate(x + this.width / 2, y + this.height / 2);
    this.ctx.rotate(rotation);
    if (this.visible) {
      this.ctx.drawImage(this.img, this.sx, this.sy, this.sWidth, this.sHeight, -this.width / 2, -this.height / 2, this.width, this.height);
    }
    this.ctx.restore();
  }
  tick() {
    const transform = this.getActor().getComponent('Transform') as TransformComponent;
    const { x, y } = transform.position;
    this.draw(x, y, transform.rotation);
  }
  getCtx() {
    return this.ctx;
  }
}