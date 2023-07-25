import BaseObject from "./object";
import * as PIXI from 'pixi.js'
import { getImageByName } from "../imageLoader";
class Boss extends BaseObject {
    STATE_START = 1;
    STATE_TALK = 2;
    STATE_ATIVE = 3;
    STATE_CHARHE = 4;
    STATE_WAIT = 5;
    STATE_DIE = 6;
    STATE_SPELL = 7;
    hpBarHeight = 20;
    constructor(id, scene) {
        super(id, scene);
        this.config = null;
        this.state = this.STATE_START;
        this.hp = 10;
        this.maxHp = 10;
        this.hpNum = 2;
        this.hpBar = null;
        this.cardName = '';
        this.startTalk = [];
        this.endTalk = [];

        this.talkIndex = 0;
        this.lastTalkIndex = 0;

        this.istalkAppear = false;
        this.isDie = false;

        this.talkPreview = null;
        this.talkName = null;
        this.talkMessage = null;
        this.talkBar = null;

        this.cardIndex = 0;
        this.cardList = [];

        this.imageStand = '';
        this.lastCardEffect = null;
        this.isExist = false;
        this.chargeEffectSprite = null;
    }
    init() {
        // 标记为入场
        this.isExist = true;
        // 设置初始位置
        this.x = this.scene.width / 2;
        this.y = 0 - this.spriteHeight;
        this.speed = 200;
        // 初始化血条
        this.initHpBar();
        BaseObject.prototype.init.apply(this, arguments);
    }
    initHpBar() {
        this.hpBar = new PIXI.Graphics();
        this.hpBar.beginFill(0xffffff, 1);
        this.hpBar.drawRect(15, 15, this.scene.width - 30, this.hpBarHeight);
        this.scene.playerLayer.addChild(this.hpBar);
    }
    changeMode() {
        console.log("此函数需要重写")
    }
    update() {
        if (!this.isExist)
            return 0;

        BaseObject.prototype.update.apply(this, arguments);

        if (this.state == this.STATE_START) {
            // 入场动画
            this.start();
        };

        // 检查是否有对话
        if (this.state == this.STATE_TALK) {
            this.talk();
        };
        if (this.state == this.STATE_READY) {
            if (this.frame_count > 100) {
                this.state = this.STATE_ATIVE;
            };
        }
        if (this.state == this.STATE_CHARHE) {
            this.chargeEffect();
            this.state = this.STATE_WAIT;
        };
        if (this.state == this.STATE_SPELL) {
            this.spellEffect();
            this.state = this.STATE_READY;
        };
    }
    draw() {
        if (!this.isExist)
            return 0;

        this.sprite.x = this.x;
        this.sprite.y = this.y;

        BaseObject.prototype.draw.apply(this, arguments);
    }
    updateHp() {
        if (this.hp < 0)
            return 0;
        let width = this.scene.width - 30;
        let s = this.hp / this.maxHp;
        let currentWidth = width * s;
        this.hpBar.width = currentWidth;
    }
    start() {
        this.y += this.speed * this.scene.FPS;

        if (this.y >= this.spriteHeight) {
            this.y = this.spriteHeight;
            this.state = this.STATE_TALK;
            this.speed = 0
        };
    }
    talk() {
        if (this.talkIndex < this.talkList.length) {
            this.showTalk();
        } else {
            this.hideTalk();
            if (this.isDie) {
                this.state = this.STATE_DIE;
                this.scene.notifyGameWin();
            } else {
                this.state = this.STATE_CHARHE;
            };
        }
    }
    showTalk() {
        let talk = this.talkList[this.talkIndex];

        if (!this.talkAppear) {
            // 初始化对话，将所有对话需要用到的精灵添加到场景
            // 让人物暂时不更新
            this.scene.player.state = this.scene.player.TALK_STATE;
            // 画人物
            let texture = getImageByName(talk.image_stand);
            this.talkPreview = new PIXI.Sprite(texture);

            this.talkPreview.x = this.scene.width - this.talkPreview.width;
            this.talkPreview.y = 50;
            this.scene.stage.addChild(this.talkPreview);
            // 画对话框
            this.talkBar = new PIXI.Graphics();
            this.talkBar.beginFill(0x000000, 0.8);
            this.talkBar.drawRect(30, this.scene.height - 240, this.scene.width - 70, 200);
            this.talkBar.endFill();
            this.scene.stage.addChild(this.talkBar);
            // 画人物名字
            this.talkName = new PIXI.Text(talk.name + "：", { fill: 0xffffff, fontSize: 24 });
            this.talkName.x = 60;
            this.talkName.y = this.scene.height - 220;
            this.scene.stage.addChild(this.talkName);
            // 画对话
            this.talkMessage = new PIXI.Text(talk.message, { fill: 0xffffff, fontSize: 16 });
            this.talkMessage.x = 60;
            this.talkMessage.y = this.scene.height - 180;
            this.scene.stage.addChild(this.talkMessage);
            this.talkAppear = true;
        };
        if (this.talkAppear && this.talkIndex > 0) {

            if (this.lastTalkIndex == this.talkIndex)
                return 0;
            let texture = getImageByName(talk.image_stand);
            this.talkPreview.texture = texture;
            this.talkName.text = talk.name + "：";
            this.talkMessage.text = talk.message;
            this.lastTalkIndex = this.talkIndex;
        };
    }
    hideTalk() {
        this.scene.player.state = this.scene.player.ACTIVE_STATE;
        let stage = this.scene.game.stage;
        stage.removeChild(this.talkPreview);
        stage.removeChild(this.talkBar);
        stage.removeChild(this.talkMessage);
        stage.removeChild(this.talkName);
        this.talkAppear = false;
        this.talkIndex = 0;
        this.lastTalkIndex = 0;
    }
    chargeEffect() {
        this.chargeEffectSprite = this.scene.effectManager.create();
        this.chargeEffectSprite.initCharge({
            x: this.x,
            y: this.y,
        });
    }
    spellEffect() {
        let spellEffect = this.scene.effectManager.create();
        let params = {
            x: this.scene.width,
            y: 100,
            imageStand: this.imageStand,
            alpha: 1,
        };
        spellEffect.initSpell(params);
    }
    notifyActive() {
        this.state = this.STATE_ATIVE;
        this.frame_count = 0;
    }
    notifyGameWin() {

    }
    notifyDie() {
        this.isDie = true;
        this.state = this.STATE_TALK;
        this.talkList = this.endTalk;
    }
    die() {
        // 检查是否存在结束时对话
        if (this.hpNum > 0) {
            this.hp = this.maxHp;
            this.resetActive();
            this.hpNum--;
        } else {
            this.state = this.STATE_WAIT;
            this.playDieAnimation();
        }
    }
    playDieAnimation() {
        let effect = this.scene.effectManager.create();
        effect.initBossDestory({
            x: this.x,
            y: this.y,
        });
        this.remove();
    }
    remove() {
        this.scene.playerLayer.removeChild(this.sprite);
        this.chargeEffectSprite.remove();
    }
    clearScreenBullet() {
        let bullets = this.scene.enemyBulletManager.objects;
        bullets.forEach((bullet) => {
            this.scene.playerLayer.removeChild(bullet.sprite);
            bullets.delete(bullet.id);
        });
    }
    resetActive() {
        this.attackIndex++;
        this.frame_count = 0;
        let type = this.attackMode[this.attackIndex].type;
        if (type == 2) {
            this.cardName = this.cardList[this.cardIndex];
            this.cardIndex++;
            this.state = this.STATE_SPELL;
        } else {
            debugger
            this.state = this.STATE_READY;
        };
    }
    checkCollisionWithPlayer() {
        let player = this.scene.player;
        if (
            this.state == this.STATE_READY ||
            this.state == this.STATE_SPELL ||
            this.state == this.STATE_WAIT ||
            this.state == this.STATE_START ||
            this.state == this.STATE_CHARHE ||
            this.state == this.STATE_TALK)
            return 0;

        if (this.hp <= 0) {
            this.die();
            return 0;
        };

        let bullets = this.scene.playerBulletManager.objects;
        bullets.forEach((bullet) => {
            if (bullet.checkCollision(this)) {
                this.hp--;
                bullet.remove();
            };
        });
    }
}
export default Boss;