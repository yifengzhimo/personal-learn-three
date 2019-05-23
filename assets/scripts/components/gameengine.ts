import * as OrbitControls from 'three-orbitcontrols';
import * as THREE from 'three'
// import {OrbitControls} from '@kibou/three-orbitcontrols-ts';
// import {OrbitControls} from 'three-orbitcontrols-ts'
// import OrbitControlsLibrary = require('three-orbit-controls');
// import * as OrbitControlsFunction from 'threse-orbit-controls';

// const OrbitControls = OrbitControlsFunction(THREE);

// var OrbitControls = OrbitControlsLibrary(THREE);

// import 'three/examples/js/controls/OrbitControls'
// import THREE from '../3rd-party/three'

export class GameEngine {
    private _canvas: HTMLDivElement;
    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;
    private _light: THREE.DirectionalLight;
    private _controls: OrbitControls;

    private static _instance: GameEngine;

    private constructor() {

    }

    public static getInstance(): GameEngine {
        if (!GameEngine._instance)
            GameEngine._instance = new GameEngine();

        return GameEngine._instance;
    }

    public init(canvasId: string): this {
        this._canvas = document.getElementById(canvasId) as HTMLDivElement;
        return this;
    }

    public buildScene(): this {

        this._scene = new THREE.Scene();
        return this;
    }

    public buildLight(): this {
        this._light = new THREE.DirectionalLight(0xffeedd);
        this._light.position.set(0, 0, 1).normalize();

        if (this._scene)
            this._scene.add(this._light);

        return this;
    }

    public buildCamera(): this {
        this._camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight,
            1, 200000
        );
        this._camera.position.x = 1500000;
        this._camera.position.y = 1500000;
        this._camera.position.z = 1500000;

        return this;
    }

    public buildRenderer(): this {
        this._renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        this._renderer.setClearColor(0xeeeeee);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        // this._renderer.shadowMapEnabled = true;

        this._canvas.append(this._renderer.domElement);
        this._renderer.render(this._scene, this._camera);

        return this;
    }

    public buildControls(): this {

        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
        this._controls.enabled = true;
        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.25;
        this._controls.enableZoom = true;
        this._controls.maxDistance = 150000;
        this._controls.minDistance = 0;
        this._controls.maxPolarAngle = Math.PI * 2;


        return this;
    }

    public setCamera(pos: THREE.Vector3, /*direction: THREE.Vector3*/): this {
        if (!pos) {
            this._camera.position.x = pos.x;
            this._camera.position.y = pos.y;
            this._camera.position.z = pos.z;
        }

        
            
        // if (direction != null)
        //     this._camera.lookAt(direction);
        this._camera.lookAt(this._scene.position);

        return this;
    }

    public addObject3D(obj: THREE.Object3D): this {

        this._scene.add(obj);

        return this;
    }

    public addObject3DGroup(objs: THREE.Object3D[]): this {

        objs.forEach((obj)=>{
            this._scene.add(obj);
        });
        return this;
    }

    public removeObject3DById(id: number): this {
        let obj = this._scene.getObjectById(id);
        this._scene.remove(obj);

        return this;
    }

    public openAxis(length: number): this {

        let axis = new THREE.AxesHelper(length);
        this._scene.add(axis);
        return this;
    }

    public end(): void {
        this._canvas.append(this._renderer.domElement);
        this._renderer.render(this._scene, this._camera);
    }

    public renderScene = () => {
        // requestAnimationFrame(this.renderScene);
        this._renderer.render(this._scene, this._camera);
        this._controls.update();
    }
}

