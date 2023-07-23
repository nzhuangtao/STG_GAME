
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
        this.state = this.SHOT_STATE;
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
        this.isShowResult = false;
    }
    init() {
        this.state = this.ATIVE_STATE;
        this.score = 0;
        this.player.init();
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
        // 初始化显示结果面板
        this.initResultPanel();
    }
    nextLevel() {
        this.levelIndex++;
        if (this.levelIndex > 2) {
            this.levelIndex = 2;
        };
        this.clearLevel();
        this.loadLevel();
    }
    loadLevel() {
        this.player = new Player(1, this);
        this.effectLayer = new PIXI.Container();
        this.playerLayer = new PIXI.Container();
        this.stage.addChild(this.effectLayer);
        this.stage.addChild(this.playerLayer);
        this.init();
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

        let texture = getImageByName("stage1_bg");
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
        BaseScene.prototype.update.apply(this, arguments);
        this.drawBackground();
        if (this.state == this.WIN_STATE && !this.isShowResult) {
            this.showGameWin();
            this.isShowResult = true;
        };
        if (this.state == this.WIN_STATE) {
            this.handleGameWin();
            this.updatePanel();
            return 0;
        };

        if (this.state == this.PAUSE_STATE && !this.isShowResult) {
            this.showPause();
        };
        if (this.state == this.PAUSE_STATE) {
            this.handleGamePause();
            this.updatePanel();
            return 0;
        };

        if (this.state == this.GAMEOVER_STATE && !this.isShowResult) {
            this.showGameOver();
        };
        if (this.state == this.GAMEOVER_STATE) {
            this.handleGameover();
            this.updatePanel();
            return 0;
        };

        if (this.state == this.ATIVE_STATE) {
            this.handleGameRun();
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
    handleGameRun() {
        this.effectManager.update();
        this.player.update();
        this.playerBulletManager.update();
        this.enemyManager.update();
        this.enemyBulletManager.update();
        if (!this.boss.isExist) {
            this.boss.init();
        } else {
            this.boss.updateHp();
            this.boss.update();
        };
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
        //     }
        //     if (this.enemy_index == this.enemyList.length) {
        //         this.frame_count = 0;
        //     }
        // };
        //console.log("敌人数目:" + this.enemyManager.objects.size);
        //console.log("子弹数目:" + this.enemyBulletManager.objects.size);
        //this.player.checkCollisionWithEnemy();
        this.playerBulletManager.checkCollisonWithEnemy();
        this.enemyBulletManager.checkCollisonWithPlayer();
        this.boss.checkCollisionWithPlayer();
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
    closePanel() {
        this.playerLayer.removeChild(this.resultPanel);
    }
    isHasNextLevel() {
        return this.BOSS_NUM > this.levelIndex;
    }
    showGameOver() {
        this.isShowResult = true;
        this.nextBtn.text = "重新开始";
        this.resultPanel.addChild(this.nextBtn);
        this.playerLayer.addChild(this.resultPanel);
    }
    showGameWin() {
        this.isShowResult = true;
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
    getGameWinEvent() {
        this.state = this.GAMEWIN_STATE;
    }
    getGameOverEvent() {
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
}
export default Level;