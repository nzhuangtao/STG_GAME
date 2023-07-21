import * as PIXI from 'pixi.js';
import { getImageByName } from '../imageLoader';
class BaseObject {
    FPS = 1 / 60;
    side = 200;
    constructor(id, scene) {
        this.id = id;
        this.scene = scene;
        this.game = scene.game;
        this.frame_count = 0;
        this.x = 0;
        this.y = 0;
        this.image = '';
        this.texture = null;
        this.indexX = 0;
        this.indexY = 0;
        this.spriteWidth = 0;
        this.spriteHeight = 0;
        this.sprite = null;
        this.angle = 0;
        this.speed = 0;
    }
    init() {
        let texture = getImageByName(this.image);
        this.texture = new PIXI.Texture(texture);
        let rectangle = new PIXI.Rectangle(this.indexX * this.spriteWidth, this.indexY * this.spriteHeight, this.spriteWidth, this.spriteHeight);
        this.texture.frame = rectangle;
        this.sprite = new PIXI.Sprite(this.texture);

        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.anchor.set(0.5);
        this.scene.playerLayer.addChild(this.sprite);
    }
    update() {
        this.frame_count++;
    }
    draw() {
        // 重新绘制精灵
        let rectangle = new PIXI.Rectangle(this.indexX * this.spriteWidth, this.indexY * this.spriteHeight, this.spriteWidth, this.spriteHeight);
        this.texture.frame = rectangle;
        this.sprite.sprite = this.texture;
    }
    outOfStage() {
        let left = 0 - this.side;
        let right = this.scene.width + this.side;
        let top = 0 - this.side;
        let bottom = this.scene.height + this.side;
        if (this.y > bottom || 
            this.y < top || 
            this.x > right || 
            this.x < left) {
            return true;
        } else {
            return false;
        };
    }
    remove() {
        console.error("请重写此函数");
    }
    checkCollision(obj) {
        let spriteLeft = this.x - this.spriteWidth / 2,
            spriteRight = this.x + this.spriteWidth / 2,
            spriteTop = this.y - this.spriteHeight / 2,
            spriteBottom = this.y + this.spriteHeight / 2;

        let objLeft = obj.x - this.spriteWidth / 2,
            objRight = obj.x + obj.spriteWidth / 2,
            objTop = obj.y - this.spriteHeight / 2,
            objBottom = obj.y + this.spriteHeight / 2;
        if (this.x > objLeft && this.x < objRight && this.y < objBottom && this.y > objTop) {
            return true;
        };
        if (spriteLeft > objLeft && spriteLeft < objRight && spriteTop < objBottom && spriteTop > objTop) {
            return true;
        };
        if (spriteLeft > objLeft && spriteLeft < objRight && spriteBottom < objBottom && spriteBottom > objTop) {
            return true;
        };
        if (spriteRight > objLeft && spriteRight < objRight && spriteTop < objBottom && spriteTop > objTop) {
            return true;
        };
        if (spriteRight > objLeft && spriteRight < objRight && spriteBottom < objBottom && spriteBottom > objTop) {
            return true;
        };
        return false;
    }
    toRadian(angle) {
        return angle / 180 * Math.PI;
    }
    toAngle(radian) {
        return (radian * 180 / Math.PI) | 0;
    }
}
export default BaseObject;