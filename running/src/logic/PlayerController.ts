import { Action, ComponentType } from "../../types/type";
import { Actor } from "../base/Actor";
import { Component } from "../base/components/Component";


export class PlayerControllerComponent extends Component {
  public actions: Set<Action>;
  constructor(actor: Actor) {
    super(actor, ComponentType.CONTROLLER);
    this.actions = new Set();
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      switch (e.key.toLocaleLowerCase()) {
        case 'arrowleft':
          this.actions.add(Action.MOVE_LEFT);
          break;
        case 'arrowright':
          this.actions.add(Action.MOVE_RIGHT);
          break;
        case ' ':
          this.actions.add(Action.JUMP);
          break;
      }
    });
    document.addEventListener('keyup', (e) => {
      switch (e.key.toLocaleLowerCase()) {
        case 'arrowleft':
          this.actions.delete(Action.MOVE_LEFT);
          break;
        case 'arrowright':
          this.actions.delete(Action.MOVE_RIGHT);
          break;
        case 'space':
          this.actions.delete(Action.JUMP);
          break;
      }
    })
  }
}