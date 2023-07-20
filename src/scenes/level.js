
import * as PIXI from 'pixi.js';
import BaseScene from "./base";
import Player from "../object/player";
import PlayerBulletManager from "../manager/playerBullet";
import EnemyManager from "../manager/enemy";
import { enemy_list } from '../data/enemy';
class Level extends BaseScene {
    SHOT_STATE = 1; // 正在游戏
    PAUSE_STATE = 2; // 暂停游戏
    GAMEOVER_STATE = 3; // 游戏结束
    constructor(game) {
        super(game)
        this.score = 0;
        this.bomb = 0;
        this.state = this.SHOT_STATE;
        this.player = new Player(1, this);
        this.enemies = [];
        this.enemy_index = 0;
        this.enemy_list = enemy_list;
        this.playerBulletManager = new PlayerBulletManager(this);
        this.enemyManager = new EnemyManager(this);
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
    }
    update() {
        BaseScene.prototype.update.apply(this, arguments);
        this.player.update();
        this.playerBulletManager.update();
        this.enemyManager.update();
        // 检查是否需要生成敌人
        if (this.enemy_index < this.enemy_list.length) {
            for (let i = 0; i < enemy_list.length; i++) {
                let enemy = this.enemy_list[i];
                if (!enemy.isExist && enemy.count <= this.frame_count) {
                    // 标记为已生成
                    enemy.isExist = true;
                    this.enemyManager.create(enemy);
                    // 已生成敌人数目增加
                    this.enemy_index++;
                };
            }
        };

    }
    draw() {
        this.player.draw();
        this.playerBulletManager.draw();
        this.enemyManager.draw();
    }
}
export default Level;