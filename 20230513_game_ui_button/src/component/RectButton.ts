import Phaser from "phaser";

export default class RectButton extends Phaser.GameObjects.Container {
  // テキスト
  private _caption: Phaser.GameObjects.Text;
  // graphic
  private _box: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, message: string, onClick: Function) {
    super(scene, x, y);
    
    this.scene.add.existing(this);
    // this.setSize(100, 40);
    // this.setInteractive();

    this._caption = this.scene.add.text(
      0, 0, message, {
        fontSize: '30px',
        color: '#00ff00'
      }
    ).setOrigin(0.5, 0.5);

    const width = this._caption.width;
    const height = this._caption.height;
    const padding = 10;

    this._box = this.scene.add.graphics();
    this._box.fillStyle(0x006400, 1);
    this._box.fillRoundedRect(
      -(width * 0.5) - padding, 
      -(height * 0.5) - padding ,
      width + padding * 2,
      height + padding * 2,
      3
    );
    this._box.lineStyle(1, 0x00ff00, 1);
    this._box.strokeRoundedRect(
      -(width * 0.5) - padding, 
      -(height * 0.5) - padding ,
      width + padding * 2,
      height + padding * 2,
      3
    );

    this.setSize(width + padding * 2, height + padding * 2);
    this.setInteractive();

    this.on('pointerover', () => {
      this._caption.setColor('#006400');
      this._box.fillStyle(0x90ee90, 1);
      this._box.fillRoundedRect(
        -(width * 0.5) - padding, 
        -(height * 0.5) - padding ,
        width + padding * 2,
        height + padding * 2,
        3
      );
      this._box.lineStyle(1, 0x00ff00, 1);
      this._box.strokeRoundedRect(
        -(width * 0.5) - padding, 
        -(height * 0.5) - padding ,
        width + padding * 2,
        height + padding * 2,
        3
      );
    }, this);
    this.on('pointerout', () => {
      this._caption.setColor('#00ff00');
      this._box.fillStyle(0x006400, 1);
      this._box.fillRoundedRect(
        -(width * 0.5) - padding, 
        -(height * 0.5) - padding ,
        width + padding * 2,
        height + padding * 2,
        3
      );
      this._box.lineStyle(1, 0x00ff00, 1);
      this._box.strokeRoundedRect(
        -(width * 0.5) - padding, 
        -(height * 0.5) - padding ,
        width + padding * 2,
        height + padding * 2,
        3
      );
    }, this);

    this.on('pointerup', () => { onClick(); }, this);

    this.add([this._box, this._caption]);
  }
}