import { ComponentType } from "../../../types/type";
import { Actor } from "../Actor";
import { AnimationComponent } from "./Animation";
import { Component } from "./Component";

export class AnimationStateMachineComponent extends Component {
  constructor(actor: Actor) {
    super(actor, ComponentType.ANIMATION_STATE_MACHINE);
  }

  setIsMirror(isMirror: boolean) {
    const animComp = this.getActor().getComponent(ComponentType.ANIMATION) as AnimationComponent;
    if (!animComp) {
      throw Error('no anim comp');
    }
    animComp.isMirror = isMirror;
  }

  setAnim(name: string) {
    const animComp = this.getActor().getComponent(ComponentType.ANIMATION) as AnimationComponent;
    if (!animComp) {
      throw Error('no anim comp');
    }
    animComp.setAnim(name);
  }

  getCurAnim() {
    const animComp = this.getActor().getComponent(ComponentType.ANIMATION) as AnimationComponent;
    if (!animComp) {
      throw Error('no anim comp');
    }
    const curAnim = animComp.getCurAnimation();
    return curAnim;
  }
}