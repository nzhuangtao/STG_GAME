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
        this.enemy_params = enemy_params;
        this.boss_params = boss_params;
        this.enemy_index = 0;
        this.player_bullets = [];
        this.enemy_bullets = [];
        this.boss = new Boss(1,this);
        this.bg1 = null;
        this.bg2 = null;
    }
    init(){
        this.state = this.SHOT_STATE;
        this.score = 0;
        this.bomb = 2;
        this.showBackground();
        this.player.init();
    }
    update(){
        BaseScene.prototype.update.apply(this, arguments);
        this.player.update();
    }
    draw(){
        this.player.draw();
        // if(this.bg1.y<=-480){
        //     this.bg1.y = 480;
        // }
        // if(this.bg2.y <= -480){
        //     this.bg2.y = -480;
        // }
        // this.bg1.y -=2;
        // this.bg2.y -=2;
    }
    showBackground(){
        let texture = getImageByName('stage1_bg');
        console.log(texture)
        let sprite1 = new PIXI.Sprite(texture);
        let sprite2 = new PIXI.Sprite(texture);
        this.bg1 = sprite1;
        this.bg2 = sprite2;
        sprite1.width = 640;
        sprite1.height = 480;
        sprite2.width = 640;
        sprite2.height = 480;
        sprite1.x = 0;
        sprite1.y = 0;
        sprite2.x = 0;
        sprite2.y = 480;
        this.game.stage.addChild(sprite1);
        this.game.stage.addChild(sprite2);
    }
}
export default Level;