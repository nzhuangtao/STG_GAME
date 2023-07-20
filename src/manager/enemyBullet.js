
import EnemyBullet from "../object/enemyBullet";
import BaseManager from "./base";

class EnemyBulletManager extends BaseManager {
    constructor(scene) {
        super(scene)
        this.bulletIndex = 0;  
    }
    create(params) {
        let bullet = new EnemyBullet(this.bulletIndex, this.scene);
        bullet.init({
            turn_angle:params.turn_angle||0,
            indexX:params.indexX,
            indexY:params.indexY,
            width:params.width,
            height:params.height,
            x:params.x,
            y:params.y,
            moveType:params.moveType,
            speed:params.speed,
            angle:params.angle,
            image:params.image||'bullet',
        });
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
        this.objects.forEach((bullet) => {
            // this.scene.enemyManager.objects.forEach((enemy) => {
            //     if(bullet.checkCollision(enemy)){
            //         // 删除子弹
            //         bullet.remove();
            //         this.objects.delete(bullet.id);
            //         // 删除敌人
            //         enemy.remove();
            //         this.scene.enemyManager.objects.delete(enemy.id);
            //     };
            // });
        });
    }

}
export default EnemyBulletManager;