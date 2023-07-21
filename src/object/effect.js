import { Sprite } from "pixi.js";
import BaseObject from "./object";
import { getImageByName } from "../imageLoader";

class Effect extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
    }
    init(params) {
        this.params = params;
        this.angle = params.angle;
        this.x = params.x;
        this.y = params.y;
        this.speed = params.speed;
        this.effectType = params.effectType;
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments);
        switch (this.effectType) {
            case 1:
                this.spellCharge();
                break;
            case 2:

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
    // 释放符卡时的特效
    initSpellCard() {
        let texture = getImageByName(this.params.image);
        this.sprite = new Sprite(texture);
        this.sprite.x = this.x;
        this.sprite.y = this.y;

        this.sprite.alpha = 0.5;
        this.scene.effectLayer.addChild(this.sprite);
    }
    spellCard() {
        if (this.y < 10) {
            if (this.frame_count > 100) {
                this.remove();
                this.scene.boss.notifySpellCard();
            } else {
                this.sprite.alpha -= 0.01;
            }
        } else {
            this.y -= 5;
            this.frame_count = 0;
        }
    }
}
export default Effect;