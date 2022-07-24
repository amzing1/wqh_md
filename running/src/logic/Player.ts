

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
import { JumpState } from "../types/type";
import { Time, Timer } from "../../EIC/base/Time";

export class Player extends Actor {
  private speed: Speed;
  public jumpHeight: number = 150;
  private startHeight: number = 0;
  private prevHeight: number;
  private jumpTimeOut: Timer | null = null;
  constructor(speed: Speed) {
    super('player');
    this.speed = speed;
  }

  tick() {
    this.tickHeight();
    this.action();
    super.tick();
  }

  die() {
    this.die();
  }

  tickHeight() {
    const asm = this.getComponent(ComponentType.ANIMATION_STATE_MACHINE) as unknown as PlayerASM;
    const body = (this.getComponent(ComponentType.RIGID_BODY) as RigidBodyComponent).body;
    const curHeight = body.getPosition().y;
    if (asm.jumpState === JumpState.START_JUMP && Event.keyActions.has(' ')) {
      asm.jumpState = JumpState.CAN_JUMP;
      this.startHeight = body.getPosition().y;
      console.log('startHeight', this.startHeight);
    }
    if (asm.jumpState === JumpState.CAN_JUMP) {
      if (curHeight - this.startHeight >= this.jumpHeight || !Event.keyActions.has(' ')) {
        asm.jumpState = JumpState.IN_RASING;
      }
    }
    if (asm.jumpState === JumpState.IN_RASING) {
      if (curHeight - this.prevHeight < 0) {
        asm.jumpState = JumpState.IN_DOWN;
      }
    }
    if (asm.jumpState === JumpState.IN_DOWN) {
      if (curHeight - this.prevHeight === 0 ) {
        asm.jumpState = JumpState.ON_LAND;
      }
    }
    this.prevHeight = curHeight; 
  }

  action() {
    const asm = this.getComponent(ComponentType.ANIMATION_STATE_MACHINE) as unknown as PlayerASM;
    const body = (this.getComponent(ComponentType.RIGID_BODY) as RigidBodyComponent).body;
    if (!Event.keyActions.size) {
      asm.init();
    }
    Event.keyActions.forEach(val => {
      switch (val) {
        case 'arrowleft':
          asm.isMirror = false;
          asm.isRun = true;
          body.applyLinearImpulse(Vec2(-50, 0), body.getWorldCenter());
          break;
        case 'arrowright':
          asm.isMirror = true;
          asm.isRun = true;
          body.applyLinearImpulse(Vec2(50, 0), body.getWorldCenter());
          break;
        case ' ': {
          switch (asm.jumpState) {
            case JumpState.START_JUMP:
            case JumpState.CAN_JUMP:
            case JumpState.ON_LAND:
              body.applyForceToCenter(Vec2(0, 20));
              break;
            default:
              break;
          }
          break;
        }
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