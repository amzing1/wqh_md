import { ComponentType } from "../../../types/type";
import { Actor } from "../Actor";

export class Component {
  private actor: Actor;
  public name: ComponentType;
  constructor(name: ComponentType)
  constructor(name: ComponentType, actor: Actor)
  constructor(name: ComponentType, actor?: Actor) {
    this.name = name;
    if (actor) {
      this.actor = actor;
    }
  }
  setActor(actor: Actor) {
    this.actor = actor;
  }
  getActor() {
    return this.actor;
  }
  tick() {}
}