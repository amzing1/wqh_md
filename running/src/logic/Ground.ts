import { Actor } from '../../EIC/base/Actor'
export class Ground extends Actor {
  public isHigh: boolean;
  constructor(name: string, isHigh: boolean) {
    super(name);
    this.isHigh = isHigh;
  }
}