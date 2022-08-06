import { Light } from '@box2d/lights';
import { Box, Vec2, Edge } from 'planck';
import { Canvas } from '../EIC/base/Canvas';
import { Scene } from '../EIC/base/Scene';
import { Animation, AnimationComponent, RigidBodyComponent, SpriteImageComponent, TransformComponent } from '../EIC/components';
import { LightComponent } from '../EIC/components/Light';
import { Ground } from './logic/Ground';
import { Player } from './logic/Player'
import { PlayerASM } from './logic/PlayerASM';
import { Trampoline } from './logic/Trampoline';
import { TrampolineASMComponent } from './logic/TrampolineASM';

export class Level {
  static player: Player | null = null;

  static initPlayer() {
    if (Level.player) {
      return Level.player;
    }

    const { width, height } = Canvas;

    const player = new Player();
    // 精灵图每个单元的宽高
    const sWidth = 112;
    const sHeight = 133;

    
    new SpriteImageComponent(player, new Image(), 'image/player.png', 112, 133, 0, 0, 112, 133);
    new TransformComponent(player, {x: width / 2, y: height / 2}, 0, {x: 112, y: 133});

    const rigid = new RigidBodyComponent(player, false, new Box(8, 16),  Vec2(width / 2, height / 2));
    rigid.setRelativePos(0, -16);



    const animations: Animation[] = [];
    let group: [number, number][] = [];
    let idx = 0;
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 12; j++) {
        idx++;
        group.push([j * sWidth, i * sHeight]);
        // 这么办法，根据图片来的
        switch (idx) {
          case 1:
            animations.push(new Animation('idle', group));
            group = [];
            break;
          case 25:
            animations.push(new Animation('run', group, true));
            group = [];
            break;
          case 34:
            animations.push(new Animation('light-bow', group, true));
            group = [];
            break;
          case 37:
            animations.push(new Animation('jump-rasing', group));
            group = [];
            break;
          case 44:
            animations.push(new Animation('rasing-to-fall', group));
            group = [];
            break;
          case 47:
            animations.push(new Animation('falling', group));
            group = [];
            break;
          case 51:
            animations.push(new Animation('landing', group));
            group = [];
            break;
          case 55:
            animations.push(new Animation('sliding', group));
            group = [];
            break;
          case 79:
            animations.push(new Animation('light-attack-combo', group, true));
            group = [];
            break;
          case 121:
            animations.push(new Animation('heavy-attack-combo', group));
            group = [];
            break;
          case 128:
            animations.push(new Animation('hurt-1', group));
            group = [];
            break;
          case 135:
            animations.push(new Animation('hurt-2', group));
            group = [];
            break;
          case 139:
            animations.push(new Animation('wall-slide', group));
            group = [];
            break;
          case 144:
            animations.push(new Animation('running-turn-around', group));
            group = [];
            break;
          default:
            break;
        }
      }
    }

    new AnimationComponent(player, animations);
    new PlayerASM(player);

    Level.player = player;
    Scene.instance.addChildren(player);
  }
  
  static initGround(x: number, isHigh: boolean) {
    const ground = new Ground('ground', isHigh);
    new TransformComponent(ground, { x, y: isHigh ? 80 : 40 }, 0, {x: 80, y: isHigh ? 160 : 80  });
    new SpriteImageComponent(ground, new Image(), isHigh ? 'image/high.jpg' : 'image/ground.png', 80, isHigh ? 160 : 80);
    const v1: Vec2 = new Vec2(x - 40,(isHigh ? 160 : 80));
    const v2: Vec2 = new Vec2(x + 40, (isHigh ? 160 : 80));
    if (isHigh) {
      new RigidBodyComponent(ground, true, new Box(40, 40), new Vec2(x, 120));
    } else {
      new RigidBodyComponent(ground, true, new Edge(v1, v2))
    }
    
    Scene.instance.addChildren(ground);
  }
  static initGrounds() {
    for (let i = 0; i < 20; i++) {
      Level.initGround(i * 80 + 40, i === 3);
    }
  }
  static initTrampoline() {
    const trampoline = new Trampoline();
    new TransformComponent(trampoline, {x: Canvas.width / 2, y: 80 + 14}, 0, {x: 28, y: 28});
    new SpriteImageComponent(trampoline, new Image(), 'image/trampoline.png', 28, 28, 28, 0, 28, 28);
    new RigidBodyComponent(trampoline, true, new Box(14, 14), new Vec2(Canvas.width / 2, 80 + 14));
    const idleAnim = new Animation('idle', [[84, 0]]);
    const tanAnim = new Animation('tan', [[84, 0], [112 , 0], [196, 0], [0, 0], [196, 0], [112, 0], [84, 0], [56, 0], [28, 0], [56, 0], [84, 0]]);
    const animations = [idleAnim, tanAnim];
    new AnimationComponent(trampoline, animations);
    new TrampolineASMComponent(trampoline); 


    Scene.instance.addChildren(trampoline);
  }
}