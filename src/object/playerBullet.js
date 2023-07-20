import BaseObject from "./object";

class PlayerBullet extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.speed = 10;
    }
    init() {
        this.x = this.scene.player.x;
        this.y = this.scene.player.y;
        this.image = 'bullet';
        this.indexX = 2;
        this.indexY = 3;
        this.spriteWidth = 16;
        this.spriteHeight = 16;
        BaseObject.prototype.init.apply(this, arguments);
    }
    runWay() {
        this.y -= this.speed;
    }
    update() {
        this.runWay()
    }
    removeOutOfStage(){
        if (this.y < 0) {
            this.remove();
        };
    }
    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        BaseObject.prototype.draw.apply(this, arguments);
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