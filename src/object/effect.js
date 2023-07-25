import { Sprite, Text, Rectangle } from "pixi.js";
import BaseObject from "./object";
import { getImageByName } from "../imageLoader";

class Effect extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.state = 0;
        this.type = 0;
        this.scale = 0;
        this.rotation = 0;
    }
    update() {
        if (this.state != 0)
            return 0;
        BaseObject.prototype.update.apply(this, arguments);
        switch (this.type) {
            case 1:
                this.enemyDestoryEffect();
                break;
            case 2:
                this.chargeEffect();
                break;
            case 3:
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
    initCharge(params) {
        let texture = getImageByName('sysimg_01')
        let rectangle = new Rectangle(0, 64, 128, 128);
        texture.frame = rectangle;
        this.type = 2;
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
        this.params = params;
        this.x = params.x;
        this.y = params.y + 100;
        this.speed = params.speed || 0;
        this.type = params.type;
        let texture = getImageByName(params.imageStand);
        this.sprite = new Sprite(texture);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.alpha = params.alpha || 1;
        this.scene.effectLayer.addChild(this.sprite);

        this.cardNameSprite = new Text(params.cardName, { fill: 0xffffff });
        this.cardNameSprite.x = this.scene.width - this.cardNameSprite.width - 50;
        this.cardNameSprite.y = this.sprite.height;
        this.scene.effectLayer.addChild(this.cardNameSprite);
    }
    chargeEffect() {
        if (this.frame_count < 50) {
            this.scale -= 0.08;
            this.sprite.scale.set(this.scale, this.scale);
        };
        if (this.frame_count > 100 && !this.isSpellCard) {
            this.scene.boss.notifyActive();
            this.isSpellCard = true;
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
            this.cardNameSprite.y -= 8;
        };
        if (this.frame_count > 150) {
            this.x -= 8;
            if (this.x < -this.sprite.width) {
                this.state = 1;
                this.scene.boss.notifyActive();
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
    remove() {
        this.scene.effectLayer.removeChild(this.sprite)
        this.scene.effectManager.objects.delete(this.id);
        delete this;
    }
}
export default Effect;