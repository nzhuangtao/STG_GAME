import BaseObject from "./object";
import * as PIXI from 'pixi.js';
class Player extends BaseObject{
    constructor(id,scene){
        super(id,scene);
        this.hp = 5;
        this.indexX = 0;
        this.indexY = 0;
        this.spriteWidth = 32;
        this.spriteHeight = 48;
        this.image = 'player';
    }
    init(){
        BaseObject.prototype.init.apply(this, arguments);
    }
    update(){
        BaseObject.prototype.update.apply(this, arguments);
        if(this.game.input.iskeyDown(this.game.input.BUTTON_Z)){
            console.log("发射子弹");
        };
    }
    draw(){
        if(this.frame_count % 5 == 0){
            this.indexX += 1;
            if(this.indexX > 7){
                this.indexX = 0;
            };
        };
        BaseObject.prototype.draw.apply(this, arguments);
    }
}
export default Player;