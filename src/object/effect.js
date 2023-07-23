import { Sprite, Text } from "pixi.js";
import BaseObject from "./object";
import { getImageByName } from "../imageLoader";

class Effect extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.cardNameSprite = null;
        this.state = 0;
    }
    init(params) {
        // this.params = params;
        // this.angle = params.angle || 0;
        // this.x = params.x;
        // this.y = params.y + 100;
        // this.speed = params.speed || 0;
        // this.effectType = params.effectType;
        // let texture = getImageByName(params.imageStand);
        // this.sprite = new Sprite(texture);
        // this.sprite.x = this.x;
        // this.sprite.y = this.y;
        // this.sprite.alpha = params.alpha || 1;
        // this.scene.effectLayer.addChild(this.sprite);
    }
    update() {
        if (this.state != 0)
            return 0;
        BaseObject.prototype.update.apply(this, arguments);
        switch (this.effectType) {
            case 1:
                this.spellCharge();
                break;
            case 2:
                this.spellCard();
                break;
            default:
                break;
        }
    }
    remove() {
        this.removeCardName();
        this.scene.effectLayer.removeChild(this.sprite);
        this.scene.effectManager.objects.delete(this.id);
        delete this;
    }
    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    initSpellCharge() {
        let texture = getImageByName("spell_charge");
        this.sprite = new Sprite(texture);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.scale.set(0.5);
        this.sprite.zIndex = 1;
        this.sprite.rotation = this.toRadian(this.angle + 90);
        this.scene.effectLayer.addChild(this.sprite);
    }
    spellCharge() {
        if (this.frame_count < 100) {
            this.sprite.alpha -= 0.01;
            this.x += this.speed * (1 / 60) * Math.cos(this.toRadian(180 + this.angle));
            this.y += this.speed * (1 / 60) * Math.sin(this.toRadian(180 + this.angle));
        } else {
            this.remove();
            this.scene.boss.notifyActive();
        }
    }
    initSpellCard(params) {
        this.params = params;
        this.x = params.x;
        this.y = params.y + 100;
        this.speed = params.speed || 0;
        this.effectType = params.effectType;
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
    spellCard() {
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
    remove() {
        this.removeCardName();
        this.scene.effectLayer.removeChild(this.sprite)
        this.scene.effectManager.objects.delete(this.id);
        delete this;
    }
    drawCardName() {


    }
    removeCardName() {
        if (this.cardNameSprite) {
            this.scene.effectLayer.removeChild(this.cardNameSprite);
            this.cardNameSprite = null;
        }
    }
}
export default Effect;