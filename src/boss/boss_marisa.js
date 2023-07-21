import Boss from "../object/boss";
import boss_params from "../data/boss";
class Marisa extends Boss {
    constructor(id, scene) {
        super(id, scene);
        this.image = 'marisa';
        this.bossParams = boss_params[id];
    }
    init() {
        this.indexX = 0;
        this.indexY = 0 - this.spriteHeight / 2;
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.x = this.scene.width / 2;
        this.y = 0;
        this.speed = 150;
        this.mode = 0;
        this.startTalk = this.bossParams.startTalk;
        this.endTalk = this.bossParams.endTalk;
        Boss.prototype.init.apply(this, arguments);
        this.sprite.anchor.set(0.5);
    }
    update() {
        Boss.prototype.update.apply(this, arguments);
        if (this.state != this.STATE_ATIVE)
            return 0;

        if (this.mode == 0 && this.frame_count % 100 == 0) {
            this.starSpin();
            this.mode = 1;
        }
    }
    draw() {
        Boss.prototype.draw.apply(this, arguments);
    }
    starSpin() {
        for (let i = 0; i < 5; i++) {
            let params = {
                x: this.x + Math.cos(this.toRadian(i * 72))*100,
                y: this.y + Math.sin(this.toRadian(i * 72))*100,
                angle: i * 72,
                speed: 100,
                indexX: 2 + i,
                indexY: 10,
                width: 16,
                height: 16,
                moveType: 9,
                index:i,
            }
            this.scene.enemyBulletManager.create(params);
        }
    }
}
export default Marisa;