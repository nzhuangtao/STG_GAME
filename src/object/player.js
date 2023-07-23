import BaseObject from "./object";
import * as PIXI from 'pixi.js';

class Player extends BaseObject {
    TALK_STATE = 1;
    DIE_STATE = 2;
    ACTIVE_STATE = 3;
    constructor(id, scene) {
        super(id, scene);
        this.hp = 5;
        this.indexX = 0;
        this.indexY = 0;
        this.spriteWidth = 32;
        this.spriteHeight = 48;
        this.bulletType = 1;
        this.image = 'player';
        this.speed = 200;
        this.state = 0;
        this.alpha = 1;
        this.angle = 0;
        this.initX = this.scene.width / 2;
        this.initY = this.scene.height - this.spriteHeight;
        /**
         * @TODO
         * 1子弹等级
         * 2炸弹
         * 3判定点
         */
    }
    init() {
        this.state = this.ACTIVE_STATE;
        this.x = this.scene.width / 2;
        this.y = this.scene.height - this.spriteHeight;
        BaseObject.prototype.init.apply(this, arguments);
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments);
        // 死亡后再生
        // if (this.state == this.DIE_STATE && this.frame_count > 100) {
        //     this.state = this.ACTIVE_STATE;
        //     this.alpha = 1;
        // };

        if (this.game.input.iskeyDown(this.game.input.BUTTON_Z)) {
            if (this.state == this.ACTIVE_STATE) {
                this.shot();
            };
            if (this.state == this.TALK_STATE) {
                if (this.frame_count % 5 == 0) {
                    this.scene.boss.talkIndex++;
                }
            };
        };
        const FPS = this.scene.FPS;
        if (this.game.input.iskeyDown(this.game.input.BUTTON_LEFT)) {
            this.x -= this.speed * FPS;
        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_RIGHT)) {
            this.x += this.speed * FPS;

        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_UP)) {
            this.y -= this.speed * FPS;

        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_DOWN)) {
            this.y += this.speed * FPS;

        };

        if (this.game.input.iskeyDown(this.game.input.BUTTON_LEFT) && !this.game.input.iskeyDown(this.game.input.BUTTON_RIGHT)) {
            this.indexY = 1;
        } else if (!this.game.input.iskeyDown(this.game.input.BUTTON_LEFT) && this.game.input.iskeyDown(this.game.input.BUTTON_RIGHT)) {
            this.indexY = 2;
        } else {
            this.indexY = 0;
        };

        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.scene.width - this.spriteWidth) {
            this.x = this.scene.width - this.spriteWidth;
        }
        if (this.y < 0) {
            this.y = 0;

        }
        if (this.y > this.scene.height - this.spriteHeight) {
            this.y = this.scene.height - this.spriteHeight;
        }
    }
    shot() {
        if (this.frame_count % 5 != 0) return 0;

        this.scene.playerBulletManager.create();
    }
    die() {
        this.state = this.DIE_STATE;

        // 死啦你害的啦
    }
    draw() {
        if (this.frame_count % 5 == 0) {
            this.indexX += 1;
            if (this.indexX > 7) {
                this.indexX = 0;
            };
        };
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.alpha = this.alpha;
        BaseObject.prototype.draw.apply(this, arguments);
    }
    checkCollisionWithEnemy() {
        let enemies = this.scene.enemyManager.objects;
        enemies.forEach((enemy) => {
            if (enemy.checkCollision(this)) {
                this.boom();
            };
        });
    }
    boom() {
        // 
        if (this.hp >= 5) {
            this.hp--;
            this.reset();
        } else {
            this.die();
        };
    }
    reset() {
        this.x = this.scene.width / 2;
        this.y = this.scene.height - this.spriteHeight;
    }
}
export default Player;