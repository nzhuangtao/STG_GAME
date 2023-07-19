import BaseScene from "./base";
import Player from "../object/player";
import { enemy_params } from "../data/enemy";
import boss_params from "../data/boss";
import Enemy from "../object/enemy";
import Boss from "../object/boss";
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
    }
    init(){
        this.state = this.SHOT_STATE;
        this.score = 0;
        this.bomb = 2;
        //this.player.init();
        this.boss.init(boss_params[1]);
    }
    update(){
        BaseScene.prototype.update.apply(this, arguments);
    }
    draw(){
        this.boss.draw();
    }
}
export default Level;