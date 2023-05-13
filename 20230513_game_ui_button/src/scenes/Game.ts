import Phaser from "phaser";
import RectButton from "../component/RectButton";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({key: 'gameScene'});
  }

  preload() {
    this.load.atlas('buttons', 'assets/ui/nine-slice.png', 'assets/ui/nine-slice.json');
  }

  create() {
    const txtBtn = this.add.text(
      this.scale.width * 0.5,
      this.scale.height * 0.5 - 100,
      'BUTTON', {
        fontSize: '30px',
        color: '#006400'
      }
    ).setOrigin(0.5, 0.5).setInteractive();

    txtBtn.on('pointerover', () => {
      txtBtn.setColor('#00ff00');
      txtBtn.setShadow(2, 2, '0x006400', 2, true, true);
    }, this);

    txtBtn.on('pointerout', () => {
      txtBtn.setColor('#006400');
      txtBtn.setShadow(2, 2, '0x006400', 2, false, false);
    }, this);

    txtBtn.on('pointerup', () => {
      alert('テキストボタンが押されました。');
    }, this);

    new RectButton(
      this,
      this.scale.width * 0.5, this.scale.height * 0.5, 
      'BUTTON',
      () => {
        alert('グラフィックボタンが押されました。');
      }
    );

    this.add.nineslice(
      this.scale.width * 0.5,
      this.scale.height * 0.5 + 100,
      'buttons',
      'button-bg',
      300, 110
    );
  }
}