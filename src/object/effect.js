import { Sprite, Text } from "pixi.js";
import BaseObject from "./object";
import { getImageByName } from "../imageLoader";

class Effect extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.cardNameSprite = null;
    }
    init(params) {
        this.params = params;
        this.angle = params.angle;
        this.x = params.x;
        this.y = params.y;
        this.speed = params.speed;
        this.effectType = params.effectType;
        let texture = getImageByName(this.params.image);
        this.sprite = new Sprite(texture);
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.sprite.alpha = params.alpha || 1;
        this.scene.effectLayer.addChild(this.sprite);
    }
    update() {
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
    spellCard() {
        this.drawCardName();
        if (this.y < 10) {
            if (this.frame_count % 2 == 0) {
                if (this.sprite.alpha >= 0) {
                    this.sprite.alpha -= 0.01;
                }
                else {
                    this.remove();
                    this.scene.boss.notifyActive();
                }
            };
        } else {
            this.y -= 10;
            this.frame_count = 0;
        }
    }
    remove() {
        this.removeCardName();
        this.scene.effectLayer.removeChild(this.sprite)
        this.scene.effectManager.objects.delete(this.id);
        delete this;
    }
    drawCardName() {
     
        if (this.cardNameSprite) {
            this.cardNameSprite.text = this.params.cardName;
        } else {
            this.cardNameSprite = new Text(this.params.cardName, { fill: 0xffffff });
            this.cardNameSprite.x = 0;
            this.cardNameSprite.y = 100;
            this.scene.effectLayer.addChild(this.cardNameSprite);
        }
    }
    removeCardName() {
        this.scene.effectLayer.removeChild(this.cardNameSprite);
        this.cardNameSprite = null;
    }
}
export default Effect;