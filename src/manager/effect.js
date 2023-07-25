
import Effect from "../object/effect";
import BaseManager from "./base";

class EffectManager extends BaseManager {
    constructor(scene) {
        super(scene)
        this.effectIndex = 0;
    }
    create() {
        let effect = new Effect(this.effectIndex, this.scene);
        this.objects.set(this.effectIndex, effect);
        effect.init();
        this.effectIndex++;
        return effect;
    }
    update() {

        this.objects.forEach((effect) => {
            effect.update();
        });
    }
    draw() {
        this.objects.forEach((effect) => {
            effect.draw();
        });
    }
}
export default EffectManager;