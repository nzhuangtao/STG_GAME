import BaseObject from "./object";

class EnemyBullet extends BaseObject {
    constructor(id, scene) {
        super(id, scene);
        this.speed = 10;
    }
    init(params) {
        this.params = params;
        this.moveType = params.moveType || 1;
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
        this.a = params.a || 1;
        this.maxA = params.maxSpeed || 300;
        this.leafTurnNum = 0;// 叶子型运动中需要转一次向
        BaseObject.prototype.init.apply(this, arguments);
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
                this.Leaf();
            default:
                break;
        }
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments)
        this.run()
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    curve() {
        if (this.speed <= 50) {
            this.speed += 1;
        }
        this.x += this.speed * (1 / 30) * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * (1 / 30) * Math.sin(this.toRadian(this.angle));
    }
    Leaf() {
        if (this.frame_count >= 200 && this.leafTurnNum == 0) {
            console.log('转向');
            this.leafTurnNum++;
            // this.angle -= 90;
        };
        this.x += this.speed * (1 / 60) * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * (1 / 60) * Math.sin(this.toRadian(this.angle));
    }
    removeOutOfStage() {
        if (this.y < 0) {
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
        BaseObject.prototype.draw.apply(this, arguments);
    }
    // 瞄准状态
    inAimed() {
        let player = this.scene.player;
        let ax = player.x - this.x;
        let ay = player.y - this.y;
        this.aimed = true;
        this.angle = this.toAngle(Math.atan2(ay, ax));
    }
    remove() {
        let index = this.scene.bullets.findIndex((b) => {
            return b.id == this.id;
        });
        this.scene.game.stage.removeChild(this.sprite);
        this.scene.bullets.splice(index, 1);
        delete this;
    }
    handleCollision(obj) {
        if (this.checkCollision(obj)) {
            this.remove();
            obj.handleCollision();
        };
    }
}
export default EnemyBullet;