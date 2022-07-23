import { Actor } from "./Actor";
import { Canvas } from "./Canvas";
import { Physics } from "./Physics";
import { Time } from "./Time";

export class Scene extends Actor {
  static instance: Scene;
  constructor() {
    super("Scene");
    if (Scene.instance) {
      return Scene.instance;
    }
    Scene.instance = this;
    this.tick();
  }

  tick() {
    requestAnimationFrame(() => {
      Time.delta = performance.now() - Time.curTime;
      Time.curTime = performance.now();
      Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);
      super.tick();
      this.tick();
      Physics.tickPhysics();
    });
  }
}
