
import { Actor } from "../../EIC/base/Actor";
import { AnimationStateMachineComponent } from '../../EIC/components'
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
    this.height = 0;
    this.isLightAttack = false;
    this.initAutoNext();
  }

  initAutoNext() {
    const animComp = this.getAnimations();
    const rasing = animComp.animations.get('jump-rasing');
    const rasing2fall = animComp.animations.get('rasing-to-fall');
    if (!rasing || !rasing2fall) {
      throw Error('error animations');
    }
    rasing.autoNext = rasing2fall;
  }

  tick() {
    const animations = this.getAnimations().animations;
    this.setIsMirror(this.isMirror);
    let curAnim = animations.get('idle');
    if (this.isRun) {
      curAnim = animations.get('run');
    }
    if (this.isLightAttack) {
      curAnim = animations.get('light-attack-combo');
    }
    // if (this.height > 0) {
    //   if (this.height < jumpHeight - 10) {
    //     curAnim = animations.get('jump-rasing')
    //   } else {
    //     curAnim = animations.get('rasing-to-fall')
    //     this.isRasing = false;
    //   }
    //   if (!this.isRasing && this.height < jumpHeight - 10) {
    //     curAnim = animations.get('falling')
    //   }
    //   if (!this.isRasing && this.height <= 5) {
    //     curAnim = animations.get('landing')
    //   }
    //   if (!this.isRasing && this.height <= 0) {
    //     curAnim = animations.get('idle')
    //     this.isRasing = true;
    //   }
    // }
    if (!curAnim) {
      return;
    }
    // if (curAnim.name !== 'jump-rasing') {
    //   (animations.get('jump-rasing') as Animation).isOver = false;
    // }
    if (curAnim.isOver && curAnim.autoNext) {
      curAnim = curAnim.autoNext;
    }
    this.setAnim(curAnim.name);
    super.tick();
  }
}