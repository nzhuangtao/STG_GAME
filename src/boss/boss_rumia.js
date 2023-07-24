import Boss from "../object/boss";
import BOSS_CONFIG from "../config/boss";
import TALK_CONFIG from "../config/talk";
import getBulletType, { getBeam } from "../data/bullet";

class Rumia extends Boss {
    MODE_NORMAL = 'normal';
    MODE_LEFT = 'left';
    MODE_RIGHT = 'right';
    MODE_ATTACK = 'attack';

    STAET_ATTACK1 = 'attack1';
    STATE_ATTACK2 = 'attack2';
    STATE_ATTACK3 = 'attack3';
    STATE_ATTACK4 = 'attack4';

    constructor(id, scene) {
        super(id, scene);
        this.config = null;
        this.image = 'rumia';
        this.imageStand = 'rumia_stand';
        this.config = null;
        this.mode = this.MODE_NORMAL;
        this.spriteNum = 0;
        this.beamNum = 1;
        this.nightWarblerType = 0;
    }
    init() {
        this.config = BOSS_CONFIG[this.id];
        let talkConfig = TALK_CONFIG[this.scene.playerIndex];
        this.startTalk = talkConfig.startTalk;
        this.endTalk = talkConfig.endTalk;
        this.talkList = this.startTalk;
        this.spriteWidth = 128;
        this.spriteHeight = 128;

        this.changeMode(this.MODE_NORMAL);

        this.cardIndex = -1;
        this.cardList = this.config.cards;
        this.hpNum = this.cardList.length;

        Boss.prototype.init.apply(this, arguments);
    }
    changeMode(modeName, num = 1) {
        if (this.mode == modeName)
            return 0;
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
        Boss.prototype.update.apply(this, arguments);

        if (this.state == this.STATE_ATIVE) {
            if (this.cardIndex == -1) {
                this.state = this.STAET_ATTACK1;
                this.changeMode(this.MODE_ATTACK, 1);
            } else if (this.cardIndex == 0) {
                this.changeMode(this.MODE_ATTACK, 2);
                this.state = this.STATE_ATTACK2;
            } else if (this.cardIndex == 1) {
                this.state = this.STATE_ATTACK3;
            } else if (this.cardIndex == 2) {
                this.state = this.STATE_ATTACK4;
            }
        };

        if (this.state == this.STAET_ATTACK1) {

            if (this.frame_count < 200 && this.frame_count % 20 == 0) {
                this.moonSpell();
            } else if (this.frame_count < 300) {
                this.state = this.STATE_ATTACK2;
            };
        };
        if (this.state == this.STATE_ATTACK2) {
            if (this.frame_count % 20 == 0) {
                this.nightWarbler();
            }
        };
        if (this.state == this.STATE_ATTACK3) {
            if (this.frame_count % 10 == 0) {
                this.tripleorbs();
            }
        }
        if (this.state == this.STATE_ATTACK4) {
            if (this.frame_count % 10 == 0) {
                this.tripleorbs();
            }
        }
    }
    beam() {

    }
    // 月符
    moonLightSpell() {
        let bulletType = getBulletType(38);
        for (let i = 0; i < 12; i++) {
            let params = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 240,
                angle: i * 36 + 12,
                ...bulletType,
            };
            this.scene.enemyBulletManager.create(params);
        }
    }
    nightWarbler() {
        let bulletType = {};
        let start = 0;
        let step = 9;
        if (this.nightWarblerType == 0) {
            bulletType = getBulletType(38)
            start = 180;
            step = -9
            this.nightWarblerType = 1;
        } else {
            bulletType = getBulletType(39)
            start = 0;
            step = 9;
            this.nightWarblerType = 0
        };
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 12; i++) {
                let params = {
                    x: this.x,
                    y: this.y,
                    moveType: 2,
                    speed: 240 + j * 20,
                    angle: start + step * i,
                    ...bulletType,
                };
                this.scene.enemyBulletManager.create(params);
            }
        }
    }
    // 暗符 境界线
    darkSpell() {

    }
    draw() {
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
export default Rumia;