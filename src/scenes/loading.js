import { Assets, Container, Text, utils } from "pixi.js";
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
    bgms = {
        bgm: "./BGM/bgm.mp3",
        ending: "./BGM/ending.mp3",
        title: "./BGM/title.mp3"
    }
    constructor(game) {
        super(game);
        this.soundNum = 0;
        this.imageNum = 0;
        this.bgmNum = 0;
        this.layer = new Container();
        this.isLoaded = false;
        this.total = 28
        this.currentNum = null;
    }
    init() {
        this.loadSounds();
        this.loadBgms();
        this.loadImgs();
        let currentNum = this.imageNum + this.bgmNum + this.soundNum;
        this.text = new Text(currentNum + "/" + this.total);
        this.text.x = this.game.width / 2;
        this.text.y = this.game.height / 2;
        this.layer.addChild(this.text);
        this.game.stage.addChild(this.layer);
    }
    update() {
        console.log(this.imageNum);
    }
    draw() {
        let currentNum = this.imageNum + this.bgmNum + this.soundNum;
        this.text.text = currentNum + '/' + this.total;
        if (currentNum == this.total && !this.isLoaded) {
            this.start();
            this.isLoaded = true;
        };
    }
    start() {
        this.stage.removeChild(this.layer);
        this.game.changeScene(this.game.OPENING_SCENE);
    }
    loadImgs() {
        for (let key in this.images) {
            Assets.add(key, this.images[key]);
            Assets.load(key).then(() => { this.imageNum++ });
        }
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
    loadBgms() {
        for (var key in this.bgms) {
            this.game.bgms[key] = new Audio(this.bgms[key]);
            this.game.bgms[key].addEventListener('canplay', () => {
                this.bgmNum++;
            });
            this.game.bgms[key].load();
        };
    }
}
export default LoadingScene;