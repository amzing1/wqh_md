import { Actor } from "../Actor";

export class Component {
  private actor: Actor;
  public name: string;
  setActor(actor: Actor) {
    this.actor = actor;
  }
  getActor() {
    return this.actor;
  }
  setName(name: string) {
    this.name = name;
  }
  tick() {}
}