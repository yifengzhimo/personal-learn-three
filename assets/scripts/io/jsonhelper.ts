import * as THREE from 'three'

import {Border3D} from '../model/border3d'
import {Build3D} from '../model/build3d'
import {Basement3D} from '../model/basement3d'

import * as http from '../io/httphelper'
import {Point, Border, Basement, Profile, TextEntity, DXFEntity} from '../entity/IDXFEntity'

import {GameEngine} from '../components/gameengine'

export class JsonHelper {

    public static read(jsonPath: string) {
        http.get(jsonPath).then((jsonStr) => {

            let meshes: THREE.Object3D[] = [];

            let response: DXFEntity = <DXFEntity>jsonStr;

            if (response)
            {
                if (response.Borders.length > 0) {
    
                    response.Borders.every((border: Border, index: number, arr: Border[]):boolean => {
    
                        let pnts: THREE.Vector3[] = [];
    
                        border.Points.every((pnt: Point, idx: number, iarr: Point[]):boolean => {
                            pnts.push(new THREE.Vector3(pnt.X, pnt.Y, 0));
                            return true;
                        });
    
                        meshes.push(new Border3D(pnts).ToMesh());
                        
                        

                        return true;
                    });
    

                    
                }

                if (response.Basements.length > 0) {
                    response.Basements.every((base: Basement, index: number, arr: Basement[]): boolean => {
    
                        let pnts: THREE.Vector3[] = [];
    
                        base.Points.every((pnt: Point, idx: number, iarr: Point[]):boolean => {
                            pnts.push(new THREE.Vector3(pnt.X, pnt.Y, 0));
                            return true;
                        });
    
                        meshes.push(new Basement3D(pnts).ToMesh());
    
                        return true;
    
    
                    });
                }

                if (response.Profiles.length > 0) {
                    response.Profiles.every((prof: Profile, index: number, arr: Profile[]): boolean => {
    
                        let pnts: THREE.Vector2[] = [];
    
                        prof.Points.every((pnt: Point, idx: number, iarr: Point[]):boolean => {
                            pnts.push(new THREE.Vector2(pnt.X, pnt.Y));
                            return true;
                        });
    
                        meshes.push(new Build3D(pnts, prof.Name, prof.Levels).ToMesh());
    
                        return true;
    
    
                    });
                }
    
            }

            

            GameEngine.getInstance()
                .addObject3DGroup(meshes)
                .setCamera(new THREE.Vector3(
                    response.CenterPoint.X * 10,
                    // 1500000,
                    response.CenterPoint.Y * 10,
                    // 1500000,
                    100000000
                ));
        });
    }
}