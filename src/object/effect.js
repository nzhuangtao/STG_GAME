import { Sprite, Text, Rectangle } from "pixi.js";
import BaseObject from "./object";
import { getImageByName } from "../imageLoader";

class Effect extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.cardNameSprite = null;
        this.state = 0;
        this.type = 0;
        this.scale = 0;
        this.rotation = 0;
        this.isSpellCard = false;
    }
    update() {
        if (this.state != 0)
            return 0;
        BaseObject.prototype.update.apply(this, arguments);
        switch (this.type) {
            case 1:
                this.spellCharge();
                break;
            case 2:
                this.spellCard();
                break
            case 3:
                this.bossDestory();
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
        this.sprite.rotation = this.rotation;
    }
    initSpellCharge(params) {
        let texture = getImageByName('sysimg_01')
        let rectangle = new Rectangle(0, 64, 128, 128);
        texture.frame = rectangle;
        this.type = 1;
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
    spellCharge() {
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
    initSpellCard(params) {
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
    initBossDestory(params) {
        this.params = params;
        this.x = params.x;
        this.y = params.y;
        this.type = params.type;
        let texture = getImageByName("shock_wave");
        this.sprite = new Sprite(texture);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.scale = 0;
        this.sprite.anchor.set(0.5)
        this.sprite.alpha = params.alpha || 1;
        this.scene.effectLayer.addChild(this.sprite);
    }
    bossDestory() {
        if (this.frame_count < 200) {
            this.scale++;
            this.sprite.scale.set(this.scale);
        } else {
            this.remove();
            this.scene.boss.notifyDie();
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