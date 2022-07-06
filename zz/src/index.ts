import { Actor } from "./Actor";
import { Scene } from "./Scene";

const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const scene = new Scene({ width: canvas.width, height: canvas.height });
const { width, height } = scene.getSize();

const planeImg = new Image();
planeImg.src = 'image/ship.png';
const plane = new Actor({
  ctx,
  img: planeImg,
  width: 50,
  height: 50,
  left: (width - 50) / 2,
  top: (height - 50) - 20,
  sx: 0,
  sy: 0,
  sWidth: 24,
  sHeight: 24,
  maxLeft: width,
  maxTop: height
});




