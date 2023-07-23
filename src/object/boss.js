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
    hpBarHeight = 20;
    constructor(id, scene) {
        super(id, scene);
        this.config = null;
        this.state = this.STATE_CHARHE;
        this.hp = 10;
        this.maxHp = 10;
        this.startTalk = [];
        this.endTalk = [];
        this.talkIndex = 0;
        this.lastTalkIndex = 0;
        this.talkAppear = false;
        this.isDie = false;
        this.talkPreview = null;
        this.talkName = null;
        this.talkMessage = null;
        this.talkBar = null;
        this.hpBar = null;
        this.cardIndex = 0;
        this.hpNum = 1;
        this.cardList = [];
        this.imageStand = '';
        this.lastCardEffect = null;
        this.isExist = false;
    }
    init() {
        this.isExist = true;
        // 初始化对话
        this.initTalk();
        // 初始化血条
        this.initHpBar();
        BaseObject.prototype.init.apply(this, arguments);
    }
    initTalk() {
        this.startTalk = this.config.startTalk;
        this.endTalk = this.config.endTalk;
        this.talkList = this.startTalk;
    }
    initHpBar() {
        this.hpBar = new PIXI.Graphics();
        this.hpBar.beginFill(0xffffff, 1);
        this.hpBar.drawRect(15, 15, this.scene.width - 30, this.hpBarHeight);
        this.scene.playerLayer.addChild(this.hpBar);
    }
    update() {
        if (!this.isExist)
            return 0;
        BaseObject.prototype.update.apply(this, arguments);
        // if (this.state == this.STATE_START) {
        //     // 入场动画
        //     this.y += this.speed * this.scene.FPS;

        //     if (this.y >= this.spriteHeight) {
        //         this.y = this.spriteHeight;
        //         this.state = this.STATE_TALK;
        //     };
        // };

        // 检查是否有对话
        if (this.state == this.STATE_TALK) {
            this.handleTalk();
        }
        // 死亡后通知关卡模块显示gamewin
        if (this.state == this.STATE_DIE) {
            this.notifyGameWin();
        };
    }
    handleTalk() {
        if (this.talkIndex < this.talkList.length) {
            this.showTalk();
        } else {
            this.hideTalk();
            if (this.isDie) {
                this.state = this.STATE_DIE;
            } else {
                this.state = this.STATE_READY;
            }
        }
    }
    notifyGameWin() {
        this.scene.getGameWinEvent();
        this.state = this.STATE_WAIT;
    }
    showTalk() {
        let talk = this.talkList[this.talkIndex];
        if (!this.talkAppear) {
            // 初始化对话，将所有对话需要用到的精灵添加到场景
            // 让人物暂时不更新
            this.scene.player.state = this.scene.player.TALK_STATE;
            // 画人物
            let texture = getImageByName(talk.image);
            this.talkPreview = new PIXI.Sprite(texture);

            this.talkPreview.x = this.scene.width - this.talkPreview.width;
            this.talkPreview.y = 50;
            this.scene.stage.addChild(this.talkPreview);
            // 画对话框
            this.talkBar = new PIXI.Graphics();
            this.talkBar.beginFill(0xffffff, 0.8);
            this.talkBar.drawRect(0, this.scene.height - 240, this.scene.width, 240);
            this.talkBar.endFill();
            this.scene.stage.addChild(this.talkBar);
            // 画人物名字
            this.talkName = new PIXI.Text(talk.name);
            this.talkName.x = 0;
            this.talkName.y = this.scene.height - 240;
            this.scene.stage.addChild(this.talkName);
            // 画对话
            this.talkMessage = new PIXI.Text(talk.message);
            this.talkMessage.x = 0;
            this.talkMessage.y = this.scene.height - 240 + 40;
            this.scene.stage.addChild(this.talkMessage);
            this.talkAppear = true;
        };
        if (this.talkAppear && this.talkIndex > 0) {
            if (this.lastTalkIndex == this.talkIndex)
                return 0;
            let texture = getImageByName(talk.image);
            this.talkPreview.texture = texture;
            this.talkName.text = talk.name;
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
    spellCardEffect() {
        console.log("释放符卡");
        if (this.lastCardEffect) {
            this.lastCardEffect.remove();
            this.lastCardEffect = null;
        };
        this.lastCardEffect = this.scene.effectManager.create();
        let params = {
            x: this.scene.width,
            y: 0,
            effectType: 2,
            imageStand: this.imageStand,
            alpha: 0.8,
            cardName: this.cardList[this.cardIndex],
        };
        this.lastCardEffect.initSpellCard(params);
    }
    spellCharge() {
        for (let i = 0; i < 60; i++) {
            let angle = i * 6;
            let params = {
                x: this.x + Math.cos(angle / 180 * Math.PI) * 200,
                y: this.y + Math.sin(angle / 180 * Math.PI) * 200,
                angle: angle,
                speed: 200 + Math.random() * 10,
                effectType: 1,
            }
            let effect = this.scene.effectManager.create();
            effect.init(params);
            effect.initSpellCharge();
        };
    }
    notifySpellCard() {

    }

    shotLeftLeaf() {
        for (let i = 0; i < 5; i++) {
            for (var j = 0; j < 12; j++) {
                let params = {
                    x: this.x,
                    y: this.y,
                    moveType: 5,
                    speed: ((5 - i) * 30) + 10,
                    angle: (120 + j * 10),
                    indexX: 0,
                    indexY: 0,
                    width: 32,
                    height: 32,
                    delay: 200,
                    image: 'leaf_yellow'
                }
                this.scene.enemyBulletManager.create(params);
            }
        }
    }
    shotRightLeaf() {
        for (let i = 0; i < 5; i++) {
            for (var j = 0; j < 12; j++) {
                let params = {
                    x: this.x,
                    y: this.y,
                    moveType: 5,
                    speed: i * 30 + 50,
                    angle: 180 - (120 + j * 10),
                    indexX: 0,
                    indexY: 0,
                    width: 32,
                    height: 32,
                    image: 'leaf_blue'
                }
                this.scene.enemyBulletManager.create(params);
            }
        }
    }
    tripleorbs() {
        let player = this.scene.player;
        let ax = player.x - this.x;
        let ay = player.y - this.y;
        let angle = this.toAngle(Math.atan2(ay, ax));
        for (let i = 0; i < 9; i++) {
            for (var j = 0; j < 3; j++) {
                let params = {
                    x: this.x,
                    y: this.y,
                    moveType: 2,
                    speed: i * 10 + 100,
                    angle: angle + j * 10,
                    indexX: 2,
                    indexY: 2,
                    width: 16,
                    height: 16,
                };
                this.scene.enemyBulletManager.create(params);
            }
        }
    }
    leafTwoDelay() {
        for (let i = 0; i < 4; i++) {
            let params1 = {
                x: this.x,
                y: this.y,
                moveType: 6,
                speed: 100,
                angle: this.frame_count + i * 90,
                indexX: 0,
                indexY: 0,
                width: 32,
                height: 32,
                image: "leaf_yellow",
                turn_angle: 270
            };
            this.scene.enemyBulletManager.create(params1);
            let params2 = {
                x: this.x,
                y: this.y,
                moveType: 6,
                speed: 100,
                angle: i * 90 - this.frame_count,
                indexX: 0,
                indexY: 0,
                width: 32,
                height: 32,
                turn_angle: 90,
                image: "leaf_yellow"
            };
            this.scene.enemyBulletManager.create(params2);
        }
    }
    shotCircle() {
        for (var i = 0; i < 30; i++) {
            let params1 = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 120,
                angle: i * 12,
                indexX: 3,
                indexY: 3,
                width: 16,
                height: 16,
            };
            this.scene.enemyBulletManager.create(params1);
            let params2 = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 100,
                angle: i * 12,
                indexX: 3,
                indexY: 3,
                width: 16,
                height: 16,
            };
            this.scene.enemyBulletManager.create(params2);
        }
    }
    shotSpawner() {
        let params1 = {
            x: this.x,
            y: this.y,
            moveType: 7,
            speed: 100,
            angle: 45,
            indexX: 0,
            indexY: 0,
            width: 32,
            height: 32,
            image: "orb_white",
        };
        this.scene.enemyBulletManager.create(params1);
        let params2 = {
            x: this.x,
            y: this.y,
            moveType: 7,
            speed: 100,
            angle: 135,
            indexX: 0,
            indexY: 0,
            width: 32,
            height: 32,
            image: "orb_white",
        };
        this.scene.enemyBulletManager.create(params2);
    }
    shotSpirals() {
        for (var i = 0; i < 5; i++) {
            let params1 = {
                x: this.x,
                y: this.y,
                moveType: 8,
                speed: 100,
                angle: i * 72 + this.frame_count,
                indexX: 3,
                indexY: 4,
                width: 16,
                height: 16,

            };
            this.scene.enemyBulletManager.create(params1);
            // let params2 = {
            //     x: this.x,
            //     y: this.y,
            //     moveType: 2,
            //     speed: 100,
            //     angle: i * 72 - this.frame_count,
            //     indexX: 5,
            //     indexY: 4,
            //     width: 16,
            //     height: 16,
            // };
            // this.scene.enemyBulletManager.create(params2);
        }
    }
    draw() {
        if (!this.isExist)
            return 0;

        this.sprite.x = this.x;
        this.sprite.y = this.y;

        BaseObject.prototype.draw.apply(this, arguments);
    }
    clearScreenBullet() {
        let bullets = this.scene.enemyBulletManager.objects;
        bullets.forEach((bullet) => {
            this.scene.playerLayer.removeChild(bullet.sprite);
            bullets.delete(bullet.id);
        });
    }
    changeState() { }
    updateHp() {
        if (this.hp < 0)
            return 0;
        let width = this.scene.width - 30;
        let s = this.hp / this.maxHp;
        let currentWidth = width * s;
        this.hpBar.width = currentWidth;
    }
    notifyActive() {
        this.state = this.STATE_ATIVE;
        this.frame_count = 0;
    }
    die() {
        // 检查是否存在结束时对话
        this.isDie = true;
        if (this.endTalk.length > 0) {
            this.state = this.STATE_TALK;
            this.talkList = this.endTalk;
        };
    }
    changeCard() {
        this.cardIndex++;
        this.hp = this.maxHp;
        // 播放符卡释放前特效
        this.state = this.STATE_CHARHE;
        // this.clearScreenBullet();
    }
    checkCollisionWithPlayer() {
        let player = this.scene.player;
        if (player.state == player.DIE_STATE ||
            this.state == this.STATE_DIE)
            return 0;

        if (this.hp <= 0 && this.hpNum > 0) {
            this.changeCard();
            this.hpNum--;
            return 0;
        }
        if (this.hpNum <= 0 && this.hp <= 0) {
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