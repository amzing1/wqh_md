import { EIC } from "../EIC/base";
import { Canvas } from "../EIC/base/Canvas";
import { Physics } from "../EIC/base/Physics";
import { Scene } from "../EIC/base/Scene";
import { Level } from "./Level";

const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
new EIC(canvas.width, canvas.height, ctx, true);


Level.initGrounds();
Level.initPlayer();
// Level.initGround(Canvas.width / 2);

