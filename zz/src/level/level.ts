import { ComponentType, Shape } from "../../types/type";
import { Collider2DComponent } from "../base/components/Collider2D";
import { SpriteComponent } from "../base/components/Sprite";
import { SpriteImageComponent } from "../base/components/SpriteImage";
import { SpriteShapeComponent } from "../base/components/SpriteShape";
import { TransformComponent } from "../base/components/Transform";
import { Scene } from "../base/Scene";
import { Enemy } from "../logic/enemy/Enemy";
import { EnemyBullet } from "../logic/enemyBullet/EnemyBullet";
import { Player } from "../logic/player/Player";
import { PlayerControllerComponent } from "../logic/player/PlayerController";
import { PlayerBullet } from "../logic/playerBullet/PlayerBullet";

export class Level {
  static player: Player | null = null;
  static initPlayer() {
    if (Level.player) {
      return Level.player;
    }
    const scene = Scene.instance as Scene;
    const { width, height } = scene;

    const player = new Player('player', { x: 3, y: 5 }, 300);
    new TransformComponent(player, { x: width / 2, y: height - 20 });
    new SpriteImageComponent(player, new Image(), 'image/ship.png', 40, 40, 0, 0, 24, 24);
    new PlayerControllerComponent(player);
    new Collider2DComponent(player, 40, 40);

    Level.player = player;
    scene.addActor(player);
  }
  
  static initPlayerBullet() {
    const player = Level.player;
    if (!player) throw Error('no player');
    let bullet: null | PlayerBullet = null;
    if (PlayerBullet.bulletPool && PlayerBullet.bulletPool.size > 0) {
      bullet = PlayerBullet.bulletPool.keys().next().value as PlayerBullet;
      const bulletTransform = bullet.getComponent(ComponentType.TRANSFORM) as TransformComponent;
      bullet.isDie = false;
      bulletTransform.position = { x: 0, y: 0 };
      bulletTransform.rotation = 0;
      PlayerBullet.bulletPool.delete(bullet);
    } else {
      bullet = new PlayerBullet('playerBullet', 10);
      new TransformComponent(bullet, { x: 0, y: 0 });
      new SpriteImageComponent(bullet, new Image(), 'image/plasma.png', 40, 40, 0, 0, 96, 96);
      new Collider2DComponent(bullet, 20, 20);
    }
    return bullet;
  }

  static initEnemy(): Enemy {
    const scene = Scene.instance as Scene;
    const { width, height } = scene;
    let y = -Math.random() * 100;
    let x = Math.random() * width;
    const enemy = new Enemy('enemy', { x: 1, y: 0.3 }, 1000);
    new TransformComponent(enemy, { x, y }, Math.PI);
    new SpriteImageComponent(enemy, new Image(), 'image/ship.png', 24, 24, 120, 0, 24, 24);
    new Collider2DComponent(enemy, 24, 24);
    scene.addActor(enemy);
    return enemy;
  }

  static initEnemyBullet(): EnemyBullet {
    let bullet: EnemyBullet | null = null;
    if (EnemyBullet.bulletPool && EnemyBullet.bulletPool.size > 0) {
      bullet = EnemyBullet.bulletPool.keys().next().value as EnemyBullet;
      const bulletTransform = bullet.getComponent(ComponentType.TRANSFORM) as TransformComponent;
      bulletTransform.position = { x: 0, y: 0 };
      bullet.isDie = false;
      EnemyBullet.bulletPool.delete(bullet);
    } else {
      bullet = new EnemyBullet('enemyBullet', { x: 0, y: 5 });
      new TransformComponent(bullet, { x: 0, y: 0 }, Math.PI);
      new SpriteShapeComponent(bullet, "red", Shape.CIRCLE, 4);
      new Collider2DComponent(bullet, 8, 8);
    }
    return bullet;
  }
}