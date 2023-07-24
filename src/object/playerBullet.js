import getBulletType from "../data/bullet";
import BaseObject from "./object";
class PlayerBullet extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.speed = 10;
    }
    init() {
        let playerBulletIndex = this.scene.player.bullet;
        let bulletType = getBulletType(playerBulletIndex);
        this.x = this.scene.player.x;
        this.y = this.scene.player.y;
        this.image = 'bullet';
        this.indexX = bulletType.indexX;
        this.indexY = bulletType.indexY;

        this.spriteWidth = bulletType.width;
        this.spriteHeight = bulletType.height;

        BaseObject.prototype.init.apply(this, arguments);
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments);
        this.y -= this.speed;
        if (this.outOfStage()) {
            this.remove();
        };
    }
    remove() {
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