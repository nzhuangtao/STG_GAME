import * as PIXI from 'pixi.js';
export function imageLoader(){
    let images = {
        "open_bg":"./images/open_bg.jpg",
        player:'./images/player.png',
        enemy:'./images/enemy.png',
        bullet:'./images/bullet.png',
        mokou:"./images/mokou.png",
        stage1_bg:"./images/stage1_bg.jpg",
        rumia:"./images/rumia.png",
        rumia_stand:"./images/rumia_stand.png",
        mokou_stand:"./images/mokou_stand.png",
        reimu_stand:"./images/reimu_stand.png",
        marisa:"./images/marisa.png",
        marisa_stand:"./images/marisa_stand.png",
    };
    PIXI.Assets.addBundle('images', images);
}
export function getImageByName(name){
    return PIXI.Assets.get(name);
}