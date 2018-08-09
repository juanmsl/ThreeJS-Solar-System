import * as THREE from 'three';
import Planet from './Planet';

import {
    camera,
    scene,
    render
} from "./Config";

import {
    starsTexture
} from "./Config/Textures";

import planetsConfig from './Config/Planets';

const light = new THREE.AmbientLight(0x222222);
scene.add(light);
//scene.background = starsTexture;

scene.background = new THREE.CubeTextureLoader()
					.load( [ 'stars.png', 'stars.png', 'stars.png', 'stars.png', 'stars.png', 'stars.png' ] );

camera.position.set(0, 4000, -6000);

let light2 = new THREE.PointLight(0xffffff);
light2.position.set(0, 0, 0);
scene.add(light2);

const planets = [];
planets.push(new Planet(light2, planetsConfig.sun));
planets.push(new Planet(scene, planetsConfig.mercury));
planets.push(new Planet(scene, planetsConfig.venus));
planets.push(new Planet(scene, planetsConfig.earth));
planets.push(new Planet(scene, planetsConfig.mars));
planets.push(new Planet(scene, planetsConfig.jupiter));
planets.push(new Planet(scene, planetsConfig.saturn));
planets.push(new Planet(scene, planetsConfig.uranus));
planets.push(new Planet(scene, planetsConfig.neptune));
planets.push(new Planet(scene, planetsConfig.pluton));

for(let i = 1; i < planets.length; i++) {
    planets[0].addMoon(planets[i]);
}

const moon = new Planet(scene, planetsConfig.moon);
planets[3].addMoon(moon);

render((tlf) => {
    planets[0].render(tlf);
});

