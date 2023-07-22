import Boss from "../object/boss";
import boss_params from "../data/boss";
class Marisa extends Boss {
    constructor(id, scene) {
        super(id, scene);
        this.image = 'marisa';
        this.bossParams = boss_params[id];
        this.mode = 0;
        this.cardList = [
            '符卡：小行星带'
        ]
    }
    init() {
        this.indexX = 0;
        this.indexY = 0 - this.spriteHeight / 2;
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.x = this.scene.width / 2;
        this.y = this.spriteHeight;
        this.speed = 150;
        this.startTalk = this.bossParams.startTalk;
        this.endTalk = this.bossParams.endTalk;
        Boss.prototype.init.apply(this, arguments);
        this.sprite.anchor.set(0.5);
    }
    update() {
        Boss.prototype.update.apply(this, arguments);
        if (this.state != this.STATE_ATIVE)
            return 0;
        if (this.cardNum == 0 &&
            this.mode == 0) {
            this.starSpin();
            this.mode = 1;
        };
        if (this.cardNum == 1 &&
            this.mode == 1) {
            this.starSpinBigOne();
            this.mode = 2;
        };
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
    // 第一种符卡
    starSpin() {
        for (let i = 0; i < 5; i++) {
            let params = {
                x: this.x,
                y: this.y,
                angle: i * 72,
                speed: 0,
                indexX: 2 + i * 2,
                indexY: 10,
                width: 16,
                height: 16,
                moveType: 9,
                index: i,
                turn: 0,
            };
            this.scene.enemyBulletManager.create(params);
        }
    }
    doublespin() {

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
    eventhorizon() {
        for (let i = 0; i < 4; i++) {
            let params = {
                x: this.x,
                y: this.y,
                angle: i * 12,
                speed: 100,
                indexX: 2 + i,
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
    shootMoon() {
        for (let i = 0; i < 12; i++) {
            // if(i%2==0){
            //     let params = {
            //         x:30*i+10,
            //         y:this.scene.height,
            //         angle:270,
            //         speed:0,
            //         indexX:3,
            //         indexY:3,

            //     }
            // } else {
            //     let params = {

            //     }
            // }
        }
    }
    shootStar() {
        // console.log(1);
        let player = this.scene.player;
        let ax = player.x - this.x;
        let ay = player.y - this.y;
        let angle = this.toAngle(Math.atan2(ay, ax));
        // console.log(angle);
        for (let i = -2; i < 2; i++) {
            let params = {
                x: this.x,
                y: this.y,
                angle: angle + Math.random() * 30 + 30 * i,
                speed: 280 + Math.random() * 20,
                indexX: 3,
                indexY: 3,
                width: 16,
                height: 16,
                moveType: 2,
            }
            this.scene.enemyBulletManager.create(params);
        }
    }
}
export default Marisa;