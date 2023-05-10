import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  // CursorKey
  private _cursorKey!: Phaser.Types.Input.Keyboard.CursorKeys;
  // Player
  private _player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  // Stars
  private _stars!: Phaser.Physics.Arcade.Group;
  // Score
  private _score: number = 0;
  private _scoreDisplay!: Phaser.GameObjects.Text;
  // Bomb
  private _bombs!: Phaser.Physics.Arcade.Group;
  // Game Status
  private _isGameOver: boolean = false;

  constructor() {
    super({key: 'gameScene'});
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    // 静的物理オブジェクトグループ追加
    const platforms = this.physics.add.staticGroup();

    // 地表面追加
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    // 2階
    platforms.create(600, 400, 'ground');
    // 3階
    platforms.create(50, 250, 'ground');
    // 4階
    platforms.create(750, 220, 'ground');

    // プレイヤー
    this._player = this.physics.add.sprite(100, 450, 'dude');

    this._player.setBounce(0.2);
    this._player.setCollideWorldBounds(true);

    // 星を降らせる
    this._stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: {
        x: 12,
        y: 0,
        stepX: 70,
      }
    });
    this._stars.children.each(child => {
      const star = child as Phaser.Physics.Arcade.Sprite;
      star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      return true;
    });

    // Score
    this._score = 0;
    this._scoreDisplay = this.add.text(
      16, 16, 'Score: 0',{
        fontSize: '32px',
        color: '#000000',
      }
    );
    // Bombs
    this._bombs = this.physics.add.group();
    // create bomb
    // const x = Phaser.Math.Between(0, 800);
    // const bomb = this._bombs.create(x, 16, 'bomb');
    // bomb.setBounce(1);
    // bomb.setCollideWorldBounds(true);
    // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.physics.add.collider(this._player, platforms);
    this.physics.add.collider(this._stars, platforms);
    this.physics.add.collider(this._bombs, platforms);
    this.physics.add.collider(
      this._player, this._bombs,
      this.hitBomb, undefined, this
    );

    this.physics.add.overlap(
      this._player, this._stars,
      this.collectStar, undefined, this
    );

    this._cursorKey = this.input.keyboard?.createCursorKeys()!;
  }

  update(_: number, _2: number): void {
    if (this._isGameOver) {
      this.add.text(
        this.scale.width * 0.5,
        this.scale.height * 0.5,
        'GAME OVER',{
          fontSize: '32px',
          color: '#000000',
        }
      ).setOrigin(0.5, 0.5);
      return;
    }

    if (this._cursorKey.left.isDown) {
      // 左方向キーが押されたら
      // X軸のマイナス方向に160の速度にする。（左に動く）
      this._player.setVelocityX(-160);
      this._player.play('left', true);
    } else if (this._cursorKey.right.isDown) {
      // 右方向キーが押されたら
      // X軸のプラス方向に160の速度にする。（右に動く)
      this._player.setVelocityX(160);
      this._player.play('right', true);
    } else {
      // 何も押されなかったら
      // 速度を０にする
      this._player.setVelocityX(0);
      this._player.play('idle', true);
    }

    if (this._cursorKey.up.isDown && this._player.body.touching.down) {
      this._player.setVelocityY(-330);
    }
  }

  collectStar(_: any, star: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    star.destroy();
    this._score += 10;
    this._scoreDisplay.setText(`Score: ${this._score}`);

    // 星の数が０になったら
    if (this._stars.countActive(true) === 0) {
      // 星を作る
      let starX = 12;
      for (let index = 0; index < 12; index++) {
        const tempStar = this._stars.create(starX, 0, 'star');
        tempStar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        starX += 70;
      }

      // 爆弾を追加する
      // 爆弾の位置はキャラクターと遠い位置にする
      const x = (this._player.x < 400) ? 
        Phaser.Math.Between(400, 800) :
        Phaser.Math.Between(0, 400);
      const bomb = this._bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  hitBomb(player: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, _: any) {
    // キャラクター操作のため、タイプキャスト
    const obj = player as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    // 物理適用を一時停止させる
    this.physics.pause();
    // キャラクターを赤く染める
    obj.setTint(0xff0000);
    // キャラクターを停止フレームにする
    obj.play('idle');
    // ゲームオーバー状態にする
    this._isGameOver = true;
  }
}