import Phaser from "phaser";

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({key: 'preloaderScene'});
  }

  preload() {
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('ground', 'assets/images/platform.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.spritesheet('dude', 'assets/sprites/dude.png',
      {
        frameWidth: 32, 
        frameHeight: 48
      }
    );
  }

  create() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'idle',
      frames: [{key: 'dude', frame: 4}],
      frameRate: 20,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start('gameScene');
  }
}