import * as planck from 'planck/dist/planck-with-testbed';
import { Actor } from './Actor';
import { Canvas } from './Canvas';
import { Time } from './Time';

export class Physics {
  static world: planck.World;
  static isDebug: boolean = true;
  static isFirst: boolean = true;
  constructor() {
    Physics.world = planck.World();
    Physics.world.setGravity(planck.Vec2(0, -10));
  }

  static tickPhysics() {
    const velocityIterations = 8;
    const positionIterations = 3;
    Physics.world.step(Time.delta, velocityIterations, positionIterations);

    let contact = Physics.world.getContactList();
    while (contact) {
      const actorA = contact.getFixtureA().getBody().getUserData() as Actor;
      const actorB = contact.getFixtureB().getBody().getUserData() as Actor;
      if (actorA && actorB) {
        actorA.onContact(actorB);
        actorB.onContact(actorA);
      }
      contact = contact.getNext();
    }

    if (Physics.isDebug) {
      let body = Physics.world.getBodyList();
      while (body) {
        Physics.drawPhysicsBody(body);
        body = body.getNext();
      }
    }
  }

  static drawPhysicsBody(body: planck.Body) {
    const position = body.getWorldCenter();
    const fixture = body.getFixtureList();
    if (!fixture) {
      return;
    }
    let shape = fixture.getShape();
    switch (shape.getType()) {
      case 'edge': {
        const edge: planck.Edge = shape as planck.Edge;
        Canvas.ctx.save();
        Canvas.ctx.strokeStyle = 'red';
        Canvas.ctx.beginPath();
        Canvas.ctx.moveTo(edge.m_vertex1.x, Canvas.height - edge.m_vertex1.y);
        Canvas.ctx.lineTo(edge.m_vertex2.x, Canvas.height - edge.m_vertex2.y);
        Canvas.ctx.stroke();
        Canvas.ctx.restore();
        break;
      }
      case 'polygon': {
        const polygon: planck.Polygon = shape as planck.Polygon;
        Canvas.ctx.save();
        Canvas.ctx.strokeStyle = '#000';
        Canvas.ctx.beginPath();
        Canvas.ctx.moveTo(position.x + polygon.m_vertices[0].x, Canvas.height - position.y + polygon.m_vertices[0].y);
        for (let i = 1; i < polygon.m_vertices.length; i++) {
          Canvas.ctx.lineTo(position.x + polygon.m_vertices[i].x, Canvas.height - position.y + polygon.m_vertices[i].y);
        }
        Canvas.ctx.lineTo(position.x + polygon.m_vertices[0].x, Canvas.height - position.y + polygon.m_vertices[0].y);
        Canvas.ctx.stroke();
        Canvas.ctx.restore();
      }
    }
  }
}
