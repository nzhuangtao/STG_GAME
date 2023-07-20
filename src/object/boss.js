import BaseObject from "./object";
import EnemyBullet from "./enemyBullet";
import bullet_type from "../data/bullet";
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
        this.spawner = 1;
        this.orb = 1;
        BaseObject.prototype.init.apply(this, arguments);
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments);
        if (this.state == this.STATE_START) {
            // 入场动画
            this.y += this.speed * (1 / 60);
            if (this.y >= this.spriteHeight) {
                this.y = this.spriteHeight;
                this.state = this.STATE_ATTACK;
            };
        };
        if (this.frame_count % 10 == 0 && this.state == this.STATE_ATTACK) {
            // this.shotLeftLeaf();
            this.shotSpirals();
        }
        // if (this.frame_count >= 200 && this.leafNum <= 2) {
        //     this.shotRightLeaf();
        //     this.leafNum++;
        // }
        // if (this.leafNum >= 2 && this.orb <= 8) {
        //     if (this.frame_count % 50 == 0 && this.frame_count >= 300) {
        //         this.tripleorbs();
        //         this.orb++;
        //     }
        // }
        // if (this.orb > 8) {
        //     this.leafNum = 0;
        //     this.orb = 0;
        //     this.frame_count = 0;
        // };
    }
    shot() {

    }
    shotLeftLeaf() {
        for (let i = 0; i < 5; i++) {
            for (var j = 0; j < 12; j++) {
                let params = {
                    x: this.x,
                    y: this.y,
                    moveType: 5,
                    speed: ((5 - i) * 30) + 10,
                    angle: (120 + j * 10),
                    indexX: 0,
                    indexY: 0,
                    width: 32,
                    height: 32,
                    delay: 200,
                    image: 'leaf_yellow'
                }
                this.scene.enemyBulletManager.create(params);
            }
        }
    }
    shotRightLeaf() {
        for (let i = 0; i < 5; i++) {
            for (var j = 0; j < 12; j++) {
                let params = {
                    x: this.x,
                    y: this.y,
                    moveType: 5,
                    speed: i * 30 + 50,
                    angle: 180 - (120 + j * 10),
                    indexX: 0,
                    indexY: 0,
                    width: 32,
                    height: 32,
                    image: 'leaf_blue'
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
                    speed: i * 10 + 100,
                    angle: angle + j * 10,
                    indexX: 2,
                    indexY: 2,
                    width: 16,
                    height: 16,
                };
                this.scene.enemyBulletManager.create(params);
            }
        }
    }
    leafTwoDelay() {
        for (let i = 0; i < 4; i++) {
            let params1 = {
                x: this.x,
                y: this.y,
                moveType: 6,
                speed: 100,
                angle: this.frame_count + i * 90,
                indexX: 0,
                indexY: 0,
                width: 32,
                height: 32,
                image: "leaf_yellow",
                turn_angle: 270
            };
            this.scene.enemyBulletManager.create(params1);
            let params2 = {
                x: this.x,
                y: this.y,
                moveType: 6,
                speed: 100,
                angle: i * 90 - this.frame_count,
                indexX: 0,
                indexY: 0,
                width: 32,
                height: 32,
                turn_angle: 90,
                image: "leaf_yellow"
            };
            this.scene.enemyBulletManager.create(params2);
        }
    }
    shotCircle() {
        for (var i = 0; i < 30; i++) {
            let params1 = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 120,
                angle: i * 12,
                indexX: 3,
                indexY: 3,
                width: 16,
                height: 16,
            };
            this.scene.enemyBulletManager.create(params1);
            let params2 = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 100,
                angle: i * 12,
                indexX: 3,
                indexY: 3,
                width: 16,
                height: 16,
            };
            this.scene.enemyBulletManager.create(params2);
        }
    }
    shotSpawner() {
        let params1 = {
            x: this.x,
            y: this.y,
            moveType: 7,
            speed: 100,
            angle: 45,
            indexX: 0,
            indexY: 0,
            width: 32,
            height: 32,
            image: "orb_white",
        };
        this.scene.enemyBulletManager.create(params1);
        let params2 = {
            x: this.x,
            y: this.y,
            moveType: 7,
            speed: 100,
            angle: 135,
            indexX: 0,
            indexY: 0,
            width: 32,
            height: 32,
            image: "orb_white",
        };
        this.scene.enemyBulletManager.create(params2);
    }
    shotSpirals() {
        for (var i = 0; i < 5; i++) {
            let params1 = {
                x: this.x,
                y: this.y,
                moveType: 8,
                speed: 100,
                angle: i * 72 + this.frame_count,
                indexX: 3,
                indexY: 4,
                width: 16,
                height: 16,
               
            };
            this.scene.enemyBulletManager.create(params1);
            // let params2 = {
            //     x: this.x,
            //     y: this.y,
            //     moveType: 2,
            //     speed: 100,
            //     angle: i * 72 - this.frame_count,
            //     indexX: 5,
            //     indexY: 4,
            //     width: 16,
            //     height: 16,
            // };
            // this.scene.enemyBulletManager.create(params2);
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