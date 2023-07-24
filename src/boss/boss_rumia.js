import Boss from "../object/boss";
import BOSS_CONFIG from "../config/boss";
import TALK_CONFIG from "../config/talk";

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
            } else if (this.cardIndex == 0) {
                this.state = this.STATE_ATTACK2;
            } else if (this.cardIndex == 1) {
                this.state = this.STATE_ATTACK3;
            } else if (this.cardIndex == 2) {
                this.state = this.STATE_ATTACK4;
            }
        };

        if (this.state == this.STAET_ATTACK1) {
            if (this.frame_count % 10 == 0) {
                this.shotCircleBullet();
            }
        };
        if (this.state == this.STATE_ATTACK2) {
            if (this.frame_count % 10 == 0) {
                this.shotRingBullet();
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
    shotCircleBullet() {

        for (let i = 0; i < 12; i++) {
            let params = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 240,
                angle: i * 36 + 12,
                indexX: 13,
                indexY: 4,
                width: 16,
                height: 16,
            };
            this.scene.enemyBulletManager.create(params);
        }
    }
    shotRingBullet() {
        for (let i = 0; i < 8; i++) {
            let params = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 240,
                angle: i * 45 + this.frame_count,
                indexX: 7,
                indexY: 3,
                width: 16,
                height: 16,
            };
            this.scene.enemyBulletManager.create(params);
        }
    }
    tripleorbs() {
        let player = this.scene.player;
        let ax = player.x - this.x;
        let ay = player.y - this.y;
        let angle = this.toAngle(Math.atan2(ay, ax));
        for (var j = 0; j < 3; j++) {
            let params = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 240,
                angle: angle + j * 10 + Math.random() * 3,
                indexX: 3,
                indexY: 2,
                width: 16,
                height: 16,
            };
            this.scene.enemyBulletManager.create(params);
        }
    }
}
export default Rumia;