let enemy_list = [
   
]
for(let i=0;i<5;i++){
    let enemy =  {
        count:(i+1)*30,
        x:(i+1)*30,
        y:0,
        type:1,
        moveType:5, 
    };
    enemy_list.push(enemy)
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
    enemy_list,
    enemy_type
}