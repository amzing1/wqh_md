import { Scene } from "./base/Scene";
import { Level } from "./level/level";


const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

new Scene(ctx, canvas.width, canvas.height);
Level.initBgm();
Level.initPlayer();
for (let i = 0; i < 10; i++) {
  const enemy = Level.initEnemy();
}



