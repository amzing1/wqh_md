import planck, { Box, Edge, Vec2 } from "planck";
import { Actor } from "../base/Actor";
import { Physics } from "../base/Physics";
import { ComponentType } from "../type/type";
import { Component } from "./Component";

export class  RigidBodyComponent extends Component {
  isStatic: boolean = false;
  body: planck.Body;
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
    } else {
      this.body.createFixture({
        friction: 1,
        density: 0,
        shape: shape
      });
    }
    
  }

  tick() {
    if (this.isStatic) {
      return;
    }
    Promise.resolve().then(() => {
      const transform = this.getActor().getTransform();
      const { x, y } = this.body.getPosition();
      transform.setCenter(x, y);
    })
  }
}