import * as PIXI from 'pixi.js';
export function imageLoader() {
    let images = {
        title_bg: "./images/title_bg.png",
        bg1: "./images/bg1.jpg",
        bg2: "./images/bg2.jpg",
        reimu: './images/reimu.png',
        reimu_1: "./images/reimu_1.png",
        reimu_stand: "./images/reimu_stand.png",
        marisa: "./images/marisa.png",
        marisa_1: "./images/marisa_1.png",
        marisa_stand: "./images/marisa_stand.png",
        rumia: "./images/rumia.png",
        rumia_stand: "./images/rumia_stand.png",
        mokou: "./images/mokou.png",
        mokou_stand: "./images/mokou_stand.png",
        sysimg_01: "./images/sysimg_01.png",
        shock_wave: "./images/shockwave.png",
        enemy: './images/enemy.png',
        bullet: './images/bullet.png',
        beam:"./images/beam.png"
    };
    PIXI.Assets.addBundle('images', images);
};
export function getImageByName(name) {
    return PIXI.Assets.get(name);
};