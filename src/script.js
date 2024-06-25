import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const TEXTURE_PATH =
  "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

/**
 * Object
 */
const planeGeometry = new THREE.PlaneGeometry(1, 2, 24, 24);
const sphereGeometry = new THREE.SphereGeometry(15, 32, 16);

const textureLoader = new THREE.TextureLoader();
const gridTexture = textureLoader.load(TEXTURE_PATH);

const material = new THREE.MeshBasicMaterial({ map: gridTexture });

const plane = new THREE.Mesh(planeGeometry, material);
const sphere = new THREE.Mesh(sphereGeometry, material);

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = 0.0;
plane.position.z = 0.15;

sphere.position.y = 0.0;
sphere.position.z = 0.15;

scene.add(plane);
scene.add(sphere);

// Light
const light = new THREE.PointLight(0xffffff, 7, 100, 1.7);
light.position.set(0, 100, 10);
scene.add(light);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  // field of view
  100,
  // aspect ratio
  sizes.width / sizes.height,
  // near plane: it's low since we want our mesh to be visible even from very close
  0.1,
  // far plane: how far we're rendering
  80
);
camera.position.x = 0;
camera.position.y = 0.06;
camera.position.z = 1.1;
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera's aspect ratio and projection matrix
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  // Note: We set the pixel ratio of the renderer to at most 2
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
// Animate: we call this tick function on every frame
const tick = () => {
  // Update controls
  controls.update();

  // Update the rendered scene
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

// Calling tick will initiate the rendering of the scene
tick();
