import BaseObject from "./object";
import { enemy_type } from "../data/enemy";
import bullet_type from "../data/bullet";
import getBulletType from "../data/bullet";
class Enemy extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.image = 'enemy';
        this.params = null;
        this.type = null;
        this.speed = 100;
        this.moveType = 1; // 移动方式
        this.shotIndex = 0;
        this.score = 100;
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
        this.num = params.num;
        BaseObject.prototype.init.apply(this, arguments);
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments);
        this.move();
    }
    move() {
        let FPS = this.scene.FPS;
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
            default:
                break;
        }
        let radian = this.toRadian(this.angle);
        this.x += this.speed * FPS * Math.cos(radian);
        this.y += this.speed * FPS * Math.sin(radian);
    }
    shotLinearBullet(){
        let angle = this.aimedPlayer();
        for (let i = 0; i < 3; i++) {
            let parmas = {
                x: this.x,
                y: this.y,
                indexX: 3,
                indexY: 4,
                width: 16,
                height: 16,
                angle:angle+i*10,
                speed: 200+i*20,
                moveType: 1,
            };
            this.scene.enemyBulletManager.create(parmas);
        };
    }
    shotRingBullet() {
        for (let i = 0; i < 12; i++) {
            let parmas = {
                x: this.x,
                y: this.y,
                indexX: 4,
                indexY: 4,
                width: 16,
                height: 16,
                angle: i * 36,
                speed: 200,
                moveType: 1,
            };
            this.scene.enemyBulletManager.create(parmas);
        };
    }
    aimedPlayer() {
        let player = this.scene.player;
        let ax = player.x - this.x;
        let ay = player.y - this.y;
        let angle = this.toAngle(Math.atan2(ay, ax));
        return angle;
    }
    actionWayOne() {
        if (this.frame_count < 100) {
            if (this.frame_count % 50 == 0) {
                this.shotLinearBullet();
            };
        };
        if (this.frame_count > 100 && this.frame_count < 200) {
            this.speed += 3;
            this.angle += 1;
            if (this.angle > 90 + 45) {
                this.angle = 90 + 45;
            }
        };
    }
    actionWayTwo() {
        if (this.frame_count < 100) {
            if (this.frame_count % 50 == 0) {
                this.shotRingBullet();
            };
        };
        if (this.frame_count > 100) {
            this.speed += 3;
            this.angle -= 2;
            if (this.angle < 45) {
                this.angle = 90 - 45;
            }
        }
    }
    actionWayThree() {
        if (this.frame_count > 150 + (this.index % 2) * 20) {
            this.speed = 200;

            if (this.angle < 270) {
                this.angle += 2;
            }
            return 0;
        }
        if (this.frame_count > 50 + (this.index % 2) * 20) {
            if(this.frame_count % 20 == 0){
                this.shotRingBullet();
            };
            this.speed = 0;
        };
    }
    actionWayFour() {
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