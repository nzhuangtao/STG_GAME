import BaseObject from "./object";
class PlayerBullet extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.speed = 200;
        this.direction = -1;
    }
    init(params) {
        this.image = 'bullet';
        this.x = params.x;
        this.y = params.y;
        this.indexX = params.indexX||0;
        this.indexY = params.indexY||0;
        this.spriteWidth = params.width;
        this.spriteHeight = params.height;
        BaseObject.prototype.init.apply(this, arguments);
    }
    update() {
        this.y += (this.speed * this.direction)*(1/30);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    removeOutOfStage(){
        if (this.y < 0) {
            this.remove();
        };
    }
    draw() {
        // BaseObject.prototype.draw.apply(this, arguments);
    }
    remove(){
        let index = this.scene.bullets.findIndex((b) => {
            return b.id == this.id;
        });
        this.scene.game.stage.removeChild(this.sprite);
        this.scene.bullets.splice(index, 1);
        delete this;
    }
    handleCollision(obj){
        if(this.checkCollision(obj)){
            this.remove();
            obj.handleCollision();
        };
    }
}
export default PlayerBullet;