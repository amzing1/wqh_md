import { Actor } from "../../EIC/base/Actor";
import { AnimationStateMachineComponent } from "../../EIC/components";
import { StateUnit } from "../../EIC/components/AnimationStateMachine";
import { JumpState } from "../types/type";
import { Player } from "./Player";

export class PlayerASM extends AnimationStateMachineComponent {
  public isMirror: boolean = true;
  public isRun: boolean = false;
  public height: number = 0;
  public jumpState: JumpState = JumpState.START_JUMP;
  public isRasing: boolean = true;
  public isRasing2Falling: boolean = false;
  public isFalling: boolean = false;
  public isLanding: boolean = false;
  public isShoot: boolean = false;
  public isSliding: boolean = false;
  public isLightAttack: boolean = false;
  public isHeavyAttack: boolean = false;
  public isHurt: boolean = false;
  public states: StateUnit[] = [];
  constructor(actor: Actor) {
    super(actor);
  }


  initStates() {
    const animations = this.getAnimations().animations;
    animations.forEach(anim => {
      const state: StateUnit = {
        animation: anim,
        nexts: [],
        name: anim.name
      }
      this.states.push(state);
    });
  }

  init() {
    this.isRun = false;
    this.isLightAttack = false;
  }

  tick() {
    const animations = this.getAnimations().animations;
    this.setIsMirror(this.isMirror);
    let curAnim = animations.get("idle");
    if (this.isRun) {
      curAnim = animations.get("run");
    }

    switch (this.jumpState) {
      case JumpState.CAN_JUMP:
      case JumpState.IN_RASING:
        curAnim = animations.get("jump-rasing");
        break;
      case JumpState.IN_DOWN:
        curAnim = animations.get("rasing-to-fall");
        break;
      case JumpState.ON_LAND:
        curAnim = animations.get("landing");
        if (curAnim?.isOver) {
          Promise.resolve().then(() => {
            this.jumpState = JumpState.START_JUMP;
            this.initAnimations();
          });
          
        }
        break;
      default:
        break;
    }

    if (this.isLightAttack) {
      curAnim = animations.get("light-attack-combo");
    }

    if (!curAnim) {
      throw Error("no anim");
    }
    this.setAnim(curAnim.name);
    super.tick();
  }
}
