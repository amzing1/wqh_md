import { Scene } from "./base/Scene";
import { Level } from "./Level";



const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
new Scene(ctx, canvas.width, canvas.height);

Level.initGrounds();
Level.initPlayer();

