import { Sprite, Container, Graphics } from "pixi.js";
import BaseScene from "./base";

class SelectScene extends BaseScene {
    REIMU_INDEX = 0;
    MARISA_INDEX = 1;
    constructor(game) {
        super(game);
        this.layer = new Container();
        this.reimuSprite = null;
        this.marisaSprite = null;
        this.selectIndex = 0;
    }
    init() {
        this.initMarisa();
        this.initReimu();
        this.game.stage.addChild(this.layer);
    }
    update() {
        this.frame_count++;
        if (this.frame_count < 20)
            return 0;
        if (this.frame_count % 8 == 0) {
            if (this.game.input.iskeyDown(this.game.input.BUTTON_Z)) {
                this.game.stage.removeChild(this.layer);
                this.game.setPlayerIndex(this.selectIndex);
                this.game.changeScene(this.game.GAME_SCENE);
            };
            if (this.game.input.iskeyDown(this.game.input.BUTTON_LEFT)) {
                if (this.selectIndex < 0) {
                    this.selectIndex = 1;
                } else {
                    this.selectIndex--;
                };
            };
            if (this.game.input.iskeyDown(this.game.input.BUTTON_RIGHT)) {
                if (this.selectIndex > 1) {
                    this.selectIndex = 0;
                } else {
                    this.selectIndex++;
                };
            };
        }
    }
    draw() {
        if (this.selectIndex == this.REIMU_INDEX) {
            this.marisaSprite.alpha = 0.5;
            this.reimuSprite.alpha = 1;
        };
        if (this.selectIndex == this.MARISA_INDEX) {
            this.reimuSprite.alpha = 0.5;
            this.marisaSprite.alpha = 1;
        }
    }
    initReimu() {
        this.reimuSprite = Sprite.from("reimu_stand");
        this.reimuSprite.x = -50;
        this.reimuSprite.y = 50;
        this.layer.addChild(this.reimuSprite);
    }
    initMarisa() {
        this.marisaSprite = Sprite.from('marisa_stand');
        this.marisaSprite.x = this.game.width - this.marisaSprite.width;
        this.marisaSprite.y = 50;
        this.marisaSprite.alpha = 0.5;
        this.layer.addChild(this.marisaSprite);
    }
}
export default SelectScene;