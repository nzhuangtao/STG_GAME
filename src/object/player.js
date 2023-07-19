import Bullet from "./playerBullet";
import BaseObject from "./object";
import * as PIXI from 'pixi.js';
import bullet_type from "../data/bullet";
class Player extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.hp = 5;
        this.indexX = 0;
        this.indexY = 0;
        this.spriteWidth = 32;
        this.spriteHeight = 48;
        this.image = 'player';
        this.speed = 200;
        this.bulletIndex = 0;
        this.bulletType = bullet_type[4];
    }
    init() {
        this.x = 640 / 2 - this.spriteWidth / 2;
        this.y = 480 - 100;
        BaseObject.prototype.init.apply(this, arguments);
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments);
        if (this.game.input.iskeyDown(this.game.input.BUTTON_Z)) {
            this.shot();
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

        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > 640 - this.spriteWidth) {
            this.x = 640 - this.spriteWidth;
        }
        if (this.y < 0) {
            this.y = 0;

        }
        if (this.y > 480 - this.spriteHeight) {
            this.y = 480 - this.spriteHeight;

        }
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    shot() {
  
        if(this.frame_count%5!=0) return 0;
        let bullet = new Bullet(this.bulletIndex,this.scene);
        // 传参数确定子弹位置与样式
        let params = {
            x:this.x,
            y:this.y,
            width:this.bulletType.width,
            height:this.bulletType.height,
            indexX:this.bulletType.indexX,
            indexY:this.bulletType.indexY
        };
        
        bullet.init(params);
        this.bulletIndex++;
        this.scene.player_bullets[this.bulletIndex] = bullet;
    }
    draw() {
        if (this.frame_count % 5 == 0) {
            this.indexX += 1;
            if (this.indexX > 7) {
                this.indexX = 0;
            };
        };
        BaseObject.prototype.draw.apply(this, arguments);
    }
}
export default Player;