import * as THREE from 'three'

// import {MeshText2D, textAlign, SpriteText2D} from 'three-text2d'
// import * as DT from 'three.text'
import {MeshText2D} from '../3rd-party/meshtext2d'
import {textAlign} from '../3rd-party/utils'
import {SpriteText2D} from '../3rd-party/spritetext2d'

export class Build3D {

    private _shape: THREE.Shape;
    private _name: string;
    private _levels: number;

    private _points: THREE.Vector2[];
    private _extrudePath: THREE.CatmullRomCurve3;

    private static _index: number = 0;

    constructor(pnts: THREE.Vector2[], name: string, levels: number) {
        // var pnt0 = pnts[0];
        // var pnte = pnts[pnts.length-1];

        // if (pnt0.sub(pnte).length() > 1)
        //     pnts.push(pnt0);
        
        this._shape = new THREE.Shape(pnts);
        this._name = name;
        this._levels = levels;

        this._points = pnts;

        let pps: THREE.Vector3[] = [];
        pps.push(new THREE.Vector3(0, 0, 0));
        pps.push(new THREE.Vector3(0, 0, this._levels * 3000));

        this._extrudePath = new THREE.CatmullRomCurve3(pps, false, "catmullrom");
        // this._extrudePath.closed = false;

        Build3D._index += 1;
    }

    public ToMesh(): THREE.Object3D {

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

        let object3d = new THREE.Object3D();
        let geo = new THREE.ExtrudeBufferGeometry(this._shape, {
            depth: 2990,
            bevelEnabled: false
        });
        let mat = new THREE.MeshLambertMaterial( { color: 0xccffcc, transparent: true, opacity: 0.5 } );
        // let mat = new THREE.MeshLambertMaterial( { color: 0xff0000, transparent: true, opacity: 0.5 } );

        for(var i = 0; i < this._levels; i++) {
            var geoClone = geo.clone();
            var childMesh = new THREE.Mesh(geoClone, mat);
            childMesh.translateZ(i * 3000);

            object3d.add(childMesh);
            
        }

        // let geo = new THREE.ExtrudeBufferGeometry(this._shape, {
        //     depth: this._levels * 3000,
        //     bevelEnabled: false
        // });


        // let text = new MeshText2D(this._name, {
        //     align: textAlign.right, 
        //     font: '100px Arial', 
        //     fillStyle: '#000000', 
        //     antialias: true 
        // });

        let text = new SpriteText2D(this._name + Build3D._index, {
            align: textAlign.center, 
            font: '100px Arial', 
            fillStyle: '#000000', 
            antialias: true 
        });

        let cx: number = 0;
        let cy: number = 0;

        this._points.forEach((p)=>{
            cx += p.x;
            cy += p.y;
        })

        cx /= this._points.length;
        cy /= this._points.length;

        text.position.x = cx;
        text.position.y = cy;
        text.position.z = (this._levels + 5) * 3000;

        text.scale.set(100, 100, 100);

        // let sphere = new THREE.SphereBufferGeometry(2500);
        // let smesh = new THREE.Mesh(sphere, mat);
        // smesh.position.copy(text.position);
        // object3d.add(smesh);

        object3d.add(text);


        return object3d;
        // return null;
    }


   

}