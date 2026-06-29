// === TYPEWRITER EFFECT ===
const textArray = ["Developer & 3D Model Designer", "Frontend Specialist", "Creative Technologist"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeWriterElement = document.getElementById("typewriter");

function type() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typeWriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeWriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
}
document.addEventListener("DOMContentLoaded", type);

// === SCROLL REVEAL ANIMATION ===
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// === THREE.JS 3D SHOWCASE ===
const container = document.getElementById('canvas-container');

// Scene setup
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer setup
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Create abstract geometry (Icosahedron looks premium and modern)
const geometry = new THREE.IcosahedronGeometry(2, 0);

// Premium wireframe material with glowing effect
const material = new THREE.MeshStandardMaterial({ 
    color: 0x7b2cbf,
    wireframe: true,
    emissive: 0x4cc9f0,
    emissiveIntensity: 0.5
});

const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// Add inner solid shape for depth
const innerGeometry = new THREE.IcosahedronGeometry(1.5, 1);
const innerMaterial = new THREE.MeshStandardMaterial({
    color: 0x050510,
    roughness: 0.2,
    metalness: 0.8
});
const innerShape = new THREE.Mesh(innerGeometry, innerMaterial);
scene.add(innerShape);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Mouse interaction logic
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Smooth rotation interpolation
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    shape.rotation.y += 0.005;
    shape.rotation.x += 0.002;
    
    innerShape.rotation.y -= 0.003;
    innerShape.rotation.x -= 0.004;

    // Apply mouse interaction
    shape.rotation.y += 0.05 * (targetX - shape.rotation.y);
    shape.rotation.x += 0.05 * (targetY - shape.rotation.x);

    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Form submission prevention (UI only - visual feedback)
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "Message Sent!";
    btn.style.background = "#4cc9f0";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
        e.target.reset();
    }, 3000);
});
