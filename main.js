import * as PIXI from 'pixi.js';
import Game from './game';
import { imageLoader } from './src/imageLoader';

let app = new PIXI.Application({ width: 680, height: 640 });
app.renderer.backgroundColor = 0xffffff;
document.body.appendChild(app.view);

imageLoader();

PIXI.Assets.loadBundle('images')
    .then(() => {
        startGame();
    })
function startGame() {
    let stage = app.stage;
    let game = new Game(stage, app.screen.width, app.screen.height);
    game.init();
    app.ticker.add((delta) => {
        game.update();
    });
}