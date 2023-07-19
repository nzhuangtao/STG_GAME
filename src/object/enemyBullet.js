import BaseObject from "./object";

class EnemyBullet extends BaseObject{
    constructor(id,scene){
        super(id, scene);
        this.speed = 0;
        this.direction = 0;
    }
    init(params){
        this.params = params;
        this.direction = params.direction || 0;
        this.speed = params.speed || 100;
        this.x = params.x;
        this.y = params.y;
        this.image = 'bullet';
        this.indexX = params.indexX||0;
        this.indexY = params.indexY||0;
        this.spriteWidth = params.width;
        this.spriteHeight = params.height;

        BaseObject.prototype.init.apply(this, arguments);
    }
    draw(){
        //BaseObject.prototype.draw.apply(this, arguments);
    }
}
export default EnemyBullet;