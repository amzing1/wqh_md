import { Actor } from "./Actor";

interface SceneProps {
  width: number,
  height: number
}

export class Scene {
  private ctx: CanvasRenderingContext2D;
  private props: SceneProps;
  static instance: Scene | null;
  static ctx: CanvasRenderingContext2D;
  private actors: Actor[];
  constructor(ctx: CanvasRenderingContext2D, props: SceneProps) {
    if (Scene.instance) {
      return Scene.instance;
    }
    this.ctx = ctx;
    Scene.ctx = ctx;
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
  getActor(name: string): Actor[] {
    const actors = this.actors.filter(actor => actor.name === name);
    return actors;
  }

  tickActors(actors: Actor[]) {
    actors.forEach(item => {
      if (item.children.size) {
        this.tickActors([...item.children]);
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