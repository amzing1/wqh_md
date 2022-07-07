import { Component } from "./components/Component";
import { SpriteComponent } from "./components/SpriteComponent";
import { TransformComponent } from "./components/TransformComponent";
import { Scene } from "./Scene";

export class Actor {
  private scene: Scene;
  public name: string;
  public shouldTick: boolean;
  private components: Component[];
  public children: Actor[];

  constructor(name: string) {
    this.name = name;
    this.components = [];
    this.children = [];
  }

  addComponent(compoennt: Component) {
    compoennt.setActor(this);
    this.components.push(compoennt);
  }

  getComponent(name: string) {
    const component = this.components.find(component => component.name === name);
    if (!component) {
      throw new Error('not found');
    }
    return component;
  }

  tick() {
    this.components.forEach(comp => comp.tick());
  }

  addChildren(actor: Actor) {
    this.children.push(actor);
    (this.getComponent('Transform') as TransformComponent).computeChildTransform(actor);
  } 

}