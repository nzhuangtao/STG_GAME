function shotLeftLeaf() {
    for (let i = 0; i < 5; i++) {
        for (var j = 0; j < 12; j++) {
            let params = {
                x: this.x,
                y: this.y,
                moveType: 5,
                speed: ((5 - i) * 30) + 10,
                angle: (120 + j * 10),
                indexX: 0,
                indexY: 0,
                width: 32,
                height: 32,
                delay: 200,
                image: 'leaf_yellow'
            }
            this.scene.enemyBulletManager.create(params);
        }
    }
}
function shotRightLeaf() {
    for (let i = 0; i < 5; i++) {
        for (var j = 0; j < 12; j++) {
            let params = {
                x: this.x,
                y: this.y,
                moveType: 5,
                speed: i * 30 + 50,
                angle: 180 - (120 + j * 10),
                indexX: 0,
                indexY: 0,
                width: 32,
                height: 32,
                image: 'leaf_blue'
            }
            this.scene.enemyBulletManager.create(params);
        }
    }
}
function tripleorbs() {
    let player = this.scene.player;
    let ax = player.x - this.x;
    let ay = player.y - this.y;
    let angle = this.toAngle(Math.atan2(ay, ax));
    for (let i = 0; i < 9; i++) {
        for (var j = 0; j < 3; j++) {
            let params = {
                x: this.x,
                y: this.y,
                moveType: 2,
                speed: i * 10 + 100,
                angle: angle + j * 10,
                indexX: 2,
                indexY: 2,
                width: 16,
                height: 16,
            };
            this.scene.enemyBulletManager.create(params);
        }
    }
}
function leafTwoDelay() {
    for (let i = 0; i < 4; i++) {
        let params1 = {
            x: this.x,
            y: this.y,
            moveType: 6,
            speed: 100,
            angle: this.frame_count + i * 90,
            indexX: 0,
            indexY: 0,
            width: 32,
            height: 32,
            image: "leaf_yellow",
            turn_angle: 270
        };
        this.scene.enemyBulletManager.create(params1);
        let params2 = {
            x: this.x,
            y: this.y,
            moveType: 6,
            speed: 100,
            angle: i * 90 - this.frame_count,
            indexX: 0,
            indexY: 0,
            width: 32,
            height: 32,
            turn_angle: 90,
            image: "leaf_yellow"
        };
        this.scene.enemyBulletManager.create(params2);
    }
}
function shotCircle() {
    for (var i = 0; i < 30; i++) {
        let params1 = {
            x: this.x,
            y: this.y,
            moveType: 2,
            speed: 120,
            angle: i * 12,
            indexX: 3,
            indexY: 3,
            width: 16,
            height: 16,
        };
        this.scene.enemyBulletManager.create(params1);
        let params2 = {
            x: this.x,
            y: this.y,
            moveType: 2,
            speed: 100,
            angle: i * 12,
            indexX: 3,
            indexY: 3,
            width: 16,
            height: 16,
        };
        this.scene.enemyBulletManager.create(params2);
    }
}
function shotSpawner() {
    let params1 = {
        x: this.x,
        y: this.y,
        moveType: 7,
        speed: 100,
        angle: 45,
        indexX: 0,
        indexY: 0,
        width: 32,
        height: 32,
        image: "orb_white",
    };
    this.scene.enemyBulletManager.create(params1);
    let params2 = {
        x: this.x,
        y: this.y,
        moveType: 7,
        speed: 100,
        angle: 135,
        indexX: 0,
        indexY: 0,
        width: 32,
        height: 32,
        image: "orb_white",
    };
    this.scene.enemyBulletManager.create(params2);
}
function shotSpirals() {
    for (var i = 0; i < 5; i++) {
        let params1 = {
            x: this.x,
            y: this.y,
            moveType: 8,
            speed: 100,
            angle: i * 72 + this.frame_count,
            indexX: 3,
            indexY: 4,
            width: 16,
            height: 16,

        };
        this.scene.enemyBulletManager.create(params1);
        // let params2 = {
        //     x: this.x,
        //     y: this.y,
        //     moveType: 2,
        //     speed: 100,
        //     angle: i * 72 - this.frame_count,
        //     indexX: 5,
        //     indexY: 4,
        //     width: 16,
        //     height: 16,
        // };
        // this.scene.enemyBulletManager.create(params2);
    }
}