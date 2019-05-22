import * as THREE from 'three'

export class Border3D {

    private _extrudePath: THREE.CatmullRomCurve3;

    constructor(pnts: THREE.Vector3[]) {
        var pnt0 = pnts[0];
        var pnte = pnts[pnts.length-1];

        if (pnt0.sub(pnte).length() > 1)
            pnts.push(pnt0);

        this._extrudePath = new THREE.CatmullRomCurve3(pnts, false, "catmullrom");
    }

    public ToMesh(): THREE.Mesh {

        let geo = new THREE.TubeBufferGeometry(this._extrudePath, 12, 25, 1, true);
        let mat = new THREE.MeshLambertMaterial( { color: 0xFF0000, wireframe: false } );

        return new THREE.Mesh(geo, mat);

        // return null;
    }

}