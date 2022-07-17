import { Animation, AnimationComponent } from "./base/components/Animation";
import { SpriteImageComponent } from "./base/components/SpriteImage";
import { TransformComponent } from "./base/components/Transform";
import { Scene } from "./base/Scene";
import { Ground } from "./logic/Ground";
import { Player } from "./logic/Player";
import { PlayerASM } from "./logic/PlayerASM";
import { PlayerControllerComponent } from "./logic/PlayerController";

export class Level {
  static player: Player | null = null;

  static initPlayer() {
    if (Level.player) {
      return Level.player;
    }
    const scene = Scene.instance as Scene;
    const { width, height } = scene;

    const player = new Player({ x: 1, y: 2 });
    // 精灵图每个单元的宽高
    const sWidth = 112;
    const sHeight = 133;
    new TransformComponent(player, { x: width / 2, y: height / 2 });
    new SpriteImageComponent(player, new Image(), 'image/player.png', 112, 133, 0, 0, 112, 133);
    new PlayerControllerComponent(player);

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
            animations.push(new Animation('run', group));
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
            animations.push(new Animation('light-attack-combo', group));
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
    scene.addActor(player);
  }
  
  static initGround(x: number) {
    const isHigh = Math.random() > 0.8;
    const ground = new Ground('ground', isHigh);
    const sceneHeight = (Scene.instance as Scene).height
    new TransformComponent(ground, { x, y: sceneHeight - (isHigh ? 80 : 40) });
    new SpriteImageComponent(ground, new Image(), isHigh ? 'image/high.jpg' : 'image/ground.png', 80, isHigh ? 160 : 80);
    Scene.instance?.addActor(ground);
  }
  static initGrounds() {
    for (let i = 0; i < 20; i++) {
      Level.initGround(i * 80);
    }
  }
}