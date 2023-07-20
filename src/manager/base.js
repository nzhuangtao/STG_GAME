class BaseManager{
    constructor(scene){
        this.scene = scene;
        this.objects = new Map();
        this.frame_count = 0;
    }
    init(){
        this.frame_count = 0;
    }
    create(params){
       
    }
    update(){

    }
    draw(){

    }
}
export default BaseManager;