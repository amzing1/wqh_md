

import { Actor } from "../../EIC/base/Actor";
import { PlayerASM } from "./PlayerASM";
import { Event } from "../../EIC/base/Event";
import { ComponentType, Speed } from "../../EIC/type/type";
import { RigidBodyComponent } from "../../EIC/components";
import { Vec2 } from "planck";
import { JumpState } from "../types/type";
import { Timer } from "../../EIC/base/Time";

export class Player extends Actor {
  public jumpHeight: number = 150;
  private startHeight: number = 0;
  private prevHeight: number;
  private jumpTimeOut: Timer | null = null;
  constructor() {
    super('player');
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
    if (!Event.keyActions.has('arrowleft') && !Event.keyActions.has('arrowRight')) {
      asm.isRun.val = false;
      asm.isRun2idle.val = true;
    }
    Event.keyActions.forEach(val => {
      switch (val) {
        case 'arrowleft':
          asm.isMirror = false;
          asm.isRun.val = true;
          asm.isRun2idle.val = false;
          body.applyLinearImpulse(Vec2(-50, 0), body.getWorldCenter());
          break;
        case 'arrowright':
          asm.isMirror = true;
          asm.isRun.val = true;
          asm.isRun2idle.val = false;
          body.applyLinearImpulse(Vec2(50, 0), body.getWorldCenter());
          break;
        case ' ': {
          switch (asm.jumpState) {
            case JumpState.START_JUMP:
            case JumpState.CAN_JUMP:
              body.applyForceToCenter(Vec2(0, 20));
              break;
            default:
              break;
          }
          break;
        }
        case 'x':
          asm.isLightAttack.val = true;
          break;
      }
    })
  }
}