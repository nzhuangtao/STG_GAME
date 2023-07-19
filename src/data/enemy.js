let enemy_params = [
   
]
for(let i=0;i<5;i++){
    let obj =  {
        count:(i+1)*60,
        x:640/2,
        y:0,
        type:1,
        runType:2,
        directionX:0,
        directionY:1,
    };
    enemy_params.push(obj)
};

let enemy_type = {
    1:{
        indexX:0,
        indexY:0,
        width:32,
        height:32,
        num:3,
    }
}
export {
    enemy_params,
    enemy_type
}