import { TransformComponent } from "../components";
import { Canvas } from "./Canvas";
import { Event } from "./Event";
import { Physics } from "./Physics";
import { Scene } from "./Scene";

export class EIC {
  static usePhysics: boolean = true;
  constructor(width: number, height: number, ctx: CanvasRenderingContext2D, usePhysics: boolean) {
    new Canvas(width, height, ctx);
    EIC.usePhysics = usePhysics;
    const scene = new Scene();
    new TransformComponent(scene);
    if (usePhysics) {
      new Physics();
    }
    Event.initEvent();
  }
}