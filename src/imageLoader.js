import * as PIXI from 'pixi.js';
export function imageLoader(){
    let images = {
        player:'./images/player.png',
        enemy:'./images/enemy.png',
        bullet:'./images/bullet.png',
        mokou:"./images/mokou.png",
        stage1_bg:"./images/stage1_bg.jpg"
    };
    PIXI.Assets.addBundle('images', images);
}
export function getImageByName(name){
    return PIXI.Assets.get(name);
}