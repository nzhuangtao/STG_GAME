import BaseObject from "./object";

import boss_params from "../data/boss";
import bullet_type from "../data/bullet";
import EnemyBullet from "./enemyBullet";
class Boss extends BaseObject{
    constructor(id,scene){
        super(id,scene);
        this.state = 0;
        this.hp = 100;
        this.bulletIndex = 0;
        this.bulletType = bullet_type[2];
    }
    init(){
        this.image = 'mokou';
        this.indexX = 0;
        this.indexY = 0;
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.x = 640/2;
        this.y = 0+this.spriteHeight/2;
        this.spellCard = [];
        BaseObject.prototype.init.apply(this, arguments);
    }
    update(){
        
        BaseObject.prototype.update.apply(this, arguments);
       
        if(this.frame_count % 60 == 0){
         
            this.shot();
        };
    }
    draw(){
        // BaseObject.prototype.draw.apply(this, arguments);
    }
    shot(){
        // 计算与玩家之间的夹角
        // let player = this.scene.player;
        // var playerangle = Math.atan2(this.y - player.y, this.x - player.x) * 180 / Math.PI;
        let bullet = new EnemyBullet(this.bulletIndex,this.scene);
        let params = {
            x:this.x,
            y:this.y,
            width:this.bulletType.width,
            height:this.bulletType.height,
            indexX:this.bulletType.indexX,
            indexY:this.bulletType.indexY
        }
        bullet.init(params);
    }
    handleCollision(){
        
    }
}
export default Boss;