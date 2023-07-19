import BaseObject from "./object";
import boss_params from "../data/boss";
import Bullet from "./bullet";
class Boss extends BaseObject{
    constructor(id,scene){
        super(id,scene);
        this.params = null;
        this.type = null;
        this.speed = 100;
        this.state = 0;
    }
    init(params){
      
        this.image = params.image;
        this.params = params;
        this.indexX = 0;
        this.indexY = 0;
        this.spriteWidth = params.width;
        this.spriteHeight = params.height;
        this.x = 640/2 - (this.spriteWidth/2);
        this.y = 0;
        BaseObject.prototype.init.apply(this, arguments);
    }
    update(){
        BaseObject.prototype.update.apply(this, arguments);
    }
    draw(){
        // if(this.frame_count % 10 == 0){
        //     this.indexY += 1;
        //     if(this.indexY > 2){
        //         this.indexY = 0;
        //     };
        // };
        BaseObject.prototype.draw.apply(this, arguments);
    }
    shot(){
        let bullet = new Bullet();
        this.scene.bullets.push(bullet);
    }
    stageOne(){
        // 射普通子弹  
    }
    stageTwo(){
        // 射符卡1
    }
    stageTwo(){
        // 射符卡2
    }
    stageThree(){
        // 射符卡3
    }
}
export default Boss;