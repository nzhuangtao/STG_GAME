import Input from "./src/input";
import OpenScene from "./src/scenes/openScene";
import SelectScene from "./src/scenes/selectScene";
import Level from "./src/scenes/level";
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
        this.activeScene = 0;
        this.input = new Input();
        this.playerIndex = 0;
    }
    init(){
        this.input.bindKey();
        this.addScene(this.OPENING_SCENE,new OpenScene(this));
        this.addScene(this.SELECT_SCENE,new SelectScene(this));
        this.addScene(this.GAME_SCENE,new Level(this,this.width,this.height));
        this.changeScene(this.OPENING_SCENE);
    }
    addScene(sceneName,scene){
        this.scenes[sceneName] = scene;
    }
    changeScene(sceneName){
        this.activeScene = sceneName;
        this.scenes[sceneName].init(this.playerIndex);
    }
    update(){
        this.scenes[this.activeScene].update();
        this.scenes[this.activeScene].draw();
    }
    setPlayerIndex(index){
        this.playerIndex = index;  
    }
}
export default Game;