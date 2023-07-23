import Boss from "../object/boss";
import BOSS_CONFIG from "../config/boss";
import getBulletType from "../data/bullet";
import { getImageByName } from "../imageLoader";
import * as PIXI from 'pixi.js'
class Rumia extends Boss {
    MODE_NORMAL = 'normal';
    MODE_LEFT = 'left';
    MODE_RIGHT = 'right';
    MODE_ATTACK = 'attack';
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

        this.changeMode(this.MODE_NORMAL);
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
        Boss.prototype.update.apply(this, arguments);
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
    showCircleRed() {
        for (let i = 0; i < 8; i++) {
            let params = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 240,
                angle: 180 - i * 22.5,
                indexX: 13,
                indexY: 3,
                width: 16,
                height: 16,
            };
            this.scene.enemyBulletManager.create(params);
        }
    }
    showCircleBlue() {
        for (let i = 0; i < 12; i++) {
            let params = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 240,
                angle: i * 15,
                indexX: 12,
                indexY: 3,
                width: 16,
                height: 16,
            };
            this.scene.enemyBulletManager.create(params);
        }
    }
    shotCircleBullet() {
        for (let i = 0; i < 12; i++) {
            let params = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 240,
                angle: i * 36,
                indexX: 13,
                indexY: 4,
                width: 16,
                height: 16,
            };
            this.scene.enemyBulletManager.create(params);
        }
    }
    showRadomRingBullet() {
        // for (let i = 0; i < 8; i++) {
        //     let params = {
        //         x: this.x+Math.random()*100-15,
        //         y: this.y+Math.random()*100-15,
        //         moveType: 2,
        //         speed: 240,
        //         angle: i * 45 + this.frame_count,
        //         indexX: 7,
        //         indexY: 3,
        //         width: 16,
        //         height: 16,
        //     };
        //     this.scene.enemyBulletManager.create(params);
        // }
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
    shotScaleBullet() {
        for (let i = 0; i < 4; i++) {
            let params = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 240,
                angle: 45 + i * 45,
                indexX: 13,
                indexY: 2,
                width: 16,
                height: 16,
                a: 2,
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