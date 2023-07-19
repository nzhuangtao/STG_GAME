import BaseObject from "./object";
import { enemy_type } from "../data/enemy";
class Enemy extends BaseObject{
    constructor(id,scene){
        super(id,scene);
        this.image = 'enemy';
        this.params = null;
        this.type = null;
        this.speed = 100;
    }
    init(params){
        this.params = params;
        this.x = params.x;
        this.y = params.y;
        let type = params.type;
        this.type = enemy_type[type];
        this.indexX = this.type.indexX;
        this.indexY = this.type.indexY;
        this.directionX = params.directionX;
        this.directionY = params.directionY;
        this.runType = params.runType;
        BaseObject.prototype.init.apply(this, arguments);
        this.spriteWidth = enemy_type[type].width;
        this.spriteHeight = enemy_type[type].height;
    }
    update(){
        BaseObject.prototype.update.apply(this, arguments);
        // 直线运动
        switch (this.runType) {
            case 1:
                this.run1();
                break;
            case 2:
                this.run2();
                break;
            default:
                break;
        }
    }
    draw(){
        if(this.frame_count % 5 == 0){
            this.indexX += 1;
            if(this.indexX > this.type.num -1){
                this.indexX = 0;
            };
        };
        BaseObject.prototype.draw.apply(this, arguments);
    }
    run1(){
        this.sprite.x += this.speed * (1/60);
        this.sprite.y += this.speed * (1/60);
    }
    run2(){
        this.sprite.y += this.speed * (1/60);
        if(this.frame_count > 3* 60){
            this.sprite.x += this.speed * (1/60);
            this.sprite.y += this.speed * (1/60);
        }
    }
}

export default Enemy;