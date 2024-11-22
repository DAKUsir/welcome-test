document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
  
    // Animate each scene as it enters the viewport
    const scenes = document.querySelectorAll(".scene .content");
    scenes.forEach((content) => {
      gsap.fromTo(
        content,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: content,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  
    // Parallax effect for backgrounds
    gsap.utils.toArray(".scene").forEach((scene) => {
      gsap.to(scene, {
        backgroundPosition: "50% 100%",
        scrollTrigger: {
          trigger: scene,
          scrub: true,
        },
      });
    });
  });

  document.addEventListener('mousemove', (e) => {
    const x = (e.pageX / window.innerWidth) * 100; // Percentage of mouse position on X axis
    const y = (e.pageY / window.innerHeight) * 100; // Percentage of mouse position on Y axis
  
    // Apply dynamic text shadow based on mouse movement
    const tagline = document.querySelector('.tagline');
  
    // Make the text shadow follow the mouse movement with a white glow
    tagline.style.textShadow = `${x}px ${y}px 15px rgba(255, 255, 255, 0.8), ${x * 0.5}px ${y * 0.5}px 25px rgba(255, 255, 255, 0.5)`; // White glow
  });
  
// Create the Three.js scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Set up the renderer with transparency
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lighting
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
