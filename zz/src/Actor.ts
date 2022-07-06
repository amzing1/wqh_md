export interface ActorProps {
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  left: number,
  top: number,
  sx: number,
  sy: number,
  sWidth: number,
  sHeight: number,
  maxLeft: number,
  maxTop: number
}

type PartialProps = Partial<ActorProps>

export class Actor {
  private props: ActorProps;
  constructor(props: ActorProps) {
    this.props = props;
    this.init();
  }
  init() {
    this.props.maxLeft = this.props.maxLeft - this.props.width;
    this.props.maxTop = this.props.maxTop - this.props.height;
    this.props.img.onload = () => {
      this.draw();
    }
  }
  clear() {
    const { ctx, left, top, width, height } = this.props;
    ctx.clearRect(left, top, width, height);
  }
  draw() {
    const { ctx, img, sx, sy, sWidth, sHeight, left, top, width, height } = this.props;
    ctx.drawImage(img, sx, sy, sWidth, sHeight, left, top, width, height)
  }
  reDraw(props: PartialProps) {
    for (let key in props) {
      this.props[key] = props[key];
    }
    this.draw();
  }
  update(props: PartialProps) {
    this.clear();
    this.reDraw(props);
  }
  translate(offsetX: number, offsetY: number) {
    let { left, top } = this.props;
    left += offsetX;
    top += offsetY;
    this.update({ left, top });
  }
}