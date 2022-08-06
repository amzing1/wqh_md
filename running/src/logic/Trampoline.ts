import { Vec2 } from "planck";
import { Actor } from "../../EIC/base/Actor";
import { Time, Timer } from "../../EIC/base/Time";
import { AnimationStateMachineComponent, RigidBodyComponent, TransformComponent } from "../../EIC/components";
import { ComponentType } from "../../EIC/type/type";
import { TrampolineASMComponent } from "./TrampolineASM";

export class Trampoline extends Actor {
  isContact: boolean = false;
  cantactActor: Actor | null = null;
  cantactTimer: Timer | null = null;
  constructor() {
    super('trampoline');
  }
  
  onContact(actor: Actor) {
    if (actor.name !== 'player') {
      return;
    }
    // console.log('trampoline on contact');
    const asm = this.getComponent(ComponentType.ANIMATION_STATE_MACHINE) as TrampolineASMComponent;
    asm.idle2tan.val = true;
    this.isContact = true;
    this.cantactActor = actor;
    // const playerBody = (actor.getComponent(ComponentType.RIGID_BODY) as RigidBodyComponent).body;
    // // playerBody.applyForceToCenter(Vec2(1000, 1000))
    // const vel = playerBody.getLinearVelocity();
    // vel.y = 10;
    // playerBody.setLinearVelocity(vel);
    // console.log(playerBody.getLinearVelocity());
    // playerBody.applyLinearImpulse(Vec2(0, 10000), actor.getTransform().getCenter());
  }

  tick() {
    super.tick();
    if (this.isContact && this.cantactActor) {
      const playerBody = (this.cantactActor.getComponent(ComponentType.RIGID_BODY) as RigidBodyComponent).body;
      const vel = playerBody.getLinearVelocity();
      vel.y = 20;
      playerBody.setLinearVelocity(vel);
      playerBody.applyForceToCenter(Vec2(0,20))
      this.isContact = false;
      this.cantactActor = null; 
    }
   

  }
}