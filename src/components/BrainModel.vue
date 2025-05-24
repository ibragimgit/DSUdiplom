<template>
    <div ref="canvasContainer"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  
  const canvasContainer = ref(null)
  
  onMounted(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const size = 550
    renderer.setSize(size, size)
    renderer.setClearColor(0xffffff)
    canvasContainer.value.appendChild(renderer.domElement)
  
    // Освещение
    scene.add(new THREE.AmbientLight(0xffffff, 1.0))
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
  
    const loader = new GLTFLoader()
    let model = null
  
    loader.load(
      '/models/brain.gltf', // путь из public
      (gltf) => {
        model = gltf.scene
        model.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({ color: 0x1f2937 })
          }
        })
        model.position.set(0, 0, 0) // Reduced y-position from 1 to 0.5 to fit better
        model.scale.set(6, 6, 6) // Reduced scale from 5 to 4 to prevent overflow
        scene.add(model)
      },
      undefined,
      (error) => {
        console.error('Ошибка загрузки модели:', error)
      }
    )
  
    camera.position.z = 7 // Increased from 5 to 7 for better view distance
    let rotationAngle = 0
  
    const animate = () => {
      requestAnimationFrame(animate)
      if (model) {
        rotationAngle += 0.005
        model.rotation.y = rotationAngle
      }
      renderer.render(scene, camera)
    }
    animate()
  
    window.addEventListener('resize', () => {
      const newSize = Math.min(550, window.innerWidth - 40) // Updated to match new size
      renderer.setSize(newSize, newSize)
      camera.aspect = newSize / newSize
      camera.updateProjectionMatrix()
    })
  })
  </script>
  
  <style scoped>
  div {
    width: 550px; /* Updated to match the new size */
    height: 550px; /* Updated to match the new size */
  }
  </style>