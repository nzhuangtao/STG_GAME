
import EnemyBullet from "../object/enemyBullet";
import BaseManager from "./base";

class EnemyBulletManager extends BaseManager {
    constructor(scene) {
        super(scene)
        this.bulletIndex = 0;
        this.player = this.scene.player;
    }
    create(params) {
        let bullet = new EnemyBullet(this.bulletIndex, this.scene);
        bullet.init(params);
        this.objects.set(this.bulletIndex, bullet);
        this.bulletIndex++;
    }
    update() {
        this.objects.forEach((bullet) => {
            if (bullet.outOfStage()) {
                this.objects.delete(bullet.id);
            };
            bullet.update();
        });
    }
    draw() {
        this.objects.forEach((bullet) => {
            bullet.draw();
        });
    }
    checkCollisonWithPlayer() {
        if (this.objects.size <= 0)
            return 0;
        if (this.player.state == this.player.DIE_STATE)
            return 0;
        this.objects.forEach((bullet) => {

            if (bullet.checkCollision(this.player)) {
                // 主角死亡
                this.player.die();
                // 删除子弹
                bullet.remove();
            };
        });
    }
}
export default EnemyBulletManager;