import * as THREE from 'three'

export class Basement3D {

    private _extrudePath: THREE.CatmullRomCurve3;
    private _points: THREE.Vector3[];

    private static _index: number = 0;

    constructor(pnts: THREE.Vector3[]) {

        this._points = pnts;

        
    }

    public ToMesh(): THREE.Mesh {

        this._extrudePath = new THREE.CatmullRomCurve3(this._points, true);
        Basement3D._index += 1;

        let geo = new THREE.TubeBufferGeometry(this._extrudePath, 
            this._points.length, 2500, 8, true);
        let mat = new THREE.MeshLambertMaterial( { color: 0x000000, wireframe: false, transparent: false } );

        return new THREE.Mesh(geo, mat);

        // return null;
    }

}