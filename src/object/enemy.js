import BaseObject from "./object";
import { enemy_type } from "../data/enemy";
class Enemy extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.image = 'enemy';
        this.params = null;
        this.type = null;
        this.speed = 100;
        this.directionX = 0;
        this.directionY = 0;
    }
    init(params) {
        this.bullets = params.bullets || [];
        this.moveType = params.moveType;
        this.indexX = params.indexX;
        this.indexY = params.indexY;
        this.spriteWidth = params.width;
        this.spriteHeight = params.height;
        this.num = params.num;
        // 设置初始位置
        this.x = params.x;
        this.y = params.y;
        // 设置弹幕类型
        this.shotIndex = 0;
        BaseObject.prototype.init.apply(this, arguments);
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments);

        switch (this.moveType) {
            case 1:
                // 直线运动
                this.linearMotion();
                break;
            case 2:
                this.moveLeft();
                break;
            case 3:
                this.moveRight();
                break;
            case 4:
                this.moveLeftBottom();
            case 5:
                if (this.frame_count > 3 * 60) {
                    this.moveLeftBottom();
                } else {
                    this.linearMotion();
                }
                break;
            default:
                break;
        }
        if (this.shotIndex >= this.bullets.length) {
            //
        } else {
            //console.log(this.bullets)
            let shotInfo = this.bullets[this.shotIndex];
            if (shotInfo.count < this.frame_count) {
                this.shot(shotInfo.type);
                this.shotIndex++;
            }
        }
    }
    shot(type) {
        switch (type) {
            case 1:
                // 向正前方发射5颗子弹,发射1次
                this.shotLinearBullet();
                break;
            case 2:
                // 散弹
                this.shotScatteringBullet();
                break;
            case 3:
                // 瞄准玩家的子弹
                this.aimedPlayerBullet();
                break;
            case 4:
                // 环形子弹
                this.shotRingBullet();
                break;
            case 5:
                // 环形曲线子弹
                this.shotRingCurveBullet();
                break;
            default:
                break;
        }
    }
    // 发射散弹
    shotScatteringBullet() {
        let start = 165;
        let step = 30;
        for (let i = 0; i < 6; i++) {
            let parmas = {
                indexX: 4,
                indexY: 2,
                width: 16,
                height: 16,
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 10,
                angle: start - i * step
            };
            this.scene.enemyBulletManager.create(parmas);
        };
    }
    // 环形曲线弹
    shotRingCurveBullet() {
        let start = 0;
        let step = 360 / 6;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 3; j++) {
                let parmas = {
                    indexX: 4,
                    indexY: 2,
                    width: 16,
                    height: 16,
                    x: this.x,
                    y: this.y,
                    moveType: 4,
                    speed: j*10,
                    angle: i*step+j*10,
                };
                this.scene.enemyBulletManager.create(parmas);
            }
        }
    }
    shotRingBullet() {
        let start = 0;
        let step = 360 / 12;
        for (let i = 0; i < 12; i++) {
            let parmas = {
                indexX: 4,
                indexY: 2,
                width: 16,
                height: 16,
                x: this.x,
                y: this.y,
                moveType: 3,
                speed: 10,
                angle: i * step,
            };
            this.scene.enemyBulletManager.create(parmas);
        }
    }
    aimedPlayerBullet() {
        // 瞄准玩家的子弹
        // console.log('瞄准');
        let player = this.scene.player;
        let ax = player.x - this.x;
        let ay = player.y - this.y;
        let angle = this.toAngle(Math.atan2(ay, ax));
        let parmas = {
            indexX: 4,
            indexY: 2,
            width: 16,
            height: 16,
            x: this.x,
            y: this.y,
            moveType: 2,
            speed: 10,
            angle,
        };
        this.scene.enemyBulletManager.create(parmas);
    }
    shotLinearBullet() {
        let parmas = {
            indexX: 4,
            indexY: 2,
            width: 16,
            height: 16,
            x: this.x,
            y: this.y,
            moveType: 1,
            speed: 10,
            angle: 90
        };
        this.scene.enemyBulletManager.create(parmas);
    }
    linearMotion() {
        this.directionY = 1;
        this.y += this.speed * (1 / 60) * this.directionY;
    }
    moveLeft() {
        this.directionX = -1;
        this.x += this.speed * (1 / 60) * this.directionX;
    }
    moveRight() {
        this.directionX = 1;
        this.x += this.speed * (1 / 60) * this.directionX;
    }
    moveLeftBottom() {
        let angle = 90 + 45;
        this.x += this.speed * (1 / 60) * Math.cos(this.toRadian(angle));
        this.y += this.speed * (1 / 60) * Math.sin(this.toRadian(angle));
    }
    moveRightBottom() {
        let angle = 90 + 45;
        this.x += this.speed * (1 / 60) * Math.cos(this.toRadian(angle));
        this.y += this.speed * (1 / 60) * Math.sin(this.toRadian(angle));
    }

    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        if (this.frame_count % 5 == 0) {
            this.indexX += 1;
            if (this.indexX >= this.num) {
                this.indexX = 0;
            };
        };
        BaseObject.prototype.draw.apply(this, arguments);
    }
}

export default Enemy;