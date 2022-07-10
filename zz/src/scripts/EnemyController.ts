import { Shape, Speed } from "../../types/type";
import { Actor } from "../Actor";
import { Collider2DComponent } from "../components/Collider2D";
import { Component } from "../components/Component";
import { ShapeComponent } from "../components/ShapeComponent";
import { SpriteComponent } from "../components/SpriteComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Scene } from "../Scene";
import { EnemyBulletController } from "./EnemeyBulletController";
export class EnemyController extends Component {
  private realSpeed: Speed;
  static enemyPool: Set<Actor>;
  private lastFireTime: number;
  private frequency: number;
  constructor() {
    super();
    this.realSpeed = { x: 1, y: 0.3 };
    if (Math.random() < 0.5) {
      this.realSpeed.x = -1;
    }
    EnemyController.enemyPool = new Set();
    this.lastFireTime = 0;
    this.frequency = 1000;
    this.setName("EnemyController");
  }

  move() {
    const transform = this.getActor().getComponent(
      "Transform"
    ) as TransformComponent;
    transform.position.x += this.realSpeed.x;
    transform.position.y += this.realSpeed.y;
    const scene = Scene.instance as Scene;
    const { width, height } = scene.getSize();
    if (transform.position.x < 0 || transform.position.x > width) {
      this.realSpeed.x = -this.realSpeed.x;
    }
  }

  fire() {
    const fireStart = performance.now();
    if (this.lastFireTime && fireStart - this.lastFireTime < this.frequency) {
      return;
    }

    this.lastFireTime = fireStart;
    const transform = this.getActor().getComponent(
      "Transform"
    ) as TransformComponent;
    let bullet: Actor | null = null;
    if (EnemyBulletController.bulletPool && EnemyBulletController.bulletPool.size > 0) {
      bullet = EnemyBulletController.bulletPool.keys().next().value as Actor;
      const bulletTransform = bullet.getComponent('Transform') as TransformComponent;
      const bulletSprite = bullet.getComponent('Shape') as ShapeComponent;
      bulletTransform.position = { x: 0, y: 0 };
      bulletSprite.visible = true;
      EnemyBulletController.bulletPool.delete(bullet);
    } else {
      const bulletTransform = new TransformComponent({ x: 0, y: 0 }, Math.PI);
      const bulletSprite = new ShapeComponent("red", Shape.CIRCLE, 4);
      const bulletController = new EnemyBulletController();
      const bulletCollider = new Collider2DComponent(8, 8);
      bullet = new Actor("enemyBullet");
      bullet.addComponent(bulletTransform);
      bullet.addComponent(bulletSprite);
      bullet.addComponent(bulletController);
      bullet.addComponent(bulletCollider);
    }
    this.getActor().addChildren(bullet);
  }

  onCollider() {
    const player = Scene.instance?.getActor('plane');
    if (!player || !player.length) {
      return;
    }
    const playerBullets = player[0].getChildren('playerBullet');
    const collider = this.getActor().getComponent('Collision2D') as Collider2DComponent;
    const enemyBullets = this.getActor().getChildren('enemyBullet');
    if (!collider) {
      return;
    }
    if (player && player.length) {
      collider.onCollision(player[0], () => {
        // (player[0].getComponent('Sprite') as SpriteComponent).visible = false;
        player[0].isDie = true;
      })
    }
    if (playerBullets && playerBullets.length) {
      playerBullets.forEach(bullet => {
        collider.onCollision(bullet, () => {
          // (this.getActor().getComponent('Sprite') as SpriteComponent).visible = false;
          this.getActor().isDie = true;
          bullet.isDie = true;
        })
      })
    }
    if (enemyBullets.length) {
      enemyBullets.forEach(enemy => {
        const collider = enemy.getComponent('Collision2D') as Collider2DComponent;
        collider.onCollision(player[0], () => {
          player[0].isDie = true;
        })
      })
    }
    
  }

  tick() {
    this.fire();
    this.move();
    this.onCollider();
  }
}
