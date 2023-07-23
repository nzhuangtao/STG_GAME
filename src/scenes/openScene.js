import { Container, Sprite,Text } from "pixi.js";
import BaseScene from "./base";

class OpenScene extends BaseScene{
    constructor(game){
        super(game);
        this.layer = new Container();
    }
    init(){
        this.drawBackground();
        this.drawStartBtn();
        this.stage.addChild(this.layer);
    }
    update(){   
        if (this.game.input.iskeyDown(this.game.input.BUTTON_Z)) {
            this.stage.removeChild(this.layer);
            this.game.changeScene(this.game.GAME_SCENE);
        };
    }
    draw(){
        
    }
    drawBackground(){
        let sprite = Sprite.from("open_bg");
        sprite.width = this.game.width;
        sprite.height = this.game.height;
        this.layer.addChild(sprite);
    }
    drawTitle(){

    }
    drawStartBtn(){
        this.start = new Text("开始游戏", { fill: 0x000000,fontSize:30});
        this.start.x = this.game.width - this.start.width/2-100;
        this.start.y = 100;
        this.layer.addChild(this.start);
    }
}
export default OpenScene;