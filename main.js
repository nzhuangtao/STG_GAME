import * as PIXI from 'pixi.js';
import { imageLoader, getImageByName } from './src/imageLoader';
import Game from './game';
let app = new PIXI.Application({ width: 480, height: 640 });
let stage = app.stage;
document.body.appendChild(app.view);

imageLoader();

PIXI.Assets.loadBundle('images')
    .then(() => {
        startGame();
    })
function startGame() {
    let game = new Game(stage, app.screen.width, app.screen.height);
    game.init();
    app.ticker.add((delta) => {
        game.update();
    });
}