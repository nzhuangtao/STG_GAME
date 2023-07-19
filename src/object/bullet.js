import BaseObject from "./object";

class Bullet extends BaseObject{
    constructor(id,scene){
        super(id,scene);
    }
    init(params){
        this.x = params.x;
        this.y = params.y; 

        this.bulletType = params.type;
        this.image = 'bullet';
        this.indexX = 0;
        this.indexY = 0;
        this.spriteWidth = params.width;
        this.spriteHeight = params.height;
    }
}
export default Bullet;