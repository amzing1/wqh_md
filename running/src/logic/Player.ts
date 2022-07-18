import { ComponentType, Action, Speed } from "../../types/type";
import { Actor } from "../base/Actor";
import { SpriteImageComponent } from "../base/components/SpriteImage";
import { TransformComponent } from "../base/components/Transform";
import { Scene } from "../base/Scene";
import { PlayerASM } from "./PlayerASM";
import { PlayerControllerComponent } from "./PlayerController";

export class Player extends Actor {
  private speed: Speed;
  public jumpHeight: number = 50;
  private jumpForce: number = 20;
  private inJump: boolean = false;
  private isInRasing: boolean = true;

  // temp
  private startHeight: number;
  constructor(speed: Speed) {
    super('player');
    this.speed = speed;
    Promise.resolve().then(() => {
      this.startHeight = (this.getComponent(ComponentType.TRANSFORM) as TransformComponent).position.y;
    })
  }

  tick() {
    super.tick([() => this.action()]);
  }

  die() {
    super.die();
    Scene.gameOver = true;
  }

  jump(transform: TransformComponent, asm: PlayerASM) {
    if (!this.inJump) {
      return;
    }
    if (this.isInRasing && transform.position.y >= this.startHeight - this.jumpHeight) {
      transform.position.y -= this.speed.y;
      asm.height += this.speed.y;
    } else {
      this.isInRasing = false;
     
    }
    if (!this.isInRasing) {
      transform.position.y += this.speed.y;
      asm.height -= this.speed.y;
      if (transform.position.y <= this.startHeight) {
        this.inJump = false;
        transform.position.y = this.startHeight;
        asm.height = 0;
      }
    }
    
  }

  action() {
    const transform = this.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    const scene = Scene.instance as Scene;
    const { width, height } = scene;
    const sprite = this.getComponent(ComponentType.SPRITE) as SpriteImageComponent;
    const controller = this.getComponent(ComponentType.CONTROLLER) as PlayerControllerComponent;
    const asm = this.getComponent(ComponentType.ANIMATION_STATE_MACHINE) as PlayerASM;
    if (!controller.actions.size) {
      asm.init();
    }
    controller.actions.forEach(val => {
      switch (val) {
        case Action.MOVE_LEFT:
          transform.position.x -= this.speed.x;
          transform.position.x = transform.position.x < 0 ? 0 : transform.position.x;
          asm.isRun = true;
          asm.isMirror = false;
          break;
        case Action.MOVE_RIGHT:
          transform.position.x += this.speed.x;
          transform.position.x = transform.position.x > width - sprite.width ? width - sprite.width : transform.position.x;
          asm.isRun = true;
          asm.isMirror = true;
          break;
        case Action.JUMP:
          this.inJump = true;
          this.jump(transform, asm);
          break;
      }
    })
  }
}