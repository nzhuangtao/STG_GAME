import BaseObject from "./object";
import EnemyBullet from "./enemyBullet";
class Boss extends BaseObject {
    STATE_START = 1;
    STATE_ATTACK = 2;
    constructor(id, scene) {
        super(id, scene);
        this.state = this.STATE_START;
        this.hp = 100;
        this.bulletIndex = 0;
        this.bulletType = bullet_type[2];
    }
    init() {
        this.image = 'mokou';
        this.indexX = 0;
        this.indexY = 0;
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.x = 640 / 2;
        this.y = 0;
        this.speed = 100;
        this.leafNum = 1;
        BaseObject.prototype.init.apply(this, arguments);
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments);
        if (this.state == this.STATE_START) {
            this.y += this.speed * (1 / 60);
            if (this.y >= this.spriteHeight) {
                this.y = this.spriteHeight;
                this.state = this.STATE_ATTACK;
            };
        };
        if (this.state == this.STATE_ATTACK && this.frame_count % 100 == 0 && this.leafNum <= 20) {
            this.tripleorbs();
            this.leafNum += 1;
        }
        // if (this.state == this.STATE_ATTACK && this.leafNum >= 0 && this.frame_count % 100 == 0) {
        //     this.tripleorbs();
        // }
    }
    shot() {
        // let params = {
        //     x: this.x,
        //     y: this.y,
        //     moveType: 1,
        //     speed: 200,
        //     angle: 90,
        //     indexX:0,
        //     indexY:0,
        //     width:16,
        //     height:16,
        // }
        // this.scene.enemyBulletManager.create(params);
        this.Leaf();
    }
    Leaf() {
        // let player = this.scene.player;
        // let ax = player.x - this.x;
        // let ay = player.y - this.y;
        // let angle = this.toAngle(Math.atan2(ay, ax));
        for (let i = 0; i < 5; i++) {
            for (var j = 0; j < 12; j++) {
                let params = {
                    x: this.x,
                    y: this.y,
                    moveType: 5,
                    speed: (1 + 0.7 * (5 - i)) * 30,
                    angle: (this.leafNum % 2 == 0 ? 180 : 0) - (120 + j * 10),
                    indexX: 0,
                    indexY: 0,
                    width: 16,
                    height: 16,
                    delay: 200,
                }
                this.scene.enemyBulletManager.create(params);
            }
        }
    }
    tripleorbs() {
        let player = this.scene.player;
        let ax = player.x - this.x;
        let ay = player.y - this.y;
        let angle = this.toAngle(Math.atan2(ay, ax));
        for (let i = 0; i < 9; i++) {
            for (var j = 0; j < 3; j++) {
                let params = {
                    x: this.x,
                    y: this.y,
                    moveType: 2,
                    speed: i*10+100,
                    angle: angle+j*10,
                    indexX: 2,
                    indexY: 2,
                    width: 16,
                    height: 16,
                };
                this.scene.enemyBulletManager.create(params);
            }
        }
    }
    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    drawHp() {

    }
    handleCollision() {

    }
}
export default Boss;