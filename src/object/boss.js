import BaseObject from "./object";
import Bullet from "./bullet";
class Boss extends BaseObject{
    constructor(id,scene){
        super(id,scene);
        this.state = 0;
        this.hp = 100;
    }
    init(){
        this.image = 'mokou';
        this.indexX = 0;
        this.indexY = 0;
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.x = 640/2;
        this.y = 0+this.spriteHeight/2;
      
        BaseObject.prototype.init.apply(this, arguments);
    }
    update(){
        BaseObject.prototype.update.apply(this, arguments);
    }
    draw(){
        //BaseObject.prototype.draw.apply(this, arguments);
    }
    drawHp(){
        
    }
    shot(){
        let bullet = new Bullet();
        this.scene.bullets.push(bullet);
    }
    handleCollision(){
        
    }
}
export default Boss;