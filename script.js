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
  
document.addEventListener("DOMContentLoaded", () => {
  // First 3D Button (for "three-button")
  const scene1 = new THREE.Scene();
  const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer1 = new THREE.WebGLRenderer({
    canvas: document.getElementById("three-button"),
    alpha: true, // Transparent background
  });

  renderer1.setSize(300, 300); // Matches CSS width and height
  renderer1.setPixelRatio(window.devicePixelRatio);

  const ambientLight1 = new THREE.AmbientLight(0xffffff, 1); // Soft ambient light
  const pointLight1 = new THREE.PointLight(0xffd700, 2, 50); // Golden point light
  pointLight1.position.set(5, 5, 5);
  scene1.add(ambientLight1, pointLight1);
  const geometry1 = new THREE.IcosahedronGeometry(1, 0); // Base icosahedron
  const material1 = new THREE.MeshPhysicalMaterial({
    color: 0x000000, // Black faces
    metalness: 0.8, // Metallic look
    roughness: 0.2, // Shiny surface
    reflectivity: 1,
  });

  const icosahedron1 = new THREE.Mesh(geometry1, material1);
  scene1.add(icosahedron1);

  const edges1 = new THREE.EdgesGeometry(geometry1); // Extract edges from geometry
  const edgeMaterial1 = new THREE.LineBasicMaterial({ color: 0xffd700 }); // Golden edges
  const edgeLines1 = new THREE.LineSegments(edges1, edgeMaterial1);
  icosahedron1.add(edgeLines1);

  camera1.position.z = 5;
  icosahedron1.position.y = -0.5; // Move the icosahedron downward

  const raycaster1 = new THREE.Raycaster();
  const mouse1 = new THREE.Vector2();

  document.addEventListener("mousemove", (event) => {
    mouse1.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse1.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster1.setFromCamera(mouse1, camera1);

    const intersects1 = raycaster1.intersectObject(icosahedron1);

    if (intersects1.length > 0) {
      if (!icosahedron1.userData.isHovered) {
        icosahedron1.userData.isHovered = true;
        gsap.to(icosahedron1.scale, { x: 2, y: 2, z: 2, duration: 0.3 });
      }
    } else {
      if (icosahedron1.userData.isHovered) {
        icosahedron1.userData.isHovered = false;
        gsap.to(icosahedron1.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
      }
    }
  });

  function animate1() {
    requestAnimationFrame(animate1);
    icosahedron1.rotation.x += 0.02;
    icosahedron1.rotation.y += 0.07;
    renderer1.render(scene1, camera1);
  }

  animate1();

  const canvas1 = document.getElementById("three-button");
  canvas1.addEventListener("click", () => {
    alert("3D Button 1 Clicked!");
  });

  // Handle resizing for the first canvas
  window.addEventListener("resize", () => {
    const rect1 = canvas1.getBoundingClientRect();
    renderer1.setSize(rect1.width, rect1.height);
    camera1.aspect = rect1.width / rect1.height;
    camera1.updateProjectionMatrix();
  });

// Second 3D Button (for "three-button2" - Portal Shape)
const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer2 = new THREE.WebGLRenderer({
  canvas: document.getElementById("three-button2"),
  alpha: true, // Transparent background
});

renderer2.setSize(600, 600); // Matches CSS width and height
renderer2.setPixelRatio(window.devicePixelRatio);

// Set camera position
camera2.position.z = 10;

// Add ambient light and point light for the portal
const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
const pointLight2 = new THREE.PointLight(0xffffff, 1, 100); // White point light
pointLight2.position.set(5, 5, 5);
scene2.add(ambientLight2, pointLight2);

// Portal Geometry (Torus)
const geometry2 = new THREE.TorusGeometry(3, 0.5, 16, 100); // Larger torus for portal

// Create a material with metallic black appearance
const material2 = new THREE.MeshStandardMaterial({
  color: 0x000000, // Black faces
  metalness: 1,    // High metallic effect
  roughness: 0.2,  // Shiny surface
});

// Create the portal mesh
const portal = new THREE.Mesh(geometry2, material2);

// Add edges for the geometry
const edges2 = new THREE.EdgesGeometry(geometry2); // Extract edges from geometry
const edgeMaterial2 = new THREE.LineBasicMaterial({ color: 0xffd700 }); // Golden edges
const edgeLines2 = new THREE.LineSegments(edges2, edgeMaterial2);

// Add the portal and edges to the scene
scene2.add(portal, edgeLines2);




// Particle Effect in Portal Center
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 1000;
const positions = [];

for (let i = 0; i < particleCount; i++) {
  positions.push((Math.random() - 0.5) * 6); // Random X position within portal bounds
  positions.push((Math.random() - 0.5) * 6); // Random Y position within portal bounds
  positions.push(0); // Start particles at Z = 0
}

particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
  color: 0x39CEE3, // Cyan particles
  size: 0.1, // Particle size
  transparent: true,
  opacity: 0.4,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene2.add(particles);

// Wobble Animation
let wobbleAngle = 0;

function animate2() {
  requestAnimationFrame(animate2);

  // Wobble the portal slightly
  wobbleAngle += 0.03;
  portal.position.x = Math.sin(wobbleAngle) * 0.1;
  portal.position.y = Math.cos(wobbleAngle) * 0.1;

// Animate particles toward the center with smooth flow and random edge reset
const positionsArray = particlesGeometry.attributes.position.array;

for (let i = 0; i < positionsArray.length; i += 2) {
  let x = positionsArray[i];
  let y = positionsArray[i + 1];
  let z = positionsArray[i + 2];

  // Calculate distance from the center
  const distance = Math.sqrt(x * x + y * y);

  // Move particles inward with a diminishing speed as they get closer to the center
  const pullStrength = 0.02; // Speed of movement toward center
  const damping = 0.98; // Slow down as particles get near the center
  if (distance > 0.2) {
    x += (0 - x) * pullStrength;
    y += (0 - y) * pullStrength;
  } else {
    x *= damping;
    y *= damping;
  }

  // Update particle positions
  positionsArray[i] = x;
  positionsArray[i + 1] = y;
  positionsArray[i + 2] = z;

  // Reset particles at the edge if they get too close to the center
  if (distance < 0.2) {
    const r = Math.random() * 3 + 3; // Radial distance for edge placement
    const angle = Math.random() * Math.PI * 2;
    positionsArray[i] = r * Math.cos(angle); // Randomized edge placement
    positionsArray[i + 1] = r * Math.sin(angle);
    positionsArray[i + 2] = 0; // Keep particles on the z=0 plane
  }
}

// Mark positions as updated

  particlesGeometry.attributes.position.needsUpdate = true;

  renderer2.render(scene2, camera2);
}

animate2();

const canvas2 = document.getElementById("three-button2");
canvas2.addEventListener("click", () => {
  alert("Portal 3D Button Clicked!");
});

// Handle resizing for the second canvas
window.addEventListener("resize", () => {
  const rect2 = canvas2.getBoundingClientRect();
  renderer2.setSize(rect2.width, rect2.height);
  camera2.aspect = rect2.width / rect2.height;
  camera2.updateProjectionMatrix();
});

// Camera setup for the portal
camera2.position.z = 10;

});

  
document.addEventListener("DOMContentLoaded", () => {
  const backgroundSound = document.getElementById("background-sound");
  const toggleButton = document.getElementById("mute-button"); // Button for muting/unmuting

  // Function to start playing sound
  const playSound = () => {
      if (backgroundSound.paused) {
          backgroundSound.volume = 0.2; // Set desired volume directly
          backgroundSound.play(); // Play the sound
      }
  };

  // Add event listeners for user interaction
  document.body.addEventListener("click", playSound);
  document.body.addEventListener("mousemove", playSound);
  // Remove listeners once the sound starts playing
  backgroundSound.addEventListener("play", () => {
      document.body.removeEventListener("click", playSound);
      document.body.removeEventListener("mousemove", playSound);
  });

  // Toggle sound on button click
  if (toggleButton) {
      toggleButton.addEventListener("click", () => {
          if (backgroundSound.muted) {
              backgroundSound.muted = false; // Unmute the sound
              toggleButton.textContent = "🔊"; // Update button to show sound is on
          } else {
              backgroundSound.muted = true; // Mute the sound
              toggleButton.textContent = "🔇"; // Update button to show sound is off
          }
      });
  }
});
gsap.fromTo(
    ".scene.entrepreneurs .content",
    { y: 200, opacity: 0 }, // Start 200px lower and invisible
    {
        y: 0, // Move to its final position
        opacity: 1, // Fade in
        duration: 1.5, // Smooth animation duration
        scrollTrigger: {
            trigger: ".scene.entrepreneurs",
            start: "top 80%", // Start when 80% of the section is visible
            toggleActions: "play none none reverse", // Play forward and reverse
        },
    }
);








