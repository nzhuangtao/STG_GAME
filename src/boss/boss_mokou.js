import Boss from "../object/boss";
import BOSS_CONFIG from "../config/boss";
class Mokou extends Boss {
    MODE_NORMAL = 'normal';
    MODE_LEFT = 'left';
    MODE_RIGHT = 'right';
    MODE_ATTACK = 'attack';
    constructor(id, scene) {
        super(id, scene);
        this.image = '';
        this.imageStand = '';
        this.config = null;
        this.mode = 0;
        this.spriteNum = 0;
    }
    init() {
        this.config = BOSS_CONFIG[this.id];
        this.changeMode(this.MODE_NORMAL)
        this.image = this.config.image;
        this.imageStand = this.config.imageStand;

        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.x = this.scene.width / 2;
        this.y = this.spriteHeight;
        this.speed = 200;
        Boss.prototype.init.apply(this, arguments);
    }
    changeMode(modeName, num = 1) {
        this.mode = modeName;
        let info = this.config[modeName];
        if (this.mode == this.MODE_ATTACK) {
            let attack = info[num];
            this.spriteWidth = attack.width;
            this.spriteHeight = attack.height;
            this.indexX = attack.indexX;
            this.indexY = attack.indexY;
            this.spriteNum = attack.num;
        } else {
            this.spriteWidth = info.width;
            this.spriteHeight = info.height;
            this.indexX = info.indexX;
            this.indexY = info.indexY;
            this.spriteNum = info.num;
        }
    }
    update() {
        if (!this.isExist)
            return 0;
        Boss.prototype.update.apply(this, arguments);
        if (this.state != this.STATE_ATIVE)
            return 0;
    }
    draw() {
        if (!this.isExist)
            return 0;

        if (this.mode == this.MODE_NORMAL) {
            if (this.frame_count % 5 == 0) {
                this.indexY += 1;
                if (this.indexY > this.spriteNum - 1) {
                    this.indexY = 0;
                };
            };
        } else if (this.mode == this.MODE_ATTACK) {
            if (this.frame_count % 16 == 0) {
                if (this.indexY > this.spriteNum - 2) {
                    return 0;
                }
                this.indexY += 1;
            }
        }
        Boss.prototype.draw.apply(this, arguments);
    }
}
export default Mokou;