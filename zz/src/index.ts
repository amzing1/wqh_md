import { Actor } from "./Actor";
import { SpriteComponent } from "./components/SpriteComponent";
import { TransformComponent } from "./components/TransformComponent";
import { Scene } from "./Scene";
import { ControllerComponent } from "./scripts/Controller";

const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const scene = new Scene(ctx, { width: canvas.width, height: canvas.height });
const { width, height } = scene.getSize();

const planeTransform = new TransformComponent({ x: (width - 50) / 2, y: (height / 2 - 50) - 2 });
const planeSprite = new SpriteComponent(ctx, new Image(), 'image/ship.png', 40, 40, 0, 0, 24, 24);
const planeController = new ControllerComponent({ x: 1, y: 1 });

const plane = new Actor('plane');
plane.addComponent(planeTransform);
plane.addComponent(planeSprite);
plane.addComponent(planeController);
scene.addActor(plane);




