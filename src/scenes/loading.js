import { Assets, Text } from "pixi.js";
import BaseScene from "./base";

class LoadingScene extends BaseScene {
    images = {
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
    };
    sounds = {
        shot: "./SE/shot.wav",
        select: './SE/select.wav',
        powerup: "./SE/powerup.wav",
        graze: "./SE/graze.wav",
        enemy_vanish: "./SE/enemy_vanish.wav",
        enemy_powereffect: "./SE/enemy_powereffect.wav",
        enemy_damage: "./SE/enemy_damage.wav",
        dead: "./SE/dead.wav"
    }
    BGM = {
        bgm: "./BGM/bgm.mp3",
        ending: "./BGM/ending.mp3",
        title: "./BGM/title.mp3"
    }
    constructor(game) {
        super(game);
        this.soundNum = 0;
        this.imageNum = 0;
        this.bgmNum = 0;
        this.layer = null;
        this.isLoaded = false;
    }
    init() {
        this.loadSounds();
        this.loadBgm();
        this.loadImgs();
    }
    update() {
        if (this.bgmNum + this.soundNum + this.imageNum > 10 && !this.isLoaded) {
            this.start();
            this.isLoaded = true;
        };
    }
    async loadImgs() {
        await Assets.addBundle('images', this.images);
        this.imageNum = 1;
    }
    start() {
        Assets.loadBundle('images').then((res) => {
            this.game.changeScene(this.game.OPENING_SCENE);
        });
    }
    loadSounds() {
        for (let key in this.sounds) {
            this.game.sounds[key] = new Audio(this.sounds[key]);
            this.game.sounds[key].addEventListener('canplay', () => {
                this.soundNum++;
            });
            this.game.sounds[key].load();
        };
    }
    loadBgm() {
        for (var key in this.BGM) {
            this.game.bgms[key] = new Audio(this.BGM[key]);
            this.game.bgms[key].addEventListener('canplay', () => {
                this.bgmNum++;
            });
            this.game.bgms[key].load();
        };
    }
}
export default LoadingScene;