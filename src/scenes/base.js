class BaseScene{
    constructor(game){
        this.game = game;
        this.stage = game.stage;
        this.frame_count = 0;
    }
    init(){
        console.error("请重写此函数");
    }
    update(){
        this.frame_count ++;
    }
    draw(){
        console.error("请重写此函数");
    }
}
export default BaseScene;