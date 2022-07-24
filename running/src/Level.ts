import { Box, Vec2, Edge, Polygon } from 'planck';
import { Canvas } from '../EIC/base/Canvas';
import { Scene } from '../EIC/base/Scene';
import { Animation, AnimationComponent, RigidBodyComponent, SpriteImageComponent, TransformComponent } from '../EIC/components';
import { Position } from '../EIC/type/type';
import { Ground } from './logic/Ground';
import { Player } from './logic/Player'
import { PlayerASM } from './logic/PlayerASM';

export class Level {
  static player: Player | null = null;

  static initPlayer() {
    if (Level.player) {
      return Level.player;
    }

    const { width, height } = Canvas;

    const player = new Player({ x: 1, y: 0.2 });
    // 精灵图每个单元的宽高
    const sWidth = 112;
    const sHeight = 133;

    
    new SpriteImageComponent(player, new Image(), 'image/player.png', 112, 133, 0, 0, 112, 133);
    new TransformComponent(player, {x: width / 2, y: height / 2}, 0, {x: 112, y: 133});

    const rigid = new RigidBodyComponent(player, false, new Box(16, 16),  Vec2(width / 2, height / 2));
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
          case 42 - 17:
            animations.push(new Animation('run', group, true));
            group = [];
            break;
          case 51 - 17:
            animations.push(new Animation('light-bow', group));
            group = [];
            break;
          case 54 - 17:
            animations.push(new Animation('jump-rasing', group));
            group = [];
            break;
          case 61 - 17:
            animations.push(new Animation('rasing-to-fall', group));
            group = [];
            break;
          case 64 - 17:
            animations.push(new Animation('falling', group));
            group = [];
            break;
          case 68 - 17:
            animations.push(new Animation('landing', group));
            group = [];
            break;
          case 72 - 17:
            animations.push(new Animation('sliding', group));
            group = [];
            break;
          case 96 - 17:
            animations.push(new Animation('light-attack-combo', group, true));
            group = [];
            break;
          case 138 - 17:
            animations.push(new Animation('heavy-attack-combo', group));
            group = [];
            break;
          case 145 - 17:
            animations.push(new Animation('hurt-1', group));
            group = [];
            break;
          case 152 - 17:
            animations.push(new Animation('hurt-2', group));
            group = [];
            break;
          case 156 - 17:
            animations.push(new Animation('wall-slide', group));
            group = [];
            break;
          case 161 - 17:
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
  
  static initGround(x: number) {
    // const isHigh = Math.random() > 0.8;
    const isHigh = false;
    const ground = new Ground('ground', isHigh);
    new TransformComponent(ground, { x, y: 40 }, 0, {x: 80, y: 80  });
    new SpriteImageComponent(ground, new Image(), isHigh ? 'image/high.jpg' : 'image/ground.png', 80, isHigh ? 160 : 80);
    const v1: Vec2 = new Vec2(x - 40,(isHigh ? 160 : 80));
    const v2: Vec2 = new Vec2(x + 40, (isHigh ? 160 : 80));
    new RigidBodyComponent(ground, true, new Edge(v1, v2))
    Scene.instance.addChildren(ground);
  }
  static initGrounds() {
    for (let i = 0; i < 20; i++) {
      Level.initGround(i * 80 + 40);
    }
  }
}