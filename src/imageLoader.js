import * as PIXI from 'pixi.js';
export function imageLoader(){
    let images = {
        player:'./images/player.png',
        enemy:'./images/enemy.png',
        bullet:'./images/bullet.png',
        mokou:"./images/mokou.png"
    };
    PIXI.Assets.addBundle('images', images);
}
export function getImageByName(name){
    return PIXI.utils.TextureCache[name];
}