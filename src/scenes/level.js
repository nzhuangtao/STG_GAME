
import * as PIXI from 'pixi.js';
import BaseScene from "./base";
import Player from "../object/player";
import PlayerBulletManager from "../manager/playerBullet";
import EnemyManager from "../manager/enemy";
import EnemyBulletManager from '../manager/enemyBullet';
import enemyList from '../config/enemy_config';
import EffectManager from '../manager/effect';
import { getImageByName } from '../imageLoader';
import Rumia from '../boss/boss_rumia';
import Mokou from '../boss/boss_mokou';
class Level extends BaseScene {
    READY_STATE = 0;
    ATIVE_STATE = 1; // 正在游戏
    PAUSE_STATE = 2; // 暂停游戏
    GAMEOVER_STATE = 3; // 游戏结束
    WIN_STATE = 4;
    WAIT_STATE = 5;

    SIDE_WIDTH = 200;

    BOSS_RUMIA = 1;
    BOSS_MOKOU = 2;
    BOSS_MARISA = 3;

    BOSS_NUM = 2;
    FPS = 1 / 60;

    constructor(game, width, height) {
        super(game);
        this.levelIndex = 1;
        this.score = 0;
        this.width = width - this.SIDE_WIDTH;
        this.height = height;
        this.state = 0;
        this.player = new Player(1, this);
        this.boss = null;
        this.enemyIndex = 0;
        this.enemyList = [];
        this.playerBulletManager = new PlayerBulletManager(this);
        this.enemyManager = new EnemyManager(this);
        this.enemyBulletManager = new EnemyBulletManager(this);

        this.effectLayer = new PIXI.Container();
        this.playerLayer = new PIXI.Container();
        this.stage.addChild(this.effectLayer);
        this.stage.addChild(this.playerLayer);

        this.frontBackground = null;
        this.backBackground = null;
        this.effectManager = new EffectManager(this);

        this.resultPanel = null;

        this.nextBtn = null;
        this.exitBtn = null;
        this.selectIndex = 0;
        this.isShowPanel = false;
        this.side = null;
        this.avatar = null;
        this.scoreSprite = null;
        this.bombSprite = null;
        this.hpSprite = null;
        this.playerIndex = 0;
        this.levelTitle = null;
        this.isHasLevelTitle = false;
    }
    init(playerIndex) {
        this.state = this.READY_STATE;
        this.score = 0;
        this.playerIndex = playerIndex;
        this.player.init(playerIndex);
        this.enemyList = enemyList;

        // 全部敌人设置为没有生成状态
        for (let i = 0; i < this.enemyList.length; i++) {
            let enemy = this.enemyList[i];
            enemy.isExist = false;
        };
        // 初始化boss
        this.initBoss();
        // 初始化背景
        this.initBackground();
        // 初始化侧边栏
        this.initSide();
        this.initResultPanel();
        this.initLevelTitle();
    }
    nextLevel() {
        this.clearLevel();
        this.loadLevel();
    }
    loadLevel() {
        this.player = new Player(1, this);
        this.effectLayer = new PIXI.Container();
        this.playerLayer = new PIXI.Container();
        this.stage.addChild(this.effectLayer);
        this.stage.addChild(this.playerLayer);
        this.init(this.playerIndex);
    }
    clearLevel() {
        this.playerLayer.destroy();
        this.effectLayer.destroy();
        this.resultPanel.destroy();
        this.nextBtn.destroy();
        this.exitBtn.destroy();

        this.isShowResult = false;
        this.playerLayer = null;
        this.effectLayer = null;
        this.player = null;
        this.boss = null;
        this.enemyManager.objects.clear();
        this.enemyBulletManager.objects.clear();
        this.playerBulletManager.objects.clear();
        this.effectManager.objects.clear();

        this.frontBackground = null;
        this.backBackground = null;
    }
    initBoss() {
        switch (this.levelIndex) {
            case this.BOSS_RUMIA:
                this.boss = new Rumia(this.BOSS_RUMIA, this);
                break;
            case this.BOSS_MOKOU:
                this.boss = new Mokou(this.BOSS_MOKOU, this);
                break;
            default:
                break;
        }
    }
    initBackground() {
        let bg = this.levelIndex > 1 ? 'bg2' : "bg1";
        let texture = getImageByName(bg);
        // 创建背景
        this.frontBackground = new PIXI.Sprite(texture);
        this.frontBackground.x = 0;
        this.frontBackground.y = 0;
        this.frontBackground.width = this.width;
        this.frontBackground.height = this.height;

        this.backBackground = new PIXI.Sprite(texture);
        this.backBackground.x = 0;
        this.backBackground.y = -this.height;
        this.backBackground.width = this.width;
        this.backBackground.height = this.height;

        this.effectLayer.addChild(this.frontBackground);
        this.effectLayer.addChild(this.backBackground);
    }
    initSide() {
        this.side = new PIXI.Graphics();
        this.side.beginFill(0x000, 1);
        this.side.drawRect(this.width, 0, this.SIDE_WIDTH, this.height);
        this.side.endFill();
        // 角色头像
        let avatar = this.player.image_1;
        this.avatar = PIXI.Sprite.from(avatar);
        this.avatar.x = this.game.width - this.avatar.width;
        this.avatar.y = 100;
        this.avatar.anchor.set(0.5);
        this.side.addChild(this.avatar);
        // 主角生命值
        let title = new PIXI.Text("生命", { fill: 0xffffff, fontSize: 14 });
        title.x = this.width + 10;
        title.y = 100 + this.avatar.height;
        this.side.addChild(title);
        this.hpSprite = new PIXI.Text(this.player.hp, { fill: 0xffffff, fontSize: 14 })
        this.hpSprite.x = this.width + 50;
        this.hpSprite.y = 100 + this.avatar.height;
        this.side.addChild(this.hpSprite);
        // 炸弹
        let bombTitle = new PIXI.Text('符卡', { fill: 0xffffff, fontSize: 14 });
        bombTitle.x = this.width + 10;
        bombTitle.y = 100 + this.avatar.height + 40;
        this.side.addChild(bombTitle);

        this.bombSprite = new PIXI.Text(0, { fill: 0xffffff, fontSize: 14 })
        this.bombSprite.x = this.width + 50;
        this.bombSprite.y = 100 + this.avatar.height + 40;
        this.side.addChild(this.bombSprite);
        // 分数
        let scoreTitle = new PIXI.Text('分数', { fill: 0xffffff, fontSize: 14 });
        scoreTitle.x = this.width + 10;
        scoreTitle.y = 100 + this.avatar.height + 80;
        this.scoreSprite = new PIXI.Text(this.score, { fill: 0xffffff, fontSize: 14 })
        this.scoreSprite.x = this.width + 50;
        this.scoreSprite.y = 100 + this.avatar.height + 80;
        this.side.addChild(scoreTitle);
        this.side.addChild(this.scoreSprite);

        this.stage.addChild(this.side);

    }
    initResultPanel() {
        this.resultPanel = new PIXI.Graphics();
        this.resultPanel.beginFill(0x000000, 0.8);
        this.resultPanel.drawRect(0, this.height / 2 - 120, this.width, 240);
        this.resultPanel.endFill();

        // 标题
        let title = new PIXI.Text("结果", { fill: 0xffffff });
        title.x = this.width / 2 - title.width / 2;
        title.y = this.resultPanel.height;
        this.resultPanel.addChild(title);
        // 总分
        let scoreTitle = new PIXI.Text("分数", { fill: 0xffffff });
        scoreTitle.x = this.resultPanel.width / 2 - 100;
        scoreTitle.y = this.resultPanel.height + 50;
        this.resultPanel.addChild(scoreTitle);

        let score = new PIXI.Text(this.score, { fill: 0xffffff });
        score.x = this.resultPanel.width / 2 + 50;
        score.y = this.resultPanel.height + 50;
        this.resultPanel.addChild(score);

        // 继续按钮
        this.nextBtn = new PIXI.Text("继续游戏", { fill: 0xffffff });
        this.nextBtn.x = this.resultPanel.width / 2 - this.nextBtn.width / 2;
        this.nextBtn.y = this.resultPanel.height + 100;
        // this.resultPanel.addChild(this.nextBtn);

        // 结束按钮
        this.exitBtn = new PIXI.Text("结束游戏", { fill: 0xffffff });
        this.exitBtn.x = this.resultPanel.width / 2 - this.exitBtn.width / 2;
        this.exitBtn.y = this.resultPanel.height + 150;
        this.resultPanel.addChild(this.exitBtn);

    }
    update() {
        this.drawBackground();
        if (this.state == this.READY_STATE) {
            this.showLevelTitle();
            return 0;
        };
        BaseScene.prototype.update.apply(this, arguments);
        if (this.state == this.WIN_STATE) {
            this.showGameWin();
            this.state = this.WAIT_STATE;
        };
        // if (this.state == this.WIN_STATE) {
        //     this.handleGameWin();
        //     this.updatePanel();
        // };

        // if (this.state == this.PAUSE_STATE && !this.isShowPanel) {
        //     this.showPause();
        //     this.isShowPanel = true;
        // };
        // if (this.state == this.PAUSE_STATE) {
        //     this.handleGamePause();
        //     this.updatePanel();
        // };

        // if (this.state == this.GAMEOVER_STATE) {
        //     this.showGameOver();
        // };
        // if (this.state == this.GAMEOVER_STATE) {
        //     this.handleGameover();
        // };

        if (this.state == this.ATIVE_STATE) {
            this.handleGameRun();
            this.updateSide();
        };
    }
    draw() {
        if (this.state == this.PAUSE_STATE)
            return 0;
        this.drawBackground();
        this.player.draw();
        this.playerBulletManager.draw();
        this.enemyManager.draw();
        this.enemyBulletManager.draw();
        this.boss.draw();
        this.effectManager.draw();
    }
    showCardName(){
        
        this.spellCardSprite = new Text("符卡名称", { fill: 0xffffff, fontSize: 24 });
        this.spellCardSprite.x = this.scene.width - this.spellCardSprite.width - 20;
        this.spellCardSprite.y = this.scene.height;
        this.scene.effectLayer.addChild(this.spellCardSprite);
    }
    handleGameRun() {
        this.effectManager.update();
        this.player.update();
        this.playerBulletManager.update();
        this.enemyManager.update();
        this.enemyBulletManager.update();

        // 检查是否需要生成敌人
        // if (this.enemyIndex < this.enemyList.length) {
        //     for (let i = 0; i < enemyList.length; i++) {
        //         let enemy = this.enemyList[i];
        //         if (!enemy.isExist && enemy.count <= this.frame_count) {
        //             // 标记为已生成
        //             enemy.isExist = true;
        //             this.enemyManager.create(enemy);
        //             // 已生成敌人数目增加
        //             this.enemyIndex++;
        //         };
        //     };
        //     if (this.enemy_index == this.enemyList.length) {
        //         this.frame_count = 0;
        //     };
        // };
        if (!this.boss.isExist) {
            this.boss.init();
            this.frame_count = 0;
        } else {
            this.boss.updateHp();
            this.boss.update();
        };
        // console.log("特效数目"+this.effectManager.objects.size);
        // console.log("敌人数目:" + this.enemyManager.objects.size);
        // console.log("子弹数目:" + this.enemyBulletManager.objects.size);
        this.player.checkCollisionWithEnemy();
        this.playerBulletManager.checkCollisonWithEnemy();
        //this.enemyBulletManager.checkCollisonWithPlayer();
        this.boss.checkCollisionWithPlayer();
    }
    drawBackground() {
        if (this.frontBackground.y >= this.height) {
            this.frontBackground.y = -this.height;
        };
        if (this.backBackground.y >= this.height) {
            this.backBackground.y = -this.height;
        };
        this.frontBackground.y += 2;
        this.backBackground.y += 2;
    }
    handleGameWin() {

        if (this.frame_count % 5 != 0)
            return 0;
        let isHasNextBtn = this.isHasNextLevel();
        if (this.game.input.iskeyDown(this.game.input.BUTTON_Z)) {
            if (this.selectIndex == 0) {
                if (isHasNextBtn) {
                    this.nextLevel();
                } else {
                    console.log('回到主界面')
                }
            } else {
                console.log('回到主界面')
            }
        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_UP)) {
            if (!isHasNextBtn)
                return 0;
            this.selectIndex--;
            if (this.selectIndex < 0) {
                this.selectIndex = 1;
            };
        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_DOWN)) {
            if (!isHasNextBtn)
                return 0;
            this.selectIndex++;
            if (this.selectIndex > 1) {
                this.selectIndex = 0;
            };
        };
    }
    handleGamePause() {
        if (this.frame_count % 5 != 0)
            return 0;
        if (this.game.input.iskeyDown(this.game.input.BUTTON_Z)) {
            if (this.selectIndex == 0) {
                this.closePanel();
                this.state = this.ATIVE_STATE;
            } else {
                console.log('回到主界面')
            }
        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_UP)) {
            this.selectIndex--;
            if (this.selectIndex < 0) {
                this.selectIndex = 1;
            };
        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_DOWN)) {
            this.selectIndex++;
            if (this.selectIndex > 1) {
                this.selectIndex = 0;
            };
        };
    }
    handleGameover() {
        if (this.frame_count % 5 != 0)
            return 0;
        if (this.game.input.iskeyDown(this.game.input.BUTTON_Z)) {
            if (this.selectIndex == 0) {
                // this.state = this.ATIVE_STATE;
                console.log("重新开始")
            } else {
                console.log('回到主界面')
            }
        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_UP)) {
            this.selectIndex--;
            if (this.selectIndex < 0) {
                this.selectIndex = 1;
            };
        };
        if (this.game.input.iskeyDown(this.game.input.BUTTON_DOWN)) {
            this.selectIndex++;
            if (this.selectIndex > 1) {
                this.selectIndex = 0;
            };
        };
    }
    updateSide() {
        this.hpSprite.text = this.player.hp;
        this.scoreSprite.text = this.score;
    }
    closePanel() {
        this.playerLayer.removeChild(this.resultPanel);
    }
    isHasNextLevel() {
        return this.BOSS_NUM > this.levelIndex;
    }
    initLevelTitle() {
        this.levelTitle = new PIXI.Container();
        let bg = new PIXI.Graphics();
        bg.beginFill(0x000000, 0.8);
        bg.drawRect(15, this.height / 2 - 120, this.width - 30, 240);
        bg.endFill();
        let title = new PIXI.Text("第一章", { fill: 0xffffff, fontSize: 20 });
        title.x = this.width / 2 - title.width / 2;
        title.y = this.height / 2 - 100;
        let subTitle = new PIXI.Text("梦幻夜行绘卷 宵暗的妖怪", { fill: 0xffffff, fontSize: 16 });
        subTitle.x = this.width / 2 - subTitle.width / 2;
        subTitle.y = this.height / 2;
        this.levelTitle.addChild(bg);
        this.levelTitle.addChild(title);
        this.levelTitle.addChild(subTitle);
    }
    showLevelTitle() {
        if (this.isHasLevelTitle) {
            if (this.levelTitle.alpha > 0) {
                if (this.frame_count % 10 == 0) {
                    this.levelTitle.alpha -= 0.01;
                };
            } else {
                this.state = this.ATIVE_STATE;
                this.playerLayer.removeChild(this.levelTitle);
            };
        } else {
            this.playerLayer.addChild(this.levelTitle);
            this.isHasLevelTitle = true;
        }
    }
    showGameOver() {
        this.isShowResult = true;
        this.nextBtn.text = "重新开始";
        this.resultPanel.addChild(this.nextBtn);
        this.playerLayer.addChild(this.resultPanel);
    }
    showGameWin() {
        if (this.levelIndex < this.BOSS_NUM) {
            this.nextBtn.text = "下一关";
            this.exitBtn.x = this.resultPanel.width / 2 - this.exitBtn.width / 2;
            this.exitBtn.y = this.resultPanel.height + 150;
            this.resultPanel.addChild(this.nextBtn);
        } else {
            this.exitBtn.alpha = 1;
            this.exitBtn.x = this.resultPanel.width / 2 - this.exitBtn.width / 2;
            this.exitBtn.y = this.resultPanel.height + 100;
        };
        this.playerLayer.addChild(this.resultPanel);
    }
    showPause() {
        this.isShowResult = true;
        this.nextBtn.text = "继续游戏";
        this.resultPanel.addChild(this.nextBtn);
        this.playerLayer.addChild(this.resultPanel);
    }
    notifyGameWin() {
        this.state = this.WIN_STATE;
    }
    notifyGameover() {
        this.state = this.GAMEOVER_STATE;
    }
    updatePanel() {
        if (this.isHasNextLevel()) {
            if (this.selectIndex == 0) {
                this.nextBtn.alpha = 1;
                this.exitBtn.alpha = 0.5;
            } else {
                this.exitBtn.alpha = 1;
                this.nextBtn.alpha = 0.5;
            }
        };
    }
    addScore(score) {
        this.score += score;
    }
}
export default Level;