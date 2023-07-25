import BaseObject from "./object";

class EnemyBullet extends BaseObject {

    FPS = 1 / 60
    constructor(id, scene) {
        super(id, scene);
        this.speed = 10;
        this.threeStageState = 0;
        this.starSpeed = 0;
        this.circleSpeed = 0;
    }
    init(params) {
        this.index = params.index || 0;
        this.x = params.x;
        this.y = params.y;
        this.scale = params.scale || 1;
        this.turn = params.turn || 0;
        this.angle = params.angle;
        this.indexX = params.indexX;
        this.indexY = params.indexY;
        this.a = params.a || 0;
        this.spriteWidth = params.width;
        this.spriteHeight = params.height;
        this.speed = params.speed;
        this.moveType = params.moveType || 1;
        this.aimed = false;
        this.image = params.image || 'bullet';
        BaseObject.prototype.init.apply(this, arguments);
    }
    move() {

        switch (this.moveType) {
            case 1:
                this.linearBullet();
                break;

            default:
                break;
        }
    }
    update() {
        BaseObject.prototype.update.apply(this, arguments)
        this.move();
        this.removeOutOfStage();
    }
    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        //this.sprite.rotation = this.toRadian(this.turn);
    }
    remove() {
        this.scene.playerLayer.removeChild(this.sprite);
        this.scene.enemyBulletManager.objects.delete(this.id);
        delete this;
    }
    aimedPlayer() {
        let player = this.scene.player;
        let ax = player.x - this.x;
        let ay = player.y - this.y;
        let angle = this.toAngle(Math.atan2(ay, ax));
        return angle;
    }
    linearBullet() {
        this.speed += this.a;
        this.x += this.speed * Math.cos(this.toRadian(this.angle)) * this.scene.FPS;
        this.y += this.speed * Math.sin(this.toRadian(this.angle)) * this.scene.FPS;
    }
    removeOutOfStage() {
        if (this.outOfStage()) {
            this.remove();
        };
    }
    moonBeam() {
        // if (this.frame_count > 100) {
        //     if (this.index % 2 == 0) {
        //         this.turn--;
        //     } else {
        //         this.turn++;
        //     };
        // }
    }
    triSpin() {
        if (this.frame_count < 50) {
            this.starSpeed += 2;
        } else {
            this.angle += 2;
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
                    angle: this.angle - 90,
                    speed: 200,
                    indexX: this.indexX,
                    indexY: this.indexY,
                    width: 16,
                    height: 16,
                    moveType: 10,
                };

                this.scene.enemyBulletManager.create(params2);
                let params3 = {
                    x: this.x,
                    y: this.y,
                    angle: this.angle,
                    speed: 200,
                    indexX: this.indexX,
                    indexY: this.indexY,
                    width: 16,
                    height: 16,
                    moveType: 10,
                };

                this.scene.enemyBulletManager.create(params3);
            }
        }
        this.x = this.scene.boss.x + Math.cos(this.toRadian(this.angle)) * this.starSpeed;
        this.y = this.scene.boss.y + Math.sin(this.toRadian(this.angle)) * this.starSpeed;
    }
    curve() {
        if (this.speed <= 50) {
            this.speed += 1;
        }
        this.x += this.speed * (1 / 30) * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * (1 / 30) * Math.sin(this.toRadian(this.angle));
    }
    // 魔理沙一阶段
    starSpin() {
        if (this.frame_count < 50) {
            this.starSpeed += 2;
        } else {
            this.angle += 2;
            if (this.frame_count >= 1000) {
                this.frame_count = 50;
            };
            if (this.frame_count % 20 == 0) {
                let params1 = {
                    x: this.x,
                    y: this.y,
                    angle: this.angle + 90,
                    speed: 200,
                    indexX: this.indexX,
                    indexY: this.indexY + 7,
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
                    indexY: this.indexY + 7,
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
                    indexY: this.indexY + 7,
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
                    indexY: this.indexY + 7,
                    width: 16,
                    height: 16,
                    moveType: 10,
                    index: this.params.index,
                }
                this.scene.enemyBulletManager.create(params4);
            }
        };
        // 围绕自己中心转动
        if (this.frame_count % 2 == 0) {
            this.x = this.scene.boss.x + Math.cos(this.toRadian(this.angle)) * this.starSpeed;
            this.y = this.scene.boss.y + Math.sin(this.toRadian(this.angle)) * this.starSpeed;
        };
    }
    twistSpawner() {
        this.x = this.scene.boss.x + Math.cos(this.toRadian(this.angle)) * this.speed;
        this.y = this.scene.boss.y + Math.sin(this.toRadian(this.angle)) * this.speed;

        if (this.frame_count < 60) {
            this.angle -= 3 - Math.abs((30 - this.frame_count) / 30) * 3;
            this.speed += 2 * (80 - this.frame_count) / 60 + 0.5
        }
        else if (this.frame_count < 300) {
            if (this.frame_count < 100) {
                if (this.frame_count % 10 == 0) {
                    let params = {
                        x: this.x,
                        y: this.y,
                        angle: this.angle + Math.random() * 180,
                        speed: 0,
                        indexX: this.indexX,
                        indexY: this.indexY,
                        width: 16,
                        height: 16,
                        moveType: 14,
                    }
                    this.scene.enemyBulletManager.create(params);
                };
                this.speed += 0.1;
                this.angle -= 2;
            } else {
                if (this.frame_count % 10 == 0) {
                    let params = {
                        x: this.x,
                        y: this.y,
                        angle: this.angle + Math.random() * 180,
                        speed: 0,
                        indexX: this.indexX,
                        indexY: this.indexY,
                        width: 16,
                        height: 16,
                        moveType: 14,
                    }
                    this.scene.enemyBulletManager.create(params);
                };
                this.speed += 1;
                this.angle += 2;
            }
        }
        else if (this.frame_count < 600) {
            if (this.frame_count % 6 == 0) {
                for (let i = 0; i < 3; i++) {
                    let params = {
                        x: this.x,
                        y: this.y,
                        angle: this.angle + 10 * i + 90,
                        speed: 200 + 10 * i,
                        indexX: this.indexX,
                        indexY: this.indexY,
                        width: 16,
                        height: 16,
                        moveType: 10,
                    };
                    this.scene.enemyBulletManager.create(params);
                }
            }
            this.angle -= 1;
        }
        else if (this.frame_count < 1000) {
            if (this.frame_count % 10 == 0) {
                let params = {
                    x: this.x,
                    y: this.y,
                    angle: this.angle,
                    speed: 0,
                    indexX: 3,
                    indexY: 3,
                    width: 16,
                    height: 16,
                    moveType: 15,
                };
                this.scene.enemyBulletManager.create(params);
            }
            this.angle -= 1;
            this.speed -= 1;
        } else if (this.frame_count < 1100) {
            this.angle -= 0.4;
            this.speed += 3;
        }
        else if (this.frame_count < 1400) {
            if (this.frame_count % 12 == 0) {
                let params = {
                    x: this.x,
                    y: this.y,
                    angle: this.angle,
                    speed: 0,
                    indexX: 3,
                    indexY: 3,
                    width: 16,
                    height: 16,
                    moveType: 15,
                };
                this.scene.enemyBulletManager.create(params);
            }
            this.angle += 0.4;
            this.speed -= 1.4;
        } else {
            this.frame_count = 0;
        }
    }
    twistStar() {
        if (this.frame_count == 400) {
            this.angle += 180;
        } else if (this.frame_count > 400) {
            this.speed = 2;
        }
        this.x += this.speed * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * Math.sin(this.toRadian(this.angle));
    }
    star() {
        if (this.frame_count % 5 == 0) {

            if (this.params.index) {
                if (this.params.index % 2 == 0) {
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
    starSpanBig() {
        if (this.frame_count % 5 == 0) {
            this.angle += 2;
        };
        this.x += this.speed * this.scene.FPS * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * this.scene.FPS * Math.sin(this.toRadian(this.angle));
    }
    twistDelay() {
        if (this.frame_count > 300) {
            this.speed = 100;
        }
        if (this.frame_count == 200) {
            // this.speed = Math.min((this.frame_count-200)/100, 1)*2
            this.angle -= 20;
        };
        this.turn += 3 / 2;
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
    // 散射
    scattering() {
        this.x += this.speed * this.FPS * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * this.FPS * Math.sin(this.toRadian(this.angle));
        if (this.speed < this.maxSpeed) {
            this.speed += this.a;
        }
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
    darkSpell() {
        if (
            this.frame_count < 100 &&
            this.speed > 0 &&
            this.frame_count % 2 == 0) {
            this.speed -= 5;
        };
        // if (this.frame_count > 200) {
        //     if (this.index % 2 == 0) {
        //         this.speed = 200;
        //     } else {
        //         this.speed = 210;
        //     }
        // };
        if (this.speed == 0) {
            if (!this.r) {
                this.r = (this.y - this.scene.boss.y) / Math.sin(this.toRadian(this.angle));
            };
            if (this.frame_count % 2 == 0) {

                if (this.index % 2 == 0) {
                    this.angle++;
                } else {
                    this.angle--;
                }
            }
            this.x = this.scene.boss.x + Math.cos(this.toRadian(this.angle)) * this.r;
            this.y = this.scene.boss.y + Math.sin(this.toRadian(this.angle)) * this.r;
            return 0;
        };
        this.x += this.speed * this.FPS * Math.cos(this.toRadian(this.angle));
        this.y += this.speed * this.FPS * Math.sin(this.toRadian(this.angle));
    }
}
export default EnemyBullet;