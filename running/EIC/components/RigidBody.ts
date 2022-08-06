import planck, { Box, Edge, Vec2 } from "planck";
import { Actor } from "../base/Actor";
import { Physics } from "../base/Physics";
import { ComponentType, Position } from "../type/type";
import { Component } from "./Component";

export class  RigidBodyComponent extends Component {
  isStatic: boolean = false;
  body: planck.Body;
  private relativePos: Position = {x: 0, y: 0};
  constructor(actor: Actor, isStatic: boolean, box: Box, pos: Vec2)
  constructor(actor: Actor, isStatic: boolean, edge: Edge, pos?: Vec2)
  constructor(actor: Actor, isStatic: boolean, shape: Box | Edge, pos?: Vec2) {
    super(actor, ComponentType.RIGID_BODY);
    this.isStatic = isStatic;
    this.init(shape, pos);
  }

  init(shape: Box | Edge, pos?: Vec2) {
    if (this.isStatic) {
      this.body = Physics.world.createBody();
    } else {
      this.body = Physics.world.createBody().setDynamic();
    }
    
    if (pos) {
      this.body.createFixture(shape);
      this.body.setPosition(pos);
      this.body.setUserData(this.getActor());
    } else {
      this.body.createFixture({
        friction: 1,
        density: 0,
        shape: shape
      });
    }
  }

  setRelativePos(x: number, y: number) {
    this.relativePos = {x, y};
  }

  tick() {
    if (this.isStatic) {
      return;
    }
    Promise.resolve().then(() => {
      const transform = this.getActor().getTransform();
      const { x, y } = this.body.getPosition();
      const {x: rx, y: ry} = this.relativePos;
      transform.setCenter(x - rx, y - ry);
    })
  }
}