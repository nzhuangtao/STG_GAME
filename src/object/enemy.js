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
                if(this.frame_count>3*60){
                    this.moveLeftBottom();
                } else {
                    this.linearMotion();
                }
                break;
            default:
                break;
        }
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
        let angle = 90+45;
        this.x += this.speed * (1 / 60) * Math.cos(this.toRadian(angle));
        this.y += this.speed * (1 / 60) * Math.sin(this.toRadian(angle));
    }
    moveRightBottom() {
        let angle = 90+45;
        this.x += this.speed * (1 / 60) * Math.cos(this.toRadian(angle));
        this.y += this.speed * (1 / 60) * Math.sin(this.toRadian(angle));
    }
    toRadian(angle) {
        return angle / 180 * Math.PI;
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