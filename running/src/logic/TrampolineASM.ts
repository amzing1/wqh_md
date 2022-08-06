import { Actor } from "../../EIC/base/Actor";
import { AnimationStateMachineComponent } from "../../EIC/components";
import { StateUnit } from "../../EIC/components/AnimationStateMachine";

export class TrampolineASMComponent extends AnimationStateMachineComponent {
  idle2tan: {val: boolean} = {val: false};
  constructor(actor: Actor) {
    super(actor);
    this.initStateLogic();
  }

  initStateLogic() {
    const idle = this.stateMap.get('idle') as StateUnit;
    const jump = this.stateMap.get('tan') as StateUnit;
    idle.nexts.push({
      state: jump,
      condition: this.idle2tan
    });
    jump.nexts.push({
      state: idle,
      condition: jump.animation.isOver
    })
    this.entryState = idle;
  }

  initConditions() {
    this.idle2tan.val = false;
    this.initAnimations();
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
    const curState = this.getCurState(this.entryState, 0);
    this.setAnim(curState.name);
    super.tick();
  }
}