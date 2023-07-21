import * as PIXI from 'pixi.js';
import { imageLoader, getImageByName } from './src/imageLoader';
import Game from './game';
let app = new PIXI.Application({ width: 480, height: 640 });
let stage = app.stage;
document.body.appendChild(app.view);

imageLoader();

PIXI.Assets.loadBundle('images')
    .then((assets) => {
        // let texture = getImageByName("mokou_stand");
        // let preview = new PIXI.Sprite(texture);
        // preview.x = 0;
        // stage.addChild(preview);
        // setTimeout(()=>{
        //     let _texture = getImageByName("reimu_stand");
        //     preview.texture = _texture;
        // },1000)
        startGame();
    })
function startGame() {
    let game = new Game(stage,app.screen.width,app.screen.height);
    game.init();
    app.ticker.add((delta)=>{
        game.update();
    });
}