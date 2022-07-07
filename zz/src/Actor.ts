import { Component } from "./components/Component";
import { SpriteComponent } from "./components/SpriteComponent";
import { Scene } from "./Scene";

export class Actor {
  private scene: Scene;
  public name: string;
  public shouldTick: boolean;
  private components: Component[];

  constructor(name: string) {
    this.name = name;
    this.components = [];
  }

  setScene(scene: Scene) {
    this.scene = scene;
  }

  getScene() {
    return this.scene;
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

}