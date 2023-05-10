import Phaser from "phaser";

import GameScene from "./scenes/Game";
import PreloaderScene from "./scenes/Pealoader";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  // ここから
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300,
      },
      debug: false,
    }
  },
  // ここまで
  scene: [PreloaderScene, GameScene],
};

export default new Phaser.Game(config);