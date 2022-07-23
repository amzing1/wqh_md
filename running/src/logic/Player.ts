

import { Actor } from "../../EIC/base/Actor";
import { Canvas } from "../../EIC/base/Canvas";
import { TransformComponent } from "../../EIC/components/Transform";
import { PlayerASM } from "./PlayerASM";
import {SpriteImageComponent} from '../../EIC/components/SpriteImage';
import { Event } from "../../EIC/base/Event";
import { ComponentType, Speed } from "../../EIC/type/type";
import { RigidBodyComponent } from "../../EIC/components";
import { Vec2 } from "planck";
import { Physics } from "../../EIC/base/Physics";

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
    // this.action();
    super.tick();
  }

  die() {
    this.die();
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
    const asm = this.getComponent(ComponentType.ANIMATION_STATE_MACHINE) as unknown as PlayerASM;
    const body = this.getComponent(ComponentType.RIGID_BODY) as RigidBodyComponent;
    if (!Event.keyActions.size) {
      asm.init();
    }
    Event.keyActions.forEach(val => {
      switch (val) {
        case 'arrowleft':
          asm.isMirror = false;
          transform.position.x -= this.speed.x;
          asm.isRun = true;
          break;
        case 'arrowright':
          asm.isMirror = true;
          // if (controller.actions.has(Action.LIGHT_ATTACK)) {
          //   return;
          // }
          transform.position.x += this.speed.x;
          asm.isRun = true;
          break;
        case ' ':
          this.inJump = true;
          this.jump(transform, asm);
          break;
        case 'x':
          asm.isLightAttack = true;
          break;
        case 'd':
          // body.body.applyForce(Vec2(10, 0), body.body.getWorldCenter());
          // Physics.drawPhysicsBody();
          break;

      }
    })
  }
}