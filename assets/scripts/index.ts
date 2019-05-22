import * as THREE from 'three'

import {GameEngine} from '../scripts/components/gameengine'
import {ObjectUtils} from '../scripts/components/objectutls'

import {JsonHelper} from '../scripts/io/jsonhelper'

class Game {

    constructor() {
        GameEngine.getInstance()
            .init("renderCanvas")
            .buildScene()
            .buildLight()
            .buildCamera()
            .buildRenderer()
            .buildControls()
            // .setCamera(new THREE.Vector3(-30, 40, 30))
            // .openAxis(20)
            // .addObject3DGroup(ObjectUtils.rndGenerate())
            .end();
        JsonHelper.read("assets/data/filestreamservice.json"); 
        
    }

    public run(): void {
        // this.renderScene();
        
    }

    public renderScene(): void {
        requestAnimationFrame(this.renderScene);
        GameEngine.getInstance()
            .renderScene();
    }
}

let renderScene = () => {
    requestAnimationFrame(renderScene);
    GameEngine.getInstance()
            .renderScene();
};


let game = new Game();
// game.run();
renderScene();