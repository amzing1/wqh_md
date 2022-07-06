import { Component } from "./components/Component";

export class Actor {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  components: Component[];
  constructor(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    this.ctx = ctx;
    this.img = img;
  }
}