import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({key: 'gameScene'});
  }

  preload() {
    this.load.image('sky', 'assets/images/space3.png');
    this.load.image('logo', 'assets/images/phaser3-logo.png');
    this.load.image('red', 'assets/images/red.png');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    const emitter = this.add.particles(0, 0, 'red', {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });
    
    const logo = this.physics.add.image(
      this.scale.width * 0.5,
      this.scale.height * 0.5,
      'logo'
    );
    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }
}