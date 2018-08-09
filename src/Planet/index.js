import * as THREE from 'three';
import {ringsTexture} from "../Config/Textures";


let translate = true;

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 't': case 'T':
            translate = !translate;
            break;
    }
});

class Planet {

    static defaultProps = {
        orbitRadius: 0,
        planetRadius: 1,
        velocityRotation: 1,
        velocityTraslation: 1,
        material: null,
        rings: false
    };

    constructor(scene, props = {}) {
        let propsF = Object.assign({}, Planet.defaultProps, props);

        this.orbitRadius = propsF.orbitRadius;
        this.planetRadius = propsF.planetRadius;
        this.velocityRotation = THREE.Math.degToRad(propsF.velocityRotation) / 1000.0;
        this.velocityTraslation = THREE.Math.degToRad(propsF.velocityTraslation) / 1000.0;
        this.material = propsF.material;
        this.addRings = propsF.rings;
        this.pivot = null;

        this.geometry = new THREE.SphereGeometry(this.planetRadius, 32, 32);
        this.sphere = new THREE.Mesh(this.geometry, this.material);
        this.sphere.position.set(this.orbitRadius, 0, 0);
        this.moons = [];
        this.rings = [];
        this.pivots = [];

        scene.add(this.sphere);

        if(this.addRings) {
            this.pivotRings = new THREE.Object3D();

            let geometry = new THREE.RingGeometry(
                this.planetRadius * 1.5,
                this.planetRadius * 2.0,
                32
            );
            let material = new THREE.MeshPhongMaterial({
                color: 0xd1a229,
                shininess: 15,
                map: ringsTexture,
                side: THREE.DoubleSide
            });
            let circle1 = new THREE.Mesh( geometry, material );
            circle1.rotation.x -= THREE.Math.degToRad(90);
            scene.add( circle1 );
            this.rings.push(circle1);
            this.pivotRings.add(circle1);

            this.sphere.add(this.pivotRings);
        }
    }

    addMoon = (moon) => {
        this.moons.push(moon);

        let pivot = new THREE.Object3D();
        pivot.add(moon.sphere);
        //pivot.rotation.y += (Math.random() * 2 * 3.1416);

        let geometry = new THREE.RingGeometry(
            moon.orbitRadius - 0.5,
            moon.orbitRadius + 0.5,
            50
        );
        let material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        });
        let orbit = new THREE.Mesh( geometry, material );
        orbit.rotation.x += THREE.Math.degToRad(90);
        let orbitPivot = new THREE.Object3D();
        orbitPivot.add(orbit);

        moon.pivot = pivot;
        this.pivots.push(pivot);
        this.sphere.add(pivot);
        this.sphere.add(orbitPivot);
    };

    render = (tlf) => {
        if(this.pivot !== null) {
            this.sphere.rotation.y += this.velocityRotation * tlf;
            this.pivots.forEach((pivot) => {
                pivot.rotation.y -= this.velocityRotation * tlf;
            });
            this.pivot.rotation.y += translate ? this.velocityTraslation * tlf : 0;
        }

        if(this.addRings) {
            this.pivotRings.rotation.y += this.velocityTraslation * tlf;
        }

        this.moons.forEach((moon, i) => {
            moon.render(tlf);
        });
    };
}

// TODO: VELOCITY ROTATION

export default Planet;