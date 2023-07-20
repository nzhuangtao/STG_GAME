import Enemy from "../object/enemy";
import BaseManager from "./base";
import { enemy_type } from "../data/enemy";
class EnemyManager extends BaseManager{
    constructor(scene){
        super(scene)
        this.enemyIndex = 0;
    }
    create(params){
        let enemy = new Enemy(this.enemyIndex,this.scene);
        let enemyType = enemy_type[params.type];
        enemy.init({
            indexX:enemyType.indexX,
            indexY:enemyType.indexY,
            width:enemyType.width,
            height:enemyType.height,
            num:enemyType.num,
            x:params.x,
            y:params.y,
            moveType:params.moveType, // 运动方式
            bullets:params.bullets,
        });
        this.objects.set(this.enemyIndex,enemy);
        this.enemyIndex++;
    }
    update(){
        this.objects.forEach((enemy)=>{
            if(enemy.outOfStage()){
                this.objects.delete(enemy.id);
            };
        });
        // console.log("数目："+this.objects.size);
        this.objects.forEach((enemy)=>{
            enemy.update();
        });
    }
    draw(){
        this.objects.forEach((enemy)=>{
            enemy.draw();
        });
    }
    getSize(){
        return this.objects.size;
    }
}
export default EnemyManager;