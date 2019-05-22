import * as THREE from 'three'

export class GameEngine {
    private _canvas: HTMLDivElement;
    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;

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

    public buildCamera(): this {
        this._camera = new THREE.PerspectiveCamera(
            45, window.innerWidth / window.innerHeight,
            0.1, 1000
        );
        return this;
    }

    public buildRenderer(): this {
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setClearColor(0xeeeeee);
        this._renderer.setSize(window.innerWidth, window.innerHeight);

        return this;
    }

    public setCamera(pos: THREE.Vector3, /*direction: THREE.Vector3*/): this {
        if (pos != null) {
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

    public renderScene(): void {
        
        this._renderer.render(this._scene, this._camera);
    }
}

