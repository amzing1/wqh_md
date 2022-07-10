import { Component } from "./components/Component";
import { SpriteComponent } from "./components/SpriteComponent";
import { TransformComponent } from "./components/TransformComponent";
import { Scene } from "./Scene";

export class Actor {
  private scene: Scene;
  public name: string;
  public shouldTick: boolean;
  private components: Component[];
  public children: Set<Actor>;
  public parent: Actor | null;
  public isDie: boolean = false;
  constructor(name: string) {
    this.name = name;
    this.components = [];
    this.children = new Set();
    this.parent = null;
  }



  addComponent(compoennt: Component) {
    compoennt.setActor(this);
    this.components.push(compoennt);
  }

  getComponent(name: string) {
    const component = this.components.find(component => component.name === name);
    if (!component) {
      return;
    }
    return component;
  }

  getChildren(name: string) {
    let res: Actor[] = [];
    this.children.forEach(c => {
      if (c.name === name) {
        res.push(c);
      }
    })
    return res;
  }

  tick() {
    if (!this.isDie)
      this.components.forEach(comp => comp.tick());
  }

  addChildren(actor: Actor) {
    this.children.add(actor);
    actor.parent = this;
    (this.getComponent('Transform') as TransformComponent).computeChildTransform(actor);
  }
}