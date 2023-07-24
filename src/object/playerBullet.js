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
        this.indexX = 3;
        this.indexY = 7;

        this.spriteWidth = 16;
        this.spriteHeight = 16;

        BaseObject.prototype.init.apply(this, arguments);
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments);
        this.y -= this.speed;
        if(this.outOfStage()){
            this.remove();
        };
    }
    remove(){
        this.scene.playerLayer.removeChild(this.sprite);
        this.scene.playerBulletManager.objects.delete(this.id);
        delete this;
    }
    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
}
export default PlayerBullet;