
import * as PIXI from 'pixi.js';
import BaseScene from "./base";
import Player from "../object/player";
import PlayerBulletManager from "../manager/playerBullet";
import EnemyManager from "../manager/enemy";
import EnemyBulletManager from '../manager/enemyBullet';
import Boss from '../object/boss';
import { enemy_list } from '../data/enemy';
import EffectManager from '../manager/effect';
import Marisa from '../boss/boss_marisa';
class Level extends BaseScene {
    SHOT_STATE = 1; // 正在游戏
    PAUSE_STATE = 2; // 暂停游戏
    GAMEOVER_STATE = 3; // 游戏结束
    TALK_STATE = 4; // 正在对话

    BOSS_MARISA = 0;
    BOSS_MOKOU = 1;
    FPS = 1 / 60;
    constructor(game, width, height) {
        super(game)
        this.score = 0;
        this.bomb = 0;
        this.width = width;
        this.height = height;
        this.state = this.SHOT_STATE;
        this.player = new Player(1, this);
        this.enemies = [];
        this.enemy_index = 0;
        this.enemy_list = enemy_list;
        this.playerBulletManager = new PlayerBulletManager(this);
        this.enemyManager = new EnemyManager(this);
        this.enemyBulletManager = new EnemyBulletManager(this);
        this.effectLayer = new PIXI.Container();
        this.playerLayer = new PIXI.Container();
        this.stage.addChild(this.effectLayer);
        this.stage.addChild(this.playerLayer);
        this.bossIndex = 0;

        this.isBossExist = false;
        this.effectManager = new EffectManager(this);
    }
    init() {
        this.state = this.SHOT_STATE;
        this.score = 0;
        this.bomb = 2;
        this.player.init();
        // 全部敌人设置为没有生成状态
        for (let i = 0; i < enemy_list.length; i++) {
            let enemy = this.enemy_list[i];
            enemy.isExist = false;
        };
        // 初始化boss
        switch (this.bossIndex) {
            case this.BOSS_MARISA:
                this.boss = new Marisa(this.bossIndex, this);
                break;
            case this.BOSS_MOKOU:
                console.log('创建妹红');
                break;
            default:
                break;
        }
    }
    update() {
        BaseScene.prototype.update.apply(this, arguments);

        this.effectManager.update();
        this.player.update();
        this.playerBulletManager.update();
        this.enemyManager.update();
        this.enemyBulletManager.update();
        // 检查是否需要生成敌人
        // if (this.enemy_index < this.enemy_list.length) {
        //     for (let i = 0; i < enemy_list.length; i++) {
        //         let enemy = this.enemy_list[i];
        //         if (!enemy.isExist && enemy.count <= this.frame_count) {
        //             // 标记为已生成
        //             enemy.isExist = true;
        //             this.enemyManager.create(enemy);
        //             // 已生成敌人数目增加
        //             this.enemy_index++;
        //         };
        //     }
        //     if (this.enemy_index == this.enemy_list.length) {
        //         this.frame_count = 0;
        //     }
        // };
        if (
            !this.isBossExist &&
            this.enemyManager.objects.size <= 0) {

                this.boss.init();
                this.isBossExist = true;
        };
        if (this.isBossExist) {
            this.boss.update();
        };
        //console.log("敌人数目:" + this.enemyManager.objects.size);
        //console.log("子弹数目:" + this.enemyBulletManager.objects.size);
        this.playerBulletManager.checkCollisonWithEnemy();
        this.boss.checkCollisionWithPlayer();
        //this.enemyBulletManager.checkCollisonWithPlayer();
    }
    draw() {
        this.player.draw();
        this.playerBulletManager.draw();
        this.enemyManager.draw();
        this.enemyBulletManager.draw();

        if (this.isBossExist) {
            this.boss.draw();
        };

        this.effectManager.draw();
    }
}
export default Level;