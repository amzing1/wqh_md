import { Actor } from "./Actor";

interface SceneProps {
  width: number,
  height: number
}

export class Scene {
  private ctx: CanvasRenderingContext2D;
  private props: SceneProps;
  static instance: Scene | null;
  private actors: Actor[];
  constructor(ctx: CanvasRenderingContext2D, props: SceneProps) {
    if (Scene.instance) {
      return Scene.instance;
    }
    this.ctx = ctx;
    this.props = props;
    this.actors = []; 
    Scene.instance = this;
    this.tick();
  }
  getSize() {
    const { width, height } = this.props;
    return { width, height };
  }
  addActor(actor: Actor) {
    this.actors.push(actor);
  }
  getActor(name: string) {
    const actor = this.actors.find(actor => actor.name === name);
    if (!actor) {
      throw new Error('not found');
    }
    return actor;
  }

  tickActors(actors: Actor[]) {
    actors.forEach(item => {
      if (item.children.length) {
        this.tickActors(item.children);
      }
      item.tick();
    })
  }

  tick() {
    this.ctx.clearRect(0, 0, this.props.width, this.props.height);
    this.tickActors(this.actors);
    requestAnimationFrame(() => {
      this.tick();
    })
  }
}