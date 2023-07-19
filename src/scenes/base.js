class BaseScene{
    constructor(game){
        this.game = game;
        this.stage = game.stage;
        this.frame_count = 0;
    }
    init(){
        
    }
    update(){
        this.frame_count ++;
    }
    draw(){}
}
export default BaseScene;