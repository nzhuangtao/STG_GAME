import BaseObject from "./object";
import * as PIXI from 'pixi.js';
import bullet_type from "../data/bullet";
class Player extends BaseObject {
    TALK_STATE = 1;
    constructor(id, scene) {
        super(id, scene);
        this.hp = 5;
        this.indexX = 0;
        this.indexY = 0;
        this.spriteWidth = 32;
        this.spriteHeight = 48;
        this.image = 'player';
        this.speed = 150;
        this.state = 0;
    }
    init() {
        this.x = this.scene.width / 2;
        this.y = this.scene.height - this.spriteHeight;
        BaseObject.prototype.init.apply(this, arguments);
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments);
        if (this.game.input.iskeyDown(this.game.input.BUTTON_Z)) {
            if (this.state == this.TALK_STATE) {
                if (this.frame_count % 8 === 0) {
                    this.scene.boss.notifyTalk();
                };
            } else {
                this.shot();
            };
        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_LEFT)) {
            this.x -= this.speed * (1 / 60);


        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_RIGHT)) {
            this.x += this.speed * (1 / 60);

        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_UP)) {
            this.y -= this.speed * (1 / 60);

        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_DOWN)) {
            this.y += this.speed * (1 / 60);

        };

        if (this.game.input.iskeyDown(this.game.input.BUTTON_LEFT) && !this.game.input.iskeyDown(this.game.input.BUTTON_RIGHT)) {
            this.indexY = 1;
        } else if (!this.game.input.iskeyDown(this.game.input.BUTTON_LEFT) && this.game.input.iskeyDown(this.game.input.BUTTON_RIGHT)) {
            this.indexY = 2;
        } else {
            this.indexY = 0;
        };

        // if (this.x < 0) {
        //     this.x = 0;
        // }
        // if (this.x > 640 - this.spriteWidth) {
        //     this.x = 640 - this.spriteWidth;
        // }
        // if (this.y < 0) {
        //     this.y = 0;

        // }
        // if (this.y > 480 - this.spriteHeight) {
        //     this.y = 480 - this.spriteHeight;
        // }
    }
    shot() {
        if (this.frame_count % 5 != 0) return 0;
        this.scene.playerBulletManager.create();
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
        BaseObject.prototype.draw.apply(this, arguments);
    }
}
export default Player;