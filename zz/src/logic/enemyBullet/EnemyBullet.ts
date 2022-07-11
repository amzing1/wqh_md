import { ComponentType, Speed } from "../../../types/type";
import { Actor } from "../../base/Actor";
import { Collider2DComponent } from "../../base/components/Collider2D";
import { TransformComponent } from "../../base/components/Transform";
import { Scene } from "../../base/Scene";
import { Level } from "../../level/level";
import { Player } from "../player/Player";

export class EnemyBullet extends Actor {
  private speed: Speed;
  static bulletPool: Set<EnemyBullet>;
  constructor(name: string, speed: Speed) {
    super(name);
    this.speed = speed;
    EnemyBullet.bulletPool = new Set();
  }
  move() {
    const transform = this.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    transform.position.y += this.speed.y;
    const scene = Scene.instance as Scene;
    const { width, height } = scene;
    const { x, y } = transform.position;
    if (x < 0 || x > width || y > height) {
      this.hiddenSelf();
      EnemyBullet.bulletPool.add(this);
    }
  }
  onCollider() {
    // 敌人子弹击中玩家
    if (!Level.player) {
      throw Error('no player');
    }
    const collider = this.getComponent(ComponentType.COLLIDER_2D) as Collider2DComponent;
    collider.onCollision(Level.player, () => {
      (Level.player as Player).isDie = true;
    })
  }

  tick() {
    super.tick([() => this.move(), () => this.onCollider()]);
  }
}