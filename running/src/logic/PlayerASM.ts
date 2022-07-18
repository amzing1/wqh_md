import { ComponentType } from "../../types/type";
import { Actor } from "../base/Actor";
import { AnimationComponent } from "../base/components/Animation";
import { AnimationStateMachineComponent } from "../base/components/AnimationStateMachine";
import { Player } from "./Player";

export class PlayerASM extends AnimationStateMachineComponent {
  public isMirror: boolean = true;
  public isRun: boolean = false;
  public height: number = 0;
  public isRasing: boolean = true;
  public isRasing2Falling: boolean = false;
  public isFalling: boolean = false;
  public isLanding: boolean = false;
  public isShoot: boolean = false;
  public isSliding: boolean = false;
  public isLightAttack: boolean = false;
  public isHeavyAttack: boolean = false;
  public isHurt: boolean = false;
  constructor(actor: Actor) {
    super(actor);
  }

  init() {
    this.isRun = false;
    this.isRasing = true;
    this.initAutoNext();
  }

  initAutoNext() {
    const animComp = this.getActor().getComponent(ComponentType.ANIMATION) as AnimationComponent;
    const rasing = animComp.animations.get('jump-rasing');
    const rasing2fall = animComp.animations.get('rasing-to-fall');
    if (!rasing || !rasing2fall) {
      throw Error('error animations');
    }
    rasing.autoNext = rasing2fall;
  }

  tick() {
    const curAnim = this.getCurAnim();
    const jumpHeight = (this.getActor() as Player).jumpHeight;
    this.setIsMirror(this.isMirror);
    let curState = 'idle';
    if (this.isRun) {
      curState = 'run';
    }
    if (this.height > 0) {
      if (this.height < jumpHeight - 10) {
        curState = 'jump-rasing';
      } else {
        curState = 'rasing-to-fall';
        this.isRasing = false;
      }
      if (!this.isRasing && this.height < jumpHeight - 10) {
        curState = 'falling';
      }
      if (!this.isRasing && this.height <= 5) {
        curState = 'landing';
      }
      if (!this.isRasing && this.height <= 0) {
        curState = 'idle';
        this.isRasing = true;
      }
    }
    
    if (curAnim.isOver && curAnim.autoNext) {
      curState = curAnim.autoNext.name;
    }
    this.setAnim(curState);
  }
}