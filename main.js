import * as PIXI from 'pixi.js';
import { imageLoader, getImageByName } from './src/imageLoader';
import Game from './game';
let app = new PIXI.Application({ width: 640, height: 480 });
let stage = app.stage;
document.body.appendChild(app.view);

imageLoader();

PIXI.Assets.loadBundle('images')
    .then((assets) => {
        //startGame();
        let player = getImageByName('player');
        console.log(player);
        let sprite = new PIXI.Sprite(player);
        stage.addChild(sprite);

        let texture = getImageByName("player");
        let rectangle = new PIXI.Rectangle(0, 0, 32, 32);
        texture.frame = rectangle;
        let sprite2 = new PIXI.Sprite(texture);
        sprite2.x = 100;
        sprite2.y = 100;
        stage.addChild(sprite2);
    })
// function startGame() {
//     let game = new Game(stage);
//     game.init();
//     app.ticker.add((delta)=>{
//         game.update();
//     });
// }