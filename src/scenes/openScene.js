import { Container, Sprite, Text } from "pixi.js";
import BaseScene from "./base";

class OpenScene extends BaseScene {
    constructor(game) {
        super(game);
        this.layer = new Container();
        this.layer.alpha = 0;
    }
    init() {
        this.drawBackground();
        this.drawStartBtn();
        this.game.stage.addChild(this.layer);
    }
    update() {
        this.frame_count++;
        if (this.game.input.iskeyDown(this.game.input.BUTTON_Z)) {
            this.game.stage.removeChild(this.layer);
            this.game.changeScene(this.game.SELECT_SCENE);
        };
    }
    draw() {
        if (this.layer.alpha != 1 &&
            this.frame_count % 2 == 0) {
            this.layer.alpha += 0.05;
        };
    }
    drawBackground() {
        let sprite = Sprite.from("title_bg");
        sprite.x = 0;
        sprite.y = 0;
        sprite.scale.set(0.5);
        this.layer.addChild(sprite);
    }
    drawStartBtn() {
        this.start = new Text("开始游戏", { fill: 0x000000, fontSize: 24 });
        this.start.x = 100;
        this.start.y = this.game.height / 2;
        this.layer.addChild(this.start);
    }
}
export default OpenScene;