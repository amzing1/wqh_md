
import { ComponentType } from "../../types/type";
import { Component } from "./components/Component";
import { TransformComponent } from "./components/Transform";

export class Actor {
  public name: string;
  private componentMap: Map<ComponentType, Component> = new Map();
  public children: Set<Actor> = new Set();
  public parent: Actor | null = null;
  public isDie: boolean = false;
  constructor(name: string) {
    this.name = name;
  }

  addComponent(component: Component) {
    component.setActor(this);
    this.componentMap.set(component.name, component);
  }

  getComponent(name: ComponentType) {
    const component = this.componentMap.get(name);
    return component || null;
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
      this.componentMap.forEach(comp => comp.tick());
  }

  addChildren(actor: Actor) {
    this.children.add(actor);
    actor.parent = this;
    (this.getComponent(ComponentType.TRANSFORM) as TransformComponent).computeChildTransform(actor);
  }
}