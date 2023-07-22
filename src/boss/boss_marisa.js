import Boss from "../object/boss";
import boss_params from "../data/boss";
class Marisa extends Boss {
    constructor(id, scene) {
        super(id, scene);
        this.image = 'marisa';
        this.bossParams = boss_params[id];
        this.modeShotNum = 20;
    }
    init() {
        this.indexX = 0;
        this.indexY = 0 - this.spriteHeight / 2;
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.x = this.scene.width / 2;
        this.y = 0 - this.spriteHeight;
        this.speed = 150;
        this.mode = 0;
        this.startTalk = this.bossParams.startTalk;
        this.endTalk = this.bossParams.endTalk;
        Boss.prototype.init.apply(this, arguments);
        this.sprite.anchor.set(0.5);
    }
    update() {
        Boss.prototype.update.apply(this, arguments);
        if (this.state != this.STATE_ATIVE)
            return 0;

        // if (this.mode == 0 && this.frame_count % 100 == 0) {
        //     this.starSpin();
        //     this.mode = 1;
        // }
        // if (this.mode == 0 && this.frame_count % 10 == 0 && this.modeShotNum > 0) {

        //     this.eventhorizon();
        //     this.mode = 1;
        //     //this.modeShotNum--;
        // }
        // if (this.frame_count > 200 && this.mode == 0 & this.frame_count % 30 == 0) {
        //     this.starSpinBigTwo();
        // }
        // if (this.frame_count > 1000) {
        //     this.frame_count = 0;
        // }
    }
    draw() {
        Boss.prototype.draw.apply(this, arguments);
    }
    starSpinBigOne() {
        for (let i = 0; i < 9; i++) {
            let params1 = {
                x: this.x,
                y: this.y,
                angle: i * 40 + this.frame_count,
                speed: 200,
                indexX: 3,
                indexY: 10,
                width: 16,
                height: 16,
                moveType: 11,
                scale: 2,
            }
            this.scene.enemyBulletManager.create(params1);
            let params2 = {
                x: this.x,
                y: this.y,
                angle: i * 40 + this.frame_count + 20,
                speed: 200,
                indexX: 5,
                indexY: 10,
                width: 16,
                height: 16,
                moveType: 11,
                scale: 2,
            }
            this.scene.enemyBulletManager.create(params2);
        }
    }
    starSpinBigTwo() {
        for (let i = 0; i < 5; i++) {
            let params1 = {
                x: Math.random() * this.scene.width,
                y: 0,
                angle: i * 40,
                speed: 200,
                indexX: 3,
                indexY: 10,
                width: 16,
                height: 16,
                moveType: 11,
            }
            this.scene.enemyBulletManager.create(params1);
            let params2 = {
                x: 0,
                y: Math.random() * this.scene.height,
                angle: i * 40,
                speed: 200,
                indexX: 5,
                indexY: 10,
                width: 16,
                height: 16,
                moveType: 11,
            }
            this.scene.enemyBulletManager.create(params2);
        }
    }
    starSpin() {
        for (let i = 0; i < 5; i++) {
            let params = {
                x: this.x + Math.cos(this.toRadian(i * 72)) * 100,
                y: this.y + Math.sin(this.toRadian(i * 72)) * 100,
                angle: i * 72,
                speed: 100,
                indexX: 2 + i * 2,
                indexY: 10,
                width: 16,
                height: 16,
                moveType: 9,
                index: i,
            }
            this.scene.enemyBulletManager.create(params);
        }
    }
    eventhorizon() {
        for (let i = 0; i < 4; i++) {
            let params = {
                x: this.x,
                y: this.y,
                angle: i * 12,
                speed: 100,
                indexX: 2+i,
                indexY: 10,
                width: 16,
                height: 16,
                moveType: 13,
                index: i,
            };
            this.scene.enemyBulletManager.create(params);
        }
    }
    trispin() {
        for (let i = 0; i < 5; i++) {
            let params1 = {
                x: this.x,
                y: this.y,
                angle: i * 72,
                speed: 100,
                indexX: 2 + i * 2,
                indexY: 10,
                width: 16,
                height: 16,
                moveType: 12,
                index: i,
            }
            this.scene.enemyBulletManager.create(params1);
            let params2 = {
                x: this.x,
                y: this.y,
                angle: i * 72,
                speed: 100,
                indexX: 2 + i * 2,
                indexY: 10,
                width: 16,
                height: 16,
                moveType: 12,
                index: i,
            }
            this.scene.enemyBulletManager.create(params2);
        }
    }
    notifyShot(type) {
        this.mode = 0;
        this.frame_count = 0;
    }
}
export default Marisa;