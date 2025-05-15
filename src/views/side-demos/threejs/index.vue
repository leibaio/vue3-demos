<template>
  <h2>threejs</h2>
  <div class="container" ref="container"></div>
</template>
<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { onMounted, ref } from "vue";

const container = ref(null);

let scene, camera, renderer, model, controls;

onMounted(() => {
  initScene();
  animate();
});

function initScene() {
  // 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcccccc);

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // 创建渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(500, 300);
  container.value.appendChild(renderer.domElement);

  // 添加轨道控制
  controls = new OrbitControls(camera, renderer.domElement);

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // 添加平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  // 加载 GLTF 模型
  const loader = new GLTFLoader();
  loader.load(
    "/models/F1/gltf/F1.gltf",
    (gltf) => {
      console.log("Model loaded successfully", gltf);
      model = gltf.scene;
      scene.add(model);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log("[ error ] >", error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
</script>

<style lang="less" scoped>
.container {
  width: 500px;
  height: 500px;
}
</style>
