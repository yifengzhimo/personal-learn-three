import * as THREE from 'three'

export class Build3D {

    private _shape: THREE.Shape;
    private _name: string;
    private _levels: number;

    private _extrudePath: THREE.CatmullRomCurve3;

    constructor(pnts: THREE.Vector2[], name: string, levels: number) {
        var pnt0 = pnts[0];
        var pnte = pnts[pnts.length-1];

        if (pnt0.sub(pnte).length() > 1)
            pnts.push(pnt0);
        
        this._shape = new THREE.Shape(pnts);
        this._name = name;
        this._levels = levels;


        let pps: THREE.Vector3[] = [];
        pps.push(new THREE.Vector3(0, 0, 0));
        pps.push(new THREE.Vector3(0, 0, this._levels * 3000));

        this._extrudePath = new THREE.CatmullRomCurve3(pps, false, "catmullrom");
        // this._extrudePath.closed = false;
    }

    public ToMesh(): THREE.Mesh {

        var options = {
            curveSegments: 3,
            steps: 1,
            depth: 0.5,
            bevelEnabled: false,
            bevelThickness: 2,
            bevelSize: 0.5,
            bevelSegments: 12,
            // extrudePath: this._extrudePath
        };

        let geo = new THREE.ExtrudeBufferGeometry(this._shape, {
            depth: this._levels * 3000,
            bevelEnabled: false
        });

        let mat = new THREE.MeshLambertMaterial( { color: 0xb00000, wireframe: false } );

        return new THREE.Mesh(geo, mat);
        // return null;
    }

}