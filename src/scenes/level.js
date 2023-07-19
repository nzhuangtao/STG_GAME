import BaseScene from "./base";
import * as PIXI from 'pixi.js'
import Player from "../object/player";
import { enemy_params } from "../data/enemy";
import boss_params from "../data/boss";
import Enemy from "../object/enemy";
import Boss from "../object/boss";
import { getImageByName } from "../imageLoader";
class Level extends BaseScene{
    SHOT_STATE = 1;
    PAUSE_STATE = 2;
    GAMEOVER_STATE = 3;
    constructor(game){
        super(game)
        this.score = 0;
        this.bomb = 0;
        this.state = this.SHOT_STATE;
        this.player = new Player(1,this);
        this.enemies = [];
        this.enemy_index = 0;
        this.bullets = [];
        this.bossIndex=0;
        this.boss = new Boss(this.bossIndex,this);
    }
    init(){
        this.state = this.SHOT_STATE;
        this.score = 0;
        this.bomb = 2;
        this.player.init();
        this.boss.init();
    }
    update(){
        BaseScene.prototype.update.apply(this, arguments);
        this.player.update();
        this.bulletUpdate();
    }
    bulletUpdate(){
        for(let i=0;i<this.bullets.length;i++){
            this.bullets[i].update();
            this.bullets[i].removeOutOfStage();
        };
        for(let i=0;i<this.bullets.length;i++){
            this.bullets[i].handleCollision(this.boss);
        };
    }
    draw(){
        this.player.draw();
        for(let i=0;i<this.bullets.length;i++){
            this.bullets[i].draw();
        };
    }
}
export default Level;