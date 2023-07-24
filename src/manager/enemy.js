import Enemy from "../object/enemy";
import BaseManager from "./base";
import getEnemyType from "../data/enemy";
class EnemyManager extends BaseManager {
    constructor(scene) {
        super(scene)
        this.enemyIndex = 0;
    }
    create(params) {

        let enemy = new Enemy(this.enemyIndex, this.scene);
        let enemyType = getEnemyType(params.type);

        enemy.init({
            ...params,
            ...enemyType,
        });
        this.objects.set(this.enemyIndex, enemy);
        this.enemyIndex++;
    }
    update() {
        this.objects.forEach((enemy) => {
            if (enemy.outOfStage()) {
                this.objects.delete(enemy.id);
            };
        });

        this.objects.forEach((enemy) => {
            enemy.update();
        });
    }
    draw() {
        this.objects.forEach((enemy) => {
            enemy.draw();
        });
    }
    getSize() {
        return this.objects.size;
    }
}
export default EnemyManager;