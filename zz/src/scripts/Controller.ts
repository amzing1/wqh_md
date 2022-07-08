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
    this.frequency = 500;
    this.lastFireTime = 0;
    this.setName('Controller');
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      console.log(e.key);
      switch (e.key.toLocaleLowerCase()) {
        case 'arrowup':
          this.actions.add(Action.MOVE_TOP);
          break;
        case 'arrowdown':
          this.actions.add(Action.MOVE_BOTTOM);
          break;
        case 'arrowleft':
          this.actions.add(Action.MOVE_LEFT);
          break;
        case 'arrowright':
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
        case 'arrowup':
          this.actions.delete(Action.MOVE_TOP);
          break;
        case 'arrowdown':
          this.actions.delete(Action.MOVE_BOTTOM);
          break;
        case 'arrowleft':
          this.actions.delete(Action.MOVE_LEFT);
          break;
        case 'arrowright':
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
    const scene = Scene.instance as Scene;
    const { width, height } = scene.getSize();
    const sprite = (this.getActor().getComponent('Sprite') as SpriteComponent);
    this.actions.forEach(val => {
      switch (val) {
        case Action.MOVE_TOP:
          transform.position.y -= this.speed.y;
          transform.position.y = transform.position.y < 0 ? 0 : transform.position.y;
          break;
        case Action.MOVE_BOTTOM:
          transform.position.y += this.speed.y;
          transform.position.y = transform.position.y > height - sprite.height ? height - sprite.height : transform.position.y;
          break;
        case Action.MOVE_LEFT:
          transform.position.x -= this.speed.x;
          transform.position.x = transform.position.x < 0 ? 0 : transform.position.x;
          break;
        case Action.MOVE_RIGHT:
          transform.position.x += this.speed.x;
          transform.position.x = transform.position.x > width - sprite.width ? width - sprite.width : transform.position.x;
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
    if (BulletController.bulletPool && BulletController.bulletPool.size) {
      const bulletArr = Array.from(BulletController.bulletPool);
      const bullet = bulletArr[0];
      const bulletTransform = bullet.getComponent('Transform') as TransformComponent;
      const bulletSprite = bullet.getComponent('Sprite') as SpriteComponent;
      bulletTransform.position = { x: 0, y: 0 };
      bulletSprite.visible = true;
    }
    const sprite = (this.getActor().getComponent('Sprite') as SpriteComponent);
    const ctx = sprite.getCtx();
    const bulletTransform = new TransformComponent({ x: 0, y: 0 }, transform.rotation);
    const bulletSprite = new SpriteComponent(ctx, new Image(), 'image/plasma.png', 40, 40, 0, 0, 96, 96);
    const bulletController = new BulletController(10);
    const bullet = new Actor('bullet');
    bullet.addComponent(bulletTransform);
    bullet.addComponent(bulletSprite);
    bullet.addComponent(bulletController);
    this.getActor().addChildren(bullet);
    this.lastFireTime = fireStart;
  }
}