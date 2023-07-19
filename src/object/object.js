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

        this.scene.stage.addChild(this.sprite);
    }
    update() {
        this.frame_count++;
        if(this.frame_count>3*60*60){
            this.frame_count = 0;
        };
    }
    draw() {
        let rectangle = new PIXI.Rectangle(this.indexX * this.spriteWidth, this.indexY * this.spriteHeight, this.spriteWidth, this.spriteHeight);
        this.texture.frame = rectangle;
        this.sprite.sprite = this.texture;
    }
}
export default BaseObject;