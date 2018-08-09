import OrbitControls from "three-orbitcontrols";
import * as THREE from "three";


const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;
const fps = 70;
const tbf = 1000.0 / fps;

export const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000000);
export const scene = new THREE.Scene();
const controls = new OrbitControls(camera);
export const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

camera.lookAt(new THREE.Vector3(0, 0, 0));
renderer.setClearColor(0x000000, 1.0);
renderer.setClearColor(0x111111, 1.0);
renderer.setSize(width, height);
controls.autoRotate = true;
controls.autoRotateSpeed = -1;

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}, false);

export const render = (updateFunc) => {

    const update = () => {
        requestAnimationFrame(update);
        controls.update();

        updateFunc(tbf);

        renderer.render(scene, camera);
    };

    update();
};