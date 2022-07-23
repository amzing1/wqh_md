export class Canvas {
  static width: number;
  static height: number;
  static ctx: CanvasRenderingContext2D;

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    Canvas.width = width;
    Canvas.height = height;
    Canvas.ctx = ctx;
  }
}