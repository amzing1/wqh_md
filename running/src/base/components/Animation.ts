import { ComponentType } from "../../../types/type";
import { Actor } from "../Actor";
import { Component } from "./Component";
import { SpriteComponent } from "./Sprite";
import { SpriteImageComponent } from "./SpriteImage";

export class Animation {
  name: string;
  group: [number, number][];
  constructor(name: string, group: [number, number][]) {
    this.name = name;
    this.group = group;
  }
}

export class AnimationComponent extends Component {
  private animations: Map<string, Animation> = new Map();
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
    console.log(animations[2].group);
  }


  tick() {
    if (performance.now() - this.timeTemp < 1000 / this.framesOneSecound) {
      return;
    }
    const sprite = this.getActor().getComponent(ComponentType.SPRITE) as SpriteImageComponent;
    if (!sprite) {
      return;
    }
    const curAnimGroup = this.animations.get(this.curAnim);
    if (!curAnimGroup) {
      throw Error(`no anim call ${this.curAnim}`);
    }
    if (this.curAnimIdx >= curAnimGroup.group.length) {
      this.curAnimIdx = 0;
    }
    sprite.sx = curAnimGroup.group[this.curAnimIdx][0];
    sprite.sy = curAnimGroup.group[this.curAnimIdx][1];
    sprite.isMirror = this.isMirror;
    this.curAnimIdx++;
    this.timeTemp = performance.now();
  }
}