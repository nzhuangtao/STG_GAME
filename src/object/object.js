import * as PIXI from 'pixi.js';
import { getImageByName } from '../imageLoader';
class BaseObject {
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
    }
    init() {
        this.texture = getImageByName(this.image);

        let rectangle = new PIXI.Rectangle(this.indexX * this.spriteWidth, this.indexY * this.spriteHeight, this.spriteWidth, this.spriteHeight);
        this.texture.frame = rectangle;
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.anchor.set(0.5);
        this.scene.stage.addChild(this.sprite);
    }
    update() {
        this.frame_count++;
    }
    draw() {
        // let rectangle = new PIXI.Rectangle(this.indexX * this.spriteWidth, this.indexY * this.spriteHeight, this.spriteWidth, this.spriteHeight);
        // this.texture.frame = rectangle;
        // this.sprite.sprite = this.texture;
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
        if (this.x>objLeft && this.x<objRight && this.y<objBottom && this.y>objTop){
            return true;
        };
        if (spriteLeft>objLeft && spriteLeft<objRight && spriteTop<objBottom && spriteTop>objTop){
            return true;
        };
        if (spriteLeft>objLeft && spriteLeft<objRight && spriteBottom<objBottom && spriteBottom>objTop){
            return true;
        };
        if (spriteRight>objLeft && spriteRight<objRight && spriteTop<objBottom && spriteTop>objTop){
            return true;
        };
        if (spriteRight>objLeft && spriteRight<objRight && spriteBottom<objBottom && spriteBottom>objTop){
            return true;
        };
            return false;
    }
    handleCollision(obj){
        
    }
}
export default BaseObject;