import { Sprite, Text, Rectangle, Graphics } from "pixi.js";
import BaseObject from "./object";
import { getImageByName } from "../imageLoader";

class Effect extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.state = 0;
        this.type = 0;
        this.scale = 0;
        this.rotation = 0;
        this.isChargeFinsh = false;
        this.spellBgSprite = null;
        this.spellCardSprite = null;
    }
    update() {

        BaseObject.prototype.update.apply(this, arguments);

        switch (this.type) {
            case 1:
                this.enemyDestoryEffect();
                break;
            case 2:
                this.bossDestoryEffect();
                break;
            case 3:
                this.chargeEffect();
                break;
            case 4:
                this.spellEffect();
                break;
            default:
                break;
        }
    }
    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.scale.set(this.scale);
        this.sprite.rotation = this.rotation;
        this.sprite.alpha = this.alpha;
    }
    remove() {
        this.scene.effectLayer.removeChild(this.sprite);
        this.scene.effectManager.objects.delete(this.id);
        delete this;
    }
    init() {
        this.alpha = 1;
        this.scale = 1;
        this.turn = 0;
    }
    initEnemyDestory(params) {
        this.x = params.x;
        this.y = params.y;
        this.type = 1;
        let texture = getImageByName("shock_wave");
        this.sprite = new Sprite(texture);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.scale = 0;
        this.sprite.anchor.set(0.5)
        this.alpha = 1;
        this.scene.effectLayer.addChild(this.sprite);
    }
    initBossDestory(params) {
        this.x = params.x;
        this.y = params.y;
        this.type = 2;
        let texture = getImageByName("shock_wave");
        this.sprite = new Sprite(texture);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.scale = 0;
        this.sprite.anchor.set(0.5)
        this.alpha = 1;
        this.scene.effectLayer.addChild(this.sprite);
    }
    initCharge(params) {
        let texture = getImageByName('sysimg_01')
        let rectangle = new Rectangle(0, 64, 128, 128);
        texture.frame = rectangle;
        this.type = 3;
        this.sprite = new Sprite(texture);
        this.x = params.x;
        this.y = params.y;
        this.scale = 5;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.scale.set(this.scale);
        this.sprite.anchor.set(0.5)
        this.scene.effectLayer.addChild(this.sprite);
    }
    initSpell(params) {
        this.x = params.x;
        this.y = params.y;
        this.speed = params.speed || 0;
        this.type = 4;
        this.spellBgSprite = new Graphics();
        this.spellBgSprite.beginFill(0x000000, 0.8);
        this.spellBgSprite.drawRect(0, 0, this.scene.width, this.scene.height);
        this.spellBgSprite.endFill();
        this.scene.effectLayer.addChild(this.spellBgSprite);
        let texture = getImageByName(params.imageStand);
        this.sprite = new Sprite(texture);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.scene.effectLayer.addChild(this.sprite);
    }
    chargeEffect() {

        if (this.frame_count < 50) {
            this.scale -= 0.08;
        };
        if (this.frame_count > 100 && !this.isChargeFinsh) {
            this.scene.boss.notifyActive();
            this.isChargeFinsh = true;
        };
        this.x = this.scene.boss.x;
        this.y = this.scene.boss.y;
        this.rotation += 0.1;
        if (this.rotation >= 100) {
            this.rotation = 0;
        };
    }
    spellEffect() {
        if (this.frame_count < 70) {
            this.x -= 8;
        };
        if (this.frame_count > 150) {
            this.x -= 8;
            if (this.x < - this.sprite.width) {
                this.scene.boss.notifyActive();
                this.remove();
            };
        };
    }
    enemyDestoryEffect() {
        if (this.frame_count < 10) {
            this.scale += 0.2;
            this.alpha -= 0.1;
        } else {
            this.remove();
        };
    }
    bossDestoryEffect() {
        if (this.frame_count < 10) {
            this.scale += 1;
            if (this.alpha > 0) {
                this.alpha -= 0.1;
            };
        } else {
            this.remove();
            this.scene.boss.notifyDie();
        };
    }
    remove() {
        if (this.spellBgSprite) {
            this.scene.effectLayer.removeChild(this.spellBgSprite);
        };
        this.scene.effectLayer.removeChild(this.sprite)
        this.scene.effectManager.objects.delete(this.id);
        delete this;
    }
}
export default Effect;