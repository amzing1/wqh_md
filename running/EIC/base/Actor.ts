import { Component } from '../components/Component';
import { TransformComponent } from '../components/Transform';
import { ComponentType } from '../type/type';
import { Scene } from './Scene';


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
    if (!component) {
      throw Error(`no component called ${name} in actor`);
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
    if (!this.isDie) {
      this.componentMap.forEach(comp => comp.tick());
      this.children.forEach(actor => {
        actor.tick();
      })
    }
  }

  die() {
    if (this.parent) {
      this.parent.children.delete(this);
      this.parent = null;
    }
    this.isDie = true;
  }

  init(parent: Actor) {
    const parentTransform = parent.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    const selfTransform = this.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    selfTransform.position.x += parentTransform.position.x;
    selfTransform.position.y += parentTransform.position.y;
    selfTransform.rotation += parentTransform.rotation;
  }

  addChildren(actor: Actor) {
    this.children.add(actor);
    actor.parent = this;
    if (this !== Scene.instance) actor.init(this);
  }

  getTransform() {
    const trans = this.getComponent(ComponentType.TRANSFORM) as TransformComponent;
    return trans;
  }
}