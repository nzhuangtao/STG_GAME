import * as PIXI from 'pixi.js';
export function imageLoader(){
    let images = {
        player:'./images/player.png',
        enemy:'./images/enemy.png',
        bullet:'./images/bullet.png',
        mokou:"./images/mokou.png",
        stage1_bg:"./images/stage1_bg.jpg",
        leaf_blue:"./images/leaf_blue.png",
        leaf_yellow:"./images/leaf_yellow.png",
        orb_white:"./images/orb_white.png",
        orb_yellow:"./images/orb_yellow.png",
        mokou_stand:"./images/mokou_stand.png",
        reimu_stand:"./images/reimu_stand.png",
        spell_charge:"./images/spell_charge.png",
        marisa:"./images/marisa.png",
        marisa_stand:"./images/marisa_stand.png",
    };
    PIXI.Assets.addBundle('images', images);
}
export function getImageByName(name){
    return PIXI.Assets.get(name);
}