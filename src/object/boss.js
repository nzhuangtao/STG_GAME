import BaseObject from "./object";
import bullet_type from "../data/bullet";
import * as PIXI from 'pixi.js'
import { getImageByName } from "../imageLoader";
class Boss extends BaseObject {
    STATE_START = 1;
    STATE_TALK = 2;
    STATE_ATIVE = 3;
    STATE_CHARHE = 4;
    STATE_WAIT = 5;
    constructor(id, scene) {
        super(id, scene);
        this.state = this.STATE_ATIVE;
        this.hp = 200;
        this.maxHp = 200;
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
        this.cardNum = 0;
        this.num = 6;
        this.cardList = [];
    }
    init() {
        this.talkList = this.startTalk;
        // 初始化血条
        this.hpBar = new PIXI.Graphics();
        this.hpBar.beginFill(0xfff555, 1);
        this.hpBar.drawRect(0, 0, this.scene.width, 30);
        this.scene.playerLayer.addChild(this.hpBar);

        BaseObject.prototype.init.apply(this, arguments);
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments);

        this.updateHp();
        // if (this.state == this.STATE_START) {
        //     // 入场动画
        //     this.y += this.speed * this.scene.FPS;

        //     if (this.y >= this.spriteHeight) {
        //         this.y = this.spriteHeight;
        //         this.state = this.STATE_TALK;
        //     };
        // };

        // // 检查是否有对话
        // if (this.state == this.STATE_TALK) {

        //     if (this.talkIndex < this.talkList.length) {

        //         this.displayTalk();
        //     } else {
        //         this.hideTalk();
        //         this.state = this.STATE_READY;
        //     }
        // }
        if (this.state == this.STATE_CHARHE) {
            this.SpellCardEffect();

            this.state = this.STATE_WAIT;
        }
        // if (this.state == this.STATE_READY) {
        //     this.spellCharge();
        //     this.state = null;
        // }
    }
    SpellCardEffect() {
        let effect = this.scene.effectManager.create();
        let params = {
            x: 0,
            y: this.scene.height,
            image: "mokou_stand",
            effectType: 2,
            cardName: this.cardList[this.cardNum-0],
        };
        effect.init(params);
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
    hideTalk() {
        let stage = this.scene.game.stage;
        stage.removeChild(this.talkPreview);
        stage.removeChild(this.talkBar);
        stage.removeChild(this.talkMessage);
        stage.removeChild(this.talkName);
        this.talkAppear = false;
        this.talkIndex = 0;
        this.lastTalkIndex = 0;
    }
    displayTalk() {
        let talk = this.talkList[this.talkIndex];
        if (!this.talkAppear) {
            // 初始化对话，将所有对话需要用到的精灵添加到场景
            // 让人物暂时不更新
            this.scene.player.state = 1;
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
    notifyTalk() {
        this.talkIndex += 1;
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
        this.sprite.x = this.x;
        this.sprite.y = this.y;
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
        if (this.hp <= 0) {
            return 0;
        };
        let width = this.scene.width;
        let s = this.hp / this.maxHp;
        let currentWidth = width * s;
        this.hpBar.width = currentWidth;
    }
    notifyChangeCard() {
        this.cardNum++;
        this.hp = this.maxHp;
        // 更换符卡
        // 播放符卡释放前特效
        this.state = this.STATE_CHARHE;
        this.clearScreenBullet();
    }
    notifyActive() {
        this.state = this.STATE_ATIVE;
        this.frame_count = 0;
    }
    die() {
        this.state = this.STATE_DIE;
        this.frame_count = 0;
        // console.log('die');
    }
    checkCollisionWithPlayer() {
        let player = this.scene.player;
        // 主角处于死亡状态就不检查了
        if (player.state == player.DIE_STATE ||
            this.state != this.STATE_ATIVE)
            return 0;

        let bullets = this.scene.playerBulletManager.objects;
        bullets.forEach((bullet) => {
            if (bullet.checkCollision(this)) {
                this.hp--;
            }
            if (this.hp <= 0 && this.num >= 0) {
                // 清空所有弹幕
                // 切换符卡
                this.notifyChangeCard();
            }
        });
    }
}
export default Boss;