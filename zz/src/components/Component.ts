import { Actor } from "../Actor";

export class Component {
  private actor: Actor;
  setActor(actor: Actor) {
    this.actor = actor;
  }
}