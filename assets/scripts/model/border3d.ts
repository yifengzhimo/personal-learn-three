import * as THREE from 'three'

export class Border3D {

    private _extrudePath: THREE.CatmullRomCurve3;
    private _points: THREE.Vector3[];
    private static _index: number = 0;

    constructor(pnts: THREE.Vector3[]) {
        // var pnt0 = pnts[0];
        // var pnte = pnts[pnts.length-1];

        // if (pnt0.sub(pnte).length() > 1)
        //     pnts.push(pnt0);
        this._points = pnts;
        
    }

    public ToMesh(): THREE.Object3D {

        let obj = new THREE.Object3D();
        let mat = new THREE.MeshLambertMaterial( { color: 0xFF0000, wireframe: false, transparent: false } );

        // this._points.forEach((v)=>{
        //     let sphere = new THREE.SphereBufferGeometry(2500);
        //     let smesh = new THREE.Mesh(sphere, mat);
        //     smesh.position.copy(v);
        //     obj.add(smesh);
        // });

        this._extrudePath = new THREE.CatmullRomCurve3(this._points, true);

        Border3D._index += 1;

        let geo = new THREE.TubeBufferGeometry(this._extrudePath, 
            this._points.length, 2500, 8, true);
        
        obj.add(new THREE.Mesh(geo, mat));


        let groundmat = new THREE.MeshLambertMaterial( { color: 0x00ff00, transparent: true, opacity: 0.5 } );
        let shape = new THREE.Shape(this._points.map((p)=>{
            return new THREE.Vector2(p.x, p.y);
        }));

        let groundgeo = new THREE.ExtrudeBufferGeometry(shape, {
            depth: 20,
            bevelEnabled: false
        });
        
        groundgeo.translate(0, 0, -10);

        let ground = new THREE.Mesh(groundgeo, groundmat);

        obj.add(ground);

        return obj;

        // return new THREE.Mesh(geo, mat);
    }

}