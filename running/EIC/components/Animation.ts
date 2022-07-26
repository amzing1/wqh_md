import { Actor } from "../base/Actor";
import { ComponentType } from "../type/type";
import { Component } from "./Component";
import { SpriteImageComponent } from "./SpriteImage";

export class Animation {
  name: string;
  group: [number, number][];
  isLoop: boolean;
  isOver: boolean = false;
  constructor(name: string, group: [number, number][], isLoop: boolean = false) {
    this.name = name;
    this.group = group;
    this.isLoop = isLoop;
  }
}

export class AnimationComponent extends Component {
  animations: Map<string, Animation> = new Map();
  curAnim: string = 'run';
  curAnimIdx: number = 0;
  isMirror: boolean = true;
  private framesOneSecound: number = 24;
  private timeTemp: number = performance.now();
  constructor(actor: Actor, animations: Animation[]) {
    super(actor, ComponentType.ANIMATION);
    animations.forEach(anim => {
      this.animations.set(anim.name, anim);
    })
  }

  initAnimations() {
    this.animations.forEach(anim => {
      if (anim.isOver) {
        anim.isOver = false;
      }
    })
  }

  getCurAnimation() {
    const curAnimation = this.animations.get(this.curAnim);
    if (!curAnimation) {
      throw Error(`no anim call ${this.curAnim}`);
    }
    return curAnimation;
  }

  setAnim(name: string) {
    if (this.curAnim === name) {
      return;
    }
    this.curAnim = name;
    this.curAnimIdx = 0;
  }


  tick() {
    if (performance.now() - this.timeTemp < 1000 / this.framesOneSecound) {
      return;
    }
    const sprite = this.getActor().getComponent(ComponentType.SPRITE) as SpriteImageComponent;
    if (!sprite) {
      return;
    }
    let curAnimation = this.getCurAnimation();
    if (!curAnimation) {
      return;
    }
    if (this.curAnimIdx >= curAnimation.group.length) {
      if (curAnimation.isLoop) {
        this.curAnimIdx = 0;
      } else {
        this.curAnimIdx--;
        curAnimation.isOver = true;
      }
    }
    // console.log('curAnim', curAnimation.name);
    sprite.sx = curAnimation.group[this.curAnimIdx][0];
    sprite.sy = curAnimation.group[this.curAnimIdx][1];
    sprite.isMirror = this.isMirror;
    this.curAnimIdx++;
    this.timeTemp = performance.now();
  }
}