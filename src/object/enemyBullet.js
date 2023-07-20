import BaseObject from "./object";

class EnemyBullet extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.speed = 10;
    }
    init(params) {
        this.moveType = params.moveType||1;
        this.x = params.x;
        this.y = params.y;
        this.image = 'bullet';
        this.angle = params.angle;
        this.indexX = params.indexX;
        this.indexY = params.indexY;
        this.spriteWidth = params.width;
        this.spriteHeight = params.height;
        this.speed = params.speed;
        this.aimed = false;
        BaseObject.prototype.init.apply(this, arguments);
    }
    runWay() {
        switch (this.moveType) {
            case 1:
                this.linearMove();
                break;
            case 2:
                this.scattering();
                break;
            case 3:
                // 环形转瞄准
                this.ringToAimed()
                break;
            case 4:
                // 
                this.curve();
                break;
            default:
                break;
        }
    }
    update() {
        BaseObject.prototype.update.apply(this,arguments)
        this.runWay()
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    curve(){
        // 每十帧减去2度
        //console.log(1);
        //this.angle += 2;
        if(this.speed <= 50){
            this.speed += 1;
        }
        this.x += this.speed *(1/30) * Math.cos(this.toRadian(this.angle));
        this.y += this.speed *(1/30) * Math.sin(this.toRadian(this.angle));
    }
    removeOutOfStage(){
        if (this.y < 0) {
            this.remove();
        };
    }
    linearMove(){
        this.y += this.speed;
    }
    // 散射
    scattering(){
        //console.log('发射散弹');
        let speedStep = 1;
        this.x += this.speed * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * Math.sin(this.toRadian(this.angle));
        
        if(this.frame_count%10 === 0){
            this.speed -= speedStep;
        };
        if(this.speed == 0){
            this.speed = 10;
        };
    }
    // 瞄准玩家的子弹
    aimedPlayerBullet(){
        let player = this.scene.player;
    }
    ringToAimed(){ 
        if(!this.aimed && this.frame_count>1*60){
            this.inAimed();
        };
        this.scattering();
    }
    draw() {
        BaseObject.prototype.draw.apply(this, arguments);
    }
    // 瞄准状态
    inAimed(){
        let player = this.scene.player;
        let ax = player.x - this.x;
        let ay = player.y - this.y;
        this.aimed = true;
        this.angle = this.toAngle(Math.atan2(ay, ax));  
    }
    remove(){
        let index = this.scene.bullets.findIndex((b) => {
            return b.id == this.id;
        });
        this.scene.game.stage.removeChild(this.sprite);
        this.scene.bullets.splice(index, 1);
        delete this;
    }
    handleCollision(obj){
        if(this.checkCollision(obj)){
            this.remove();
            obj.handleCollision();
        };
    }
}
export default EnemyBullet;