import { Actor } from "../../Actor";

export class Player extends Actor {
  static instance: Player;
  constructor(name: string) {
    super(name);
  }
}