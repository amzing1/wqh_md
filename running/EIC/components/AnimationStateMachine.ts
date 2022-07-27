import { Actor } from "../base/Actor";
import { ComponentType } from "../type/type";
import { Animation, AnimationComponent } from "./Animation";
import { Component } from "./Component";

export interface Next {
  state: StateUnit,
  condition: {val: boolean}
}
export interface StateUnit {
  animation: Animation;
  nexts: Next[];
  name: string;
}

export class AnimationStateMachineComponent extends Component {
  entryState: StateUnit;
  constructor(actor: Actor) {
    super(actor, ComponentType.ANIMATION_STATE_MACHINE);
  }

  initAnimations() {
    this.getAnimations().initAnimations();
  }

  setIsMirror(isMirror: boolean) {
    const animComp = this.getActor().getComponent(
      ComponentType.ANIMATION
    ) as AnimationComponent;
    animComp.isMirror = isMirror;
  }

  setAnim(name: string) {
    const animComp = this.getActor().getComponent(
      ComponentType.ANIMATION
    ) as AnimationComponent;
    animComp.setAnim(name);
  }

  getAnimations() {
    const animComp = this.getActor().getComponent(
      ComponentType.ANIMATION
    ) as AnimationComponent;
    return animComp;
  }

  getCurAnim() {
    const animComp = this.getActor().getComponent(
      ComponentType.ANIMATION
    ) as AnimationComponent;
    const curAnim = animComp.getCurAnimation();
    return curAnim;
  }
}
