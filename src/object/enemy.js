import BaseObject from "./object";
import { enemy_type } from "../data/enemy";
import bullet_type from "../data/bullet";
class Enemy extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.image = 'enemy';
        this.params = null;
        this.type = null;
        this.speed = 100;
        this.moveType = 1; // 移动方式
        this.shotIndex = 0;
    }
    init(params) {
        this.params = params;
        this.index = params.index;
        this.speed = params.speed || 100;
        this.bullets = params.bullets || [];
        this.moveType = params.moveType;
        this.indexX = params.indexX;
        this.indexY = params.indexY;
        this.spriteWidth = params.width;
        this.spriteHeight = params.height;
        this.x = params.x;
        this.y = params.y;
        this.angle = params.angle;
        this.num = params.num; // 精灵图数目
        BaseObject.prototype.init.apply(this, arguments);
    }
    update() {
        let FPS = this.scene.FPS;
        BaseObject.prototype.update.apply(this, arguments);
        switch (this.moveType) {
            case 1:
                this.actionWayOne();
                break;
            case 2:
                this.actionWayTwo();
                break;
            case 3:
                this.actionWayThree();
                break;
            case 4:
                this.actionWayFour();
                break;
            case 5:
                this.actionWayFive();
                break;
            case 6:
                this.actionWaySix();
                break;
            default:
                break;
        }
        let radian = this.toRadian(this.angle);
        this.x += this.speed * FPS * Math.cos(radian);
        this.y += this.speed * FPS * Math.sin(radian);

        // for (let i = 0; i < this.bullets.length; i++) {
        //     let bulletInfo = this.bullets[i];
        //     if (this.frame_count >= bulletInfo.count) {
        //         this.shot(bulletInfo);
        //     }
        // }
    }
    shot(bulletInfo) {

        if (bulletInfo.num <= 0)
            return 0;
        if (this.frame_count % bulletInfo.step != 0)
            return 0;
        switch (bulletInfo.moveType) {
            case 1:
                this.shotLinearBullet(bulletInfo);
                break;
            case 2:
                this.shotScatteringBullet(bulletInfo);
                break;
            case 3:
                this.shotRingBullet(bulletInfo);
            default:
                break;
        }
    }
    shotScatteringBullet(shotInfo) {
        for (let i = 0; i < 6; i++) {
            let parmas = {
                x: this.x,
                y: this.y,
                indexX: 4,
                indexY: 4,
                width: 16,
                height: 16,
                angle:165-(i+2)*15,
            };
            parmas = Object.assign(shotInfo, parmas);
            this.scene.enemyBulletManager.create(parmas);
        };
    }
    // 曲线弹
    shotCurveBullet() {
        let step = 360 / 6;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 3; j++) {
                let parmas = {
                    x: this.x,
                    y: this.y,
                    moveType: 4,
                    speed: j * 10,
                    angle: i * step + j * 10,
                };
                parmas = Object.assign(parmas, bulletType);
                this.scene.enemyBulletManager.create(parmas);
            }
        }
    }
    shotRingBullet(shotInfo) {
        let step = 360 / 12;
        for (let i = 0; i < 12; i++) {
            let parmas = {
                x: this.x,
                y: this.y,
                speed: 200 + i * 10,
                angle: i * step,
                indexX: 6,
                indexY: 4,
                width: 16,
                height: 16,
                moveType:3,
            };  
            this.scene.enemyBulletManager.create(parmas);
        }
    }
    aimedPlayerBullet(bulletType, num) {

        for (let i = 0; i < num; i++) {
            let player = this.scene.player;
            let ax = player.x - this.x;
            let ay = player.y - this.y;
            let angle = this.toAngle(Math.atan2(ay, ax));
            let parmas = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 100,
                angle,
            };
            parmas = Object.assign(parmas, bulletType);
            this.scene.enemyBulletManager.create(parmas);
        }
    }
    shotLinearBullet(shotInfo) {
        // let bulletType = bullet_type[shotInfo.type];
        let parmas = {
            x: this.x,
            y: this.y,
            indexX: 3,
            indexY: 3,
            width: 16,
            height: 16,
        };
        parmas = Object.assign(parmas, shotInfo);
        this.scene.enemyBulletManager.create(parmas);
    }
    linearMotion() {
        this.y += this.speed * (1 / 60) * Math.sin();
    }
    moveLeft() {
        this.angle = 90;
    }
    moveTop() {
        this.angle = 90 + 180;
    }
    moveBottom() {
        this.angle = 90;
    }
    moveRight() {
        this.angle = 90;
    }
    moveLeftBottom() {
        this.angle = 90 - 45;
    }
    moveRightBottom() {
        this.angle = 90 + 45;
    }
    actionWayOne() {
        if (this.frame_count < 100) {
            // 发射弹幕
        }
        else if (this.frame_count < 200) {
            this.speed -= 1;
        }
        else {
            this.speed += 1;
            this.moveTop();
        };
    }
    actionWayTwo() {
        if (this.frame_count % 120 == 0) {
            this.angle += 180;
            this.frame_count = 0;
        };
        if (this.frame_count % 10 == 0) {
            // this.shot();
        }
    }
    actionWayThree() {
        if (this.frame_count > 100) {
            this.speed += 3;
            this.angle += 2;
            if (this.angle > 90 + 45) {
                this.angle = 90 + 45;
            }
        };
    }
    actionWayFour() {
        if (this.frame_count > 100) {
            this.speed += 3;
            this.angle -= 2;
            if (this.angle < 45) {
                this.angle = 90 - 45;
            }
        }
    }
    actionWayFive() {
        if (this.frame_count > 150 + (this.index % 2) * 20) {
            this.speed = 200;

            if (this.angle < 270) {
                this.angle += 2;
            }
            return 0;
        }
        if (this.frame_count > 50 + (this.index % 2) * 20) {
            this.speed = 0;
        };
    }
    actionWaySix() {
        if (this.frame_count < 30) {
            return 0;
        };
        if (this.angle >= -45) {
            this.angle -= 1;
        };
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
    remove() {
        this.scene.playerLayer.removeChild(this.sprite);
        this.scene.enemyManager.objects.delete(this.id);
        delete this;
    }
}

export default Enemy;