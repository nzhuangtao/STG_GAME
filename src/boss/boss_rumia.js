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

        this.normalNum = 5;
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
            this.darkSpell();
        };
        if (this.state == this.STATE_ATTACK2) {

        };
        if (this.state == this.STATE_ATTACK3) {

        }
        if (this.state == this.STATE_ATTACK4) {

        };
        // this.x += this.speed * this.scene.FPS * Math.cos(this.toRadian(this.angle));
        // this.y += this.speed * this.scene.FPS * Math.sin(this.toRadian(this.angle));
    }
    normalAttack() {
        if (this.frame_count % 10 == 0 && this.normalNum > 0) {
            let bulletType = getBulletType(34);
            let player = this.scene.player;
            let ax = player.x - this.x;
            let ay = player.y - this.y;
            let angle = this.toAngle(Math.atan2(ay, ax));
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 10; j++) {
                    let params = {
                        x: this.x,
                        y: this.y,
                        moveType: 2,
                        speed: 180 + j * 10,
                        angle: angle - i * 5 + this.frame_count,
                        ...bulletType,
                    };
                    this.scene.enemyBulletManager.create(params);
                }
            };
            this.normalNum--;
        };

    }
    move() {

    }
    // 月符
    moonLightSpell() {
        this.changeMode(this.MODE_ATTACK, 1);
        // let bulletType = getBulletType(38);
        // for (let i = 0; i < 12; i++) {
        //     let params = {
        //         x: this.x,
        //         y: this.y,
        //         moveType: 2,
        //         speed: 240,
        //         angle: i * 36 + 12,
        //         ...bulletType,
        //     };
        //     this.scene.enemyBulletManager.create(params);
        // }
    }
    nightWarbler() {
        if (this.frame_count % 10 != 0)
            return 0;
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
                    speed: 200 + i * 10 + j * 20,
                    angle: start + step * i,
                    ...bulletType,
                };
                this.scene.enemyBulletManager.create(params);
            }
        }
        if (this.frame_count % 100 == 0) {
            this.x = Math.random() * this.scene.width;
        };
    }
    // 暗符 境界线
    darkSpell() {
        for (let j = 0; j < 2; j++) {
            let bulletType = j%2==0?getBulletType(70):getBulletType(72);
            for (let i = 0; i < 36; i++) {
                let params = {
                    index:j,
                    x: this.x,
                    y: this.y,
                    moveType: 17,
                    speed: 200,
                    angle: i * 10,
                    ...bulletType,
                    turn:j%2==0?this.angle+45:this.angle-45
                };
                this.scene.enemyBulletManager.create(params);
            }
        }
        this.state = this.STATE_WAIT;
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