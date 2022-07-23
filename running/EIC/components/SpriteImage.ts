
import { Actor } from "../base/Actor";
import { Canvas } from "../base/Canvas";
import { Scene } from "../base/Scene";
import { Component } from "./Component";
import { SpriteComponent } from "./Sprite";
import { TransformComponent } from "./Transform";

export class SpriteImageComponent extends SpriteComponent {
  private img: HTMLImageElement;
  private src: string;
  public width: number;
  public height: number;
  public sx?: number;
  public sy?: number;
  private sWidth?: number;
  private sHeight?: number;
  private isLoaded: boolean = false;
  constructor(actor: Actor, img: HTMLElement, src: string, width: number, height: number)
  constructor(actor: Actor, img: HTMLElement, src: string, width: number, height: number, sx: number, sy: number, sWidth: number, sHeight: number)
  constructor(actor: Actor, img: HTMLImageElement, src: string, width: number, height: number, sx?: number, sy ?:number, sWidth?: number, sHeight?: number) {
    super(actor);
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
      this.isLoaded = true;
      this.draw();
    }
  }
  draw() {
    super.draw(() => {
      if (this.sx !== undefined && this.sy !== undefined && this.sWidth && this.sHeight) {
        Canvas.ctx.drawImage(this.img, this.sx, this.sy, this.sWidth, this.sHeight, 0, 0, this.width, this.height)
      } else {
        Canvas.ctx.drawImage(this.img, 0, 0, this.width, this.height);
      }
    })
  }
  tick() {
    Promise.resolve().then(() => {
      this.isLoaded && this.draw()
    }) 
  }
}