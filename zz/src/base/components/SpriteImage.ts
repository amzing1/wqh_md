import { ComponentType } from "../../../types/type";
import { Scene } from "../Scene";
import { Component } from "./Component";
import { SpriteComponent } from "./Sprite";
import { TransformComponent } from "./Transform";

export class SpriteImageComponent extends SpriteComponent {
  private img: HTMLImageElement;
  private src: string;
  public width: number;
  public height: number;
  private sx?: number;
  private sy?: number;
  private sWidth?: number;
  private sHeight?: number;
  constructor(img: HTMLElement, src: string, width: number, height: number)
  constructor(img: HTMLElement, src: string, width: number, height: number, sx: number, sy: number, sWidth: number, sHeight: number)
  constructor(img: HTMLImageElement, src: string, width: number, height: number, sx?: number, sy ?:number, sWidth?: number, sHeight?: number) {
    super();
    this.img = img;
    this.src = src;
    this.width = width;
    this.height = height;
    this.sx = sx;
    this.sy = sy;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.init();
  }
  init() {
    this.img.src = this.src;
    this.img.onload = () => {
      this.draw();
    }
  }
  draw() {
    super.draw(() => {
      if (this.sx && this.sy && this.sWidth && this.sHeight) {
        Scene.ctx.drawImage(this.img, this.sx, this.sy, this.sWidth, this.sHeight, -this.width / 2, -this.height / 2, this.width, this.height)
      } else {
        Scene.ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
      }
    })
  }
  tick() {
    this.draw()
  }
}