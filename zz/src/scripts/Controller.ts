import { Action, Speed } from "../../types/type";
import { Actor } from "../Actor";
import { Component } from "../components/Component";
import { SpriteComponent } from "../components/SpriteComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Scene } from "../Scene";
import { BulletController } from "./ButtetController";

export class ControllerComponent extends Component {
  public speed: Speed;
  public actions: Set<Action>;
  private frequency: number;
  private lastFireTime: number;
  constructor(speed: Speed) {
    super();
    this.speed = speed;
    this.actions = new Set();
    this.frequency = 1000;
    this.lastFireTime = 0;
    this.setName('Controller');
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      switch (e.key.toLocaleLowerCase()) {
        case 'w':
          this.actions.add(Action.MOVE_TOP);
          break;
        case 's':
          this.actions.add(Action.MOVE_BOTTOM);
          break;
        case 'a':
          this.actions.add(Action.MOVE_LEFT);
          break;
        case 'd':
          this.actions.add(Action.MOVE_RIGHT);
          break;
        case 'q':
          this.actions.add(Action.ROTATE_LEFT);
          break;
        case 'e':
          this.actions.add(Action.ROTATE_RIGHT);
          break;
        case 'x':
          this.actions.add(Action.FIRE);
          break;
      }
    });
    document.addEventListener('keyup', (e) => {
      switch (e.key.toLocaleLowerCase()) {
        case 'w':
          this.actions.delete(Action.MOVE_TOP);
          break;
        case 's':
          this.actions.delete(Action.MOVE_BOTTOM);
          break;
        case 'a':
          this.actions.delete(Action.MOVE_LEFT);
          break;
        case 'd':
          this.actions.delete(Action.MOVE_RIGHT);
          break;
        case 'q':
          this.actions.delete(Action.ROTATE_LEFT);
          break;
        case 'e':
          this.actions.delete(Action.ROTATE_RIGHT);
          break;
        case 'x':
          this.actions.delete(Action.FIRE);
          break;
      }
    })
  }

  tick() {
    this.action();
  }

  action() {
    const transform = this.getActor().getComponent('Transform') as TransformComponent;
    this.actions.forEach(val => {
      switch (val) {
        case Action.MOVE_TOP:
          transform.position.y -= this.speed.y;
          break;
        case Action.MOVE_BOTTOM:
          transform.position.y += this.speed.y;
          break;
        case Action.MOVE_LEFT:
          transform.position.x -= this.speed.x;
          break;
        case Action.MOVE_RIGHT:
          transform.position.x += this.speed.x;
          break;
        case Action.ROTATE_LEFT:
          transform.rotation -= 2 * Math.PI / 180;
          break;
        case Action.ROTATE_RIGHT:
          transform.rotation += 2 * Math.PI / 180;
          break;
        case Action.FIRE:
          this.fire();
          break;
      }
    })
  }

  fire() {
    const fireStart = performance.now();
    if (this.lastFireTime && fireStart - this.lastFireTime < this.frequency) {
      return;
    }
    const transform = this.getActor().getComponent('Transform') as TransformComponent;
    const ctx = (this.getActor().getComponent('Sprite') as SpriteComponent).getCtx();
    const { x, y } = transform.position;
    const bulletTransform = new TransformComponent({ x, y });
    const bulletSprite = new SpriteComponent(ctx, new Image(), 'image/plasma.png', 96, 96, 0, 0, 96, 96);
    const bulletController = new BulletController({ x: 0, y: -10 }, transform.rotation);
    const bullet = new Actor('bullet');
    bullet.addComponent(bulletTransform);
    bullet.addComponent(bulletSprite);
    bullet.addComponent(bulletController);
    Scene.instance?.addActor(bullet);
  }
}