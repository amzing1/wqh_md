import { ComponentType, Action, Speed } from "../../types/type";
import { Actor } from "../base/Actor";
import { SpriteImageComponent } from "../base/components/SpriteImage";
import { TransformComponent } from "../base/components/Transform";
import { Scene } from "../base/Scene";
import { PlayerASM } from "./PlayerASM";
import { PlayerControllerComponent } from "./PlayerController";

export class Player extends Actor {
  private speed: Speed;
  constructor(speed: Speed) {
    super('player');
    this.speed = speed;
  }

  tick() {
    super.tick([() => this.action()]);
  }

  die() {
    super.die();
    Scene.gameOver = true;
  }

  action() {
    const transform = this.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    const scene = Scene.instance as Scene;
    const { width, height } = scene;
    const sprite = this.getComponent(ComponentType.SPRITE) as SpriteImageComponent;
    const controller = this.getComponent(ComponentType.CONTROLLER) as PlayerControllerComponent;
    const asm = this.getComponent(ComponentType.ANIMATION_STATE_MACHINE) as PlayerASM;
    if (!controller.actions.size) {
      
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
          transform.position.y -= this.speed.y;
          break;
      }
    })
  }
}