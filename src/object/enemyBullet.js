import BaseObject from "./object";

class EnemyBullet extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.speed = 10;
        this.threeStageState = 0;
    }
    init(params) {
        this.params = params;
       
        this.moveType = params.moveType || 1;
        this.x = params.x;
        this.y = params.y;
        this.turn_angle = params.turn_angle || 0;
        this.angle = params.angle;
        this.indexX = params.indexX;
        this.indexY = params.indexY;
        this.spriteWidth = params.width;
        this.spriteHeight = params.height;
        this.speed = params.speed;
        this.aimed = false;
        this.a = params.a || 1;
        this.maxA = params.maxSpeed || 300;
        this.leafTurnNum = 0; // 叶子型运动中需要转一次向
        this.leafDelayState = 0;
        this.image = params.image || 'bullet';
        BaseObject.prototype.init.apply(this, arguments);
        this.sprite.rotation = this.toRadian(this.angle - 90);
        //this.sprite.scale = [0.5,0.5]; 
    }
    run() {
        switch (this.moveType) {
            case 1:
                // 直线运动
                this.linearMove();
                break;
            case 2:
                // 按照某个角度进行运动
                this.scattering();
                break;
            case 3:
                // 环形
                // this.scattering()
                break;
            case 4:
                // 曲线弹
                this.curve();
                break;
            case 5:
                // boss1 的 leaf
                this.leaf();
                break;
            case 6:
                this.shotLeafTwoDelay();
                break;
            case 7:
                this.shotSpawner();
                break;
            case 8:
                this.shotThreeStage();
                break;
            case 9:
                this.starSpin();
                break;
            case 10:
                this.star();
                break;
            default:
                break;
        }
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments)
        this.run();
        this.removeOutOfStage();
    }
    remove() {
        console.log("删除");
        this.scene.playerLayer.removeChild(this.sprite);
        this.scene.enemyBulletManager.objects.delete(this.id);
        delete this;
    }
    curve() {
        if (this.speed <= 50) {
            this.speed += 1;
        }
        this.x += this.speed * (1 / 30) * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * (1 / 30) * Math.sin(this.toRadian(this.angle));
    }
    starSpin() {
        if (this.frame_count % 2 == 0) {
            this.angle -= 2;
            this.x = this.scene.boss.x + Math.cos(this.toRadian(this.angle))*100;
            this.y = this.scene.boss.y + Math.sin(this.toRadian(this.angle))*100;
        };
        if (this.frame_count % 10 == 0) {
            let params1 = {
                x: this.x,
                y: this.y,
                angle: this.angle + 90,
                speed: 200,
                indexX: this.indexX,
                indexY: this.indexY,
                width: 16,
                height: 16,
                moveType: 10,
            };

            this.scene.enemyBulletManager.create(params1);
            let params2 = {
                x: this.x,
                y: this.y,
                angle: this.angle,
                speed: 200,
                indexX: this.indexX,
                indexY: this.indexY,
                width: 16,
                height: 16,
                moveType: 10,
            }
            this.scene.enemyBulletManager.create(params2);
            let params3 = {
                x: this.x,
                y: this.y,
                angle: this.angle,
                speed: 250,
                indexX: this.indexX,
                indexY: this.indexY,
                width: 16,
                height: 16,
                moveType: 10,
            }
            this.scene.enemyBulletManager.create(params3);
           
            let params4 = {
                x: this.x,
                y: this.y,
                angle: this.angle,
                speed: 250,
                indexX: this.indexX,
                indexY: this.indexY,
                width: 16,
                height: 16,
                moveType: 10,
                index:this.params.index,
            }
            this.scene.enemyBulletManager.create(params4);
        }
    }
    star() {
        if (this.frame_count % 5 == 0) {
            
            if(this.params.index){
                if(this.params.index % 2 == 0) {
                    this.angle -= 3;
                } else {
                    this.angle += 3;
                }
            } else {
                this.angle += 2;
            }
        };
        this.x += this.speed * this.scene.FPS * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * this.scene.FPS * Math.sin(this.toRadian(this.angle));
    }
    leaf() {
        if (this.frame_count < 10) {
            this.speed -= 1;
            if (this.speed <= 0) {
                this.speed = 0;
            }
        };
        if (this.frame_count >= 200 && this.leafTurnNum == 0) {
            this.leafTurnNum++;
            if (this.angle >= 90) {
                this.angle -= 90;
            } else {
                this.angle += 90;
            }
        };
        this.x += this.speed * (1 / 60) * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * (1 / 60) * Math.sin(this.toRadian(this.angle));
    }
    removeOutOfStage() {
        if (this.outOfStage()) {
            this.remove();
        };
    }
    linearMove() {
        this.y += this.speed * (1 / 60);
        if (this.speed <= this.maxSpeed) {
            this.speed += this.a;
        };
    }
    // 散射
    scattering() {
        this.x += this.speed * this.FPS * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * this.FPS * Math.sin(this.toRadian(this.angle));
        if (this.speed < this.maxSpeed) {
            this.speed += this.a;
        }
    }
    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.rotation = this.toRadian(this.angle - 90);
        // BaseObject.prototype.draw.apply(this, arguments);
    }
    // 瞄准状态
    inAimed() {
        let player = this.scene.player;
        let ax = player.x - this.x;
        let ay = player.y - this.y;
        this.aimed = true;
        this.angle = this.toAngle(Math.atan2(ay, ax));
    }
    handleCollision(obj) {
        if (this.checkCollision(obj)) {
            this.remove();
            obj.handleCollision();
        };
    }
    shotLeafTwoDelay() {
        if (this.leafDelayState == 0) {
            if (this.speed >= 10) {
                this.speed -= 0.5;
            } else {
                this.leafDelayState = 1;
                this.speed = 0;
                this.frame_count = 0;
            }
        } else if (this.frame_count >= 100 && this.leafDelayState == 1) {
            // console.log("状态2");
            this.speed = 150;
            // console.log(this.turn_angle)
            this.angle += this.turn_angle;
            this.leafDelayState = 2;
        } else if (this.leafDelayState == 2) {
            if (this.speed >= 10) {
                this.speed -= 0.5;
            } else {
                this.leafDelayState = 3;
                this.speed = 0;
                this.frame_count = 0;
            }
        } else if (this.leafDelayState == 3 && this.frame_count >= 100) {
            this.speed = 150;
            this.angle += this.turn_angle;
            this.leafDelayState = 4;
        }
        this.x += this.speed * this.FPS * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * this.FPS * Math.sin(this.toRadian(this.angle));
    }
    shotSpawner() {
        if (this.frame_count > 100 && this.frame_count < 180) {
            this.speed = 0;
            this.scene.enemyBulletManager.create({
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: 100,
                angle: Math.random() * 360,
                indexX: 3,
                indexY: 3,
                width: 16,
                height: 16,
            });
        };
        if (this.frame_count > 180) {
            this.remove();
        }
        this.x += this.speed * this.FPS * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * this.FPS * Math.sin(this.toRadian(this.angle));
    }
    shotThreeStage() {
        if (this.threeStageState == 0) {
            if (this.speed > 10) {
                this.speed--;
            } else {
                this.threeStageState = 1;
                this.frame_count = 0;
                this.speed = 0;
            }
        } else if (this.threeStageState == 1 && this.frame_count > 30) {
            this.speed = 100;
            this.angle += 90;
            this.threeStageState = 2;
            this.frame_count = 0;
            this.sprite.scale.set(1.5, 1.5);
        } else if (this.threeStageState == 2) {
            if (this.speed > 10) {
                this.speed--;
            } else {
                this.threeStageState = 3;
                this.frame_count = 0;
                this.sprite.scale.set(1, 1);
                this.speed = 0;
            }
        } else if (this.threeStageState == 3 && this.frame_count > 30) {
            for (let i = 0; i < 2; i++) {
                this.scene.enemyBulletManager.create({
                    x: this.x,
                    y: this.y,
                    moveType: 2,
                    speed: 90 + i * 10,
                    angle: this.angle + 90,
                    indexX: 4,
                    indexY: 3,
                    width: 16,
                    height: 16,
                });
            };
            this.remove();
        }
        this.x += this.speed * this.FPS * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * this.FPS * Math.sin(this.toRadian(this.angle));
    }
}
export default EnemyBullet;