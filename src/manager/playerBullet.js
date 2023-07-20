
import PlayerBullet from "../object/playerBullet";
import BaseManager from "./base";

class PlayerBulletManager extends BaseManager {
    constructor(scene) {
        super(scene)
        this.bulletIndex = 0;
    }
    create() {
        let bullet = new PlayerBullet(this.bulletIndex,this.scene);
        bullet.init();
        this.objects.set(this.bulletIndex,bullet);
        this.bulletIndex++;
    }
    update(){
        this.objects.forEach((bullet)=>{
            bullet.update();
        });
    }
    draw(){
        this.objects.forEach((bullet)=>{
            bullet.draw();
        });
    }
}
export default PlayerBulletManager;