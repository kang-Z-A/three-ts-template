import * as THREE from "three";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let w = window.innerWidth;
let h = window.innerHeight;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 2;

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.target.set(0, 0, 0);


const params = {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(w, h) },
}

function addObject() {
    const planeGeometry = new THREE.PlaneGeometry(1, 1);
    const planeMaterial = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
            iTime: params.time,
            iResolution: params.resolution,
        },

    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, 0);

    scene.add(plane);
}

function animate() {
    params.time.value += 0.01;
    orbitControls.update();
    renderer.render(scene, camera);
}

function addLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // 环境光
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); //默认平行光
    directionalLight.shadow.bias = -0.0005;
    directionalLight.position.set(100, 100, 100);
    directionalLight.name = "directionalLight";
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = Math.pow(2, 13);
    directionalLight.shadow.mapSize.height = Math.pow(2, 13);

    const d = 1000;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;

    directionalLight.shadow.camera.far = 8000;
    directionalLight.shadow.camera.near = 10;

    scene.add(directionalLight);
}

function onWindowResize() {
    w = window.innerWidth;
    h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    params.resolution.value = new THREE.Vector2(w, h);
}

function run() {
    addObject();
    addLight();
    animate();
    window.addEventListener("resize", onWindowResize);
}
run();