import { Actor } from "../../EIC/base/Actor";
import { AnimationStateMachineComponent } from "../../EIC/components";
import { StateUnit } from "../../EIC/components/AnimationStateMachine";
import { JumpState } from "../types/type";

export class PlayerASM extends AnimationStateMachineComponent {
  public isMirror: boolean = true;
  public isRun: {val: boolean} = {val: false};
  public isRun2idle: {val: boolean} = {val: false};
  public _jumpState: JumpState = JumpState.START_JUMP;
  public isRasing: {val: boolean} = {val: false};
  public isRasing2Falling: {val: boolean} = {val: false};
  public isFalling: {val: boolean} = {val: false};
  public isLanding: {val: boolean} = {val: false};
  // public isShoot: boolean = false;
  // public isSliding: boolean = false;
  public isLightAttack: {val: boolean} = {val: false};
  // public isHeavyAttack: boolean = false;
  // public isHurt: boolean = false;
  public stateMap: Map<string, StateUnit> = new Map();
  constructor(actor: Actor) {
    super(actor);
    this.initStates();
    this.initStatLogic();
  }

  get jumpState() {
    return this._jumpState;
  }

  set jumpState(val: JumpState) {
    if (val === JumpState.CAN_JUMP) {
      this.isRasing.val = true;
    } else if (val === JumpState.IN_RASING) {
      this.isRasing2Falling.val = true;
    } else if (val === JumpState.IN_DOWN) {
      this.isFalling.val = true;
    } else if (val === JumpState.ON_LAND) {
      this.isLanding.val = true;
    }
    this._jumpState = val;
  }

  initConditions() {
    this.isRun.val = false;
    this.isRun2idle.val = false;
    this._jumpState = JumpState.START_JUMP;
    this.isRasing.val = false;
    this.isRasing2Falling.val = false;
    this.isFalling.val = false;
    this.isLanding.val = false;
  }


  initStates() {
    const animations = this.getAnimations().animations;
    animations.forEach(anim => {
      const state: StateUnit = {
        animation: anim,
        nexts: [],
        name: anim.name
      }
      this.stateMap.set(anim.name, state);
    });
  }

  initStatLogic() {
    const idleState = this.stateMap.get('idle') as StateUnit;
    const runState = this.stateMap.get('run') as StateUnit;
    const jumpRasingState = this.stateMap.get('jump-rasing') as StateUnit;
    const jump2fallState = this.stateMap.get('rasing-to-fall') as StateUnit;
    const fallingState = this.stateMap.get('falling') as StateUnit;
    const landingState = this.stateMap.get('landing') as StateUnit;
    const lightAttackState = this.stateMap.get('light-attack-combo') as StateUnit;

    this.entryState = idleState;
    idleState.nexts.push({
      state: runState,
      condition: this.isRun
    });
    idleState.nexts.push({
      state: jumpRasingState,
      condition: this.isRasing
    });
    idleState.nexts.push({
      state: lightAttackState,
      condition: this.isLightAttack
    });
    runState.nexts.push({
      state: jumpRasingState,
      condition: this.isRasing
    });
    runState.nexts.push({
      state: idleState,
      condition: this.isRun2idle
    });
    jumpRasingState.nexts.push({
      state: jump2fallState,
      condition: this.isRasing2Falling
    });
    jump2fallState.nexts.push({
      state: fallingState,
      condition: jump2fallState.animation.isOver
    });
    fallingState.nexts.push({
      state: landingState,
      condition: this.isLanding
    });
    landingState.nexts.push({
      state: idleState,
      condition: landingState.animation.isOver
    });
  }

  getCurState(startState: StateUnit, count: number): StateUnit {
    for (let i = 0; i < startState.nexts.length; i++) {
      if (startState.nexts[i].condition.val) {
        if (count > 0 && startState.name === 'idle') {
          this.initConditions();
        }
        startState = this.getCurState(startState.nexts[i].state, count + 1);
        break;
      }
    }
    return startState;
  }

  tick() {
    const animations = this.getAnimations().animations;
    this.setIsMirror(this.isMirror);
    const curState = this.getCurState(this.entryState, 0);
    this.setAnim(curState.name);
    super.tick();
  }
}
