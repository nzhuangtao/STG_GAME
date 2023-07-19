import * as PIXI from 'pixi.js';
import { imageLoader, getImageByName } from './src/imageLoader';
import Game from './game';
let app = new PIXI.Application({ width: 640, height: 480 });
let stage = app.stage;
document.body.appendChild(app.view);

imageLoader();

PIXI.Assets.loadBundle('images')
    .then((assets) => {
        startGame();
    })
function startGame() {
    let game = new Game(stage);
    game.init();
    app.ticker.add((delta)=>{
        game.update();
    });
}