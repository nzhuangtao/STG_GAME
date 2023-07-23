import Boss from "../object/boss";
import BOSS_CONFIG from "../config/boss";
import getBulletType from "../data/bullet";
class Marisa extends Boss {
    constructor(id, scene) {
        super(id, scene);
        this.image = 'marisa';
        this.imageStand = 'marisa_stand';
        this.config = null;
    }
    init() {
        this.config = BOSS_CONFIG[this.id];
        this.spriteWidth = config.width;
        this.spriteHeight = config.height;
        this.x = this.scene.width / 2;
        this.y = this.spriteHeight;
        this.speed = 200;
        Boss.prototype.init.apply(this, arguments);
    }
    update() {
        Boss.prototype.update.apply(this, arguments);
        if (this.state != this.STATE_ATIVE)
            return 0;

        // if (this.cardNum == 0 && this.starSpinNum > 0) {
        //     this.starSpin();
        //     this.starSpinNum--;
        // };
        // if (this.cardNum == 1) {
        //     if(this.frame_count % 10 == 0){
        //         this.starSpinBig();
        //     };
        //     if(this.frame_count > 100 ) {
        //         if(this.frame_count % 50 == 0){
        //             this.starSpinSmall();
        //         }
        //     }
        // };
        // if (this.cardNum == 0 && this.triSpinNum > 0) {
        //     if (this.frame_count % 10 == 0) {
        //         this.triSpin();
        //         this.triSpinNum--;
        //     };
        // };
        // if (this.cardNum == 0 && this.starSpinNum > 0) {
        //     this.twistSpawner();
        //     this.starSpinNum--;
        // };
    }
    draw() {
        Boss.prototype.draw.apply(this, arguments);
    }
    // 第一种符卡
    starSpin() {
        for (let i = 0; i < 5; i++) {
            const BULLET_TYPE = getBulletType(51 + i * 2);
            let params = {
                x: this.x,
                y: this.y,
                angle: i * 72,
                speed: 0,
                ...BULLET_TYPE,
                moveType: 9,
                index: i,
            };
            this.scene.enemyBulletManager.create(params);
        };
        return this;
    }
    // 第二种符卡
    starSpinBig() {
        for (let i = 0; i < 9; i++) {
            const BULLET_TYPE1 = getBulletType(163)
            let params1 = {
                x: this.x,
                y: this.y,
                angle: i * 40 + this.frame_count,
                speed: 200,
                ...BULLET_TYPE1,
                moveType: 11,
                scale: 2,
            }
            this.scene.enemyBulletManager.create(params1);
            const BULLET_TYPE2 = getBulletType(165)
            let params2 = {
                x: this.x,
                y: this.y,
                angle: i * 40 + this.frame_count + 20,
                speed: 200,
                ...BULLET_TYPE2,
                moveType: 11,
                scale: 2,
            }
            this.scene.enemyBulletManager.create(params2);
        };
        return 0;
    }
    starSpinSmall() {
        for (let i = 0; i < 5; i++) {
            const BULLET_TYPE1 = getBulletType(163)
            let params1 = {
                x: Math.random() * this.scene.width,
                y: 0,
                angle: i * 40,
                speed: 240,
                ...BULLET_TYPE1,
                moveType: 11,
            }
            this.scene.enemyBulletManager.create(params1);
            const BULLET_TYPE2 = getBulletType(167)
            let params2 = {
                x: 0,
                y: Math.random() * this.scene.height,
                angle: i * 40,
                speed: 200,
                ...BULLET_TYPE2,
                moveType: 11,
            }
            this.scene.enemyBulletManager.create(params2);
        };
        return 0;
    }
    triSpin() {
        for (let i = 0; i < 5; i++) {
            let params = {
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
            this.scene.enemyBulletManager.create(params);
        }
    }
    twistSpawner() {
        for (let i = 0; i < 12; i++) {
            let params = {
                x: this.x,
                y: this.y,
                angle: i * 30,
                speed: 0,
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