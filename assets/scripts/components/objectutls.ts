import * as THREE from 'three'

export class ObjectUtils {

    public static rndGenerate(): THREE.Object3D[] {

        let objs: THREE.Object3D[] = [];

        let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
        let planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;

        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;

        objs.push(plane);


        let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        let sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x7777ff, wireframe: true
        });
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        sphere.position.x = 20;
        sphere.position.y = 4;
        sphere.position.z = 2;

        objs.push(sphere);

        return objs;
    }

}