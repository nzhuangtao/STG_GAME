import Level from "./src/scenes/level";
import Input from "./src/input";
import OpenScene from "./src/scenes/openScene";
class Game{
    LOAD_SCENE = 1;
    OPENING_SCENE = 2;
    SELECT_SCENE = 3;
    GAME_SCENE = 4;
    constructor(stage,width,height){
        this.stage = stage;
        this.width = width;
        this.height = height;
        this.scenes = {};
        this.input = new Input();
    }
    init(){
        this.input.bindKey();
        this.addScene(this.OPENING_SCENE,new OpenScene(this));
        this.addScene(this.GAME_SCENE,new Level(this,this.width,this.height));
        this.changeScene(this.OPENING_SCENE);
    }
    addScene(sceneName,scene){
        this.scenes[sceneName] = scene;
    }
    changeScene(sceneName){
     
        this.activeScene = sceneName;
        this.scenes[sceneName].init();
    }
    update(){
        this.scenes[this.activeScene].update();
        this.scenes[this.activeScene].draw();
    }
}
export default Game;