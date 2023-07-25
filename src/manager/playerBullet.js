
import PlayerBullet from "../object/playerBullet";
import BaseManager from "./base";
class PlayerBulletManager extends BaseManager {
    constructor(scene) {
        super(scene)
        this.bulletIndex = 0;
    }
    create() {
        let bullet = new PlayerBullet(this.bulletIndex, this.scene);
        bullet.init();
        this.objects.set(this.bulletIndex, bullet);
        this.bulletIndex++;
    }
    update() {
        this.objects.forEach((bullet) => {
            if (bullet.outOfStage()) {
                bullet.remove();
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
    checkCollisonWithEnemy() {
        if (this.scene.enemyManager.getSize() <= 0)
            return 0;
        this.objects.forEach((bullet) => {
            this.scene.enemyManager.objects.forEach((enemy) => {
                if (bullet.checkCollision(enemy)) {
                    // 删除子弹
                    bullet.remove();
                    this.objects.delete(bullet.id);
                    // 击毁效果
                    let effect = this.scene.effectManager.create();
                    effect.initEnemyDestory(
                        {
                            x: enemy.x,
                            y: enemy.y,
                        }
                    );
                    this.scene.addScore(enemy.score);
                    // 删除敌人
                    enemy.remove();
                    this.scene.enemyManager.objects.delete(enemy.id);
                };
            });
        });
    }
}
export default PlayerBulletManager;