import { Actor } from "../base/Actor";
import { AnimationStateMachineComponent } from "../base/components/AnimationStateMachine";

export class PlayerASM extends AnimationStateMachineComponent {
  public isMirror: boolean = true;
  public isRun: boolean = false;
  public isRasing: boolean = false;
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

  tick() {
    this.setIsMirror(this.isMirror);
    if (this.isRun) {
      this.setAnim('run');
    } else {
      this.setAnim('idle');
    }
  }
}