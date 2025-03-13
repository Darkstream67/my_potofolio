// // DOM Elements
// const loadingScreen = document.querySelector('.loading-screen');
// const progressBar = document.querySelector('.progress');
// const loadingStatus = document.querySelector('.loading-status');
// const navLinks = document.querySelectorAll('.nav-links a');
// const hamburger = document.querySelector('.hamburger');
// const navMenu = document.querySelector('.nav-links');
// const sections = document.querySelectorAll('.section');
// const skillBars = document.querySelectorAll('.skill-progress');

// // Three.js Scene Setup
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer({
//     canvas: document.querySelector('#bg-canvas'),
//     antialias: true,
//     alpha: true
// });

// // Configure renderer
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0x0A0A18, 1);

// camera.position.setZ(30);

// // Create particles
// function createParticles() {
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 2000;
    
//     const posArray = new Float32Array(particlesCount * 3);
//     const scaleArray = new Float32Array(particlesCount);
    
//     for (let i = 0; i < particlesCount * 3; i++) {
//         posArray[i] = (Math.random() - 0.5) * 300;
//     }
    
//     for (let i = 0; i < particlesCount; i++) {
//         scaleArray[i] = Math.random();
//     }
    
//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
//     particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
//     const particlesMaterial = new THREE.PointsMaterial({
//         size: 0.2,
//         color: 0xFF6B6B,
//         transparent: true,
//         opacity: 0.8,
//         sizeAttenuation: true
//     });
    
//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particlesMesh);
    
//     return particlesMesh;
// }

// // Add lights
// function addLights() {
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);
    
//     const pointLight1 = new THREE.PointLight(0xff6b6b, 2);
//     pointLight1.position.set(20, 20, 20);
//     scene.add(pointLight1);
    
//     const pointLight2 = new THREE.PointLight(0x3a86ff, 2);
//     pointLight2.position.set(-20, -20, 20);
//     scene.add(pointLight2);
// }

// // Create floating objects
// function createFloatingCube() {
//     const geometry = new THREE.BoxGeometry(3, 3, 3);
//     const edges = new THREE.EdgesGeometry(geometry);
//     const material = new THREE.LineBasicMaterial({ color: 0xff6b6b });
    
//     const cube = new THREE.LineSegments(edges, material);
//     cube.position.set(15, 0, 10);
//     scene.add(cube);
    
//     return cube;
// }

// function createFloatingSphere() {
//     const geometry = new THREE.SphereGeometry(2, 24, 16, 0, Math.PI * 2, 0, Math.PI * 2);
//     const edges = new THREE.EdgesGeometry(geometry);
//     const material = new THREE.LineBasicMaterial({ color: 0x3a86ff });
    
//     const sphere = new THREE.LineSegments(edges, material);
//     sphere.position.set(-15, 5, 5);
//     scene.add(sphere);
    
//     return sphere;
// }

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);
    
//     particles.rotation.x += 0.0005;
//     particles.rotation.y += 0.0005;
    
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
    
//     sphere.rotation.x += 0.01;
//     sphere.rotation.z += 0.01;
    
//     renderer.render(scene, camera);
// }

// // Handle window resize
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// // Initialize the 3D scene
// let particles, cube, sphere;

// function initThreeJS() {
//     particles = createParticles();
//     addLights();
//     cube = createFloatingCube();
//     sphere = createFloatingSphere();
    
//     window.addEventListener('resize', onWindowResize);
    
//     animate();
// }

// // Simulate loading progress
// function simulateLoading() {
//     let progress = 0;
//     const interval = setInterval(() => {
//         progress += Math.random() * 5;
        
//         if (progress > 100) {
//             progress = 100;
//             clearInterval(interval);
            
//             // Complete loading
//             setTimeout(() => {
//                 loadingScreen.style.opacity = '0';
//                 setTimeout(() => {
//                     loadingScreen.style.display = 'none';
//                     document.body.classList.add('loaded');
                    
//                     // Animate sections
//                     animateSections();
                    
//                     // Animate skill bars
//                     animateSkillBars();
//                 }, 500);
//             }, 500);
//         }
        
//         progressBar.style.width = progress + '%';
        
//         // Update loading text
//         if (progress < 30) {
//             loadingStatus.textContent = 'Loading assets...';
//         } else if (progress < 60) {
//             loadingStatus.textContent = 'Initializing renderer...';
//         } else if (progress < 90) {
//             loadingStatus.textContent = 'Preparing particles...';
//         } else {
//             loadingStatus.textContent = 'Almost ready...';
//         }
//     }, 150);
// }

// // Navigation
// function handleNavClick(e) {
//     e.preventDefault();
    
//     // Remove active class from all links
//     navLinks.forEach(link => link.classList.remove('active'));
    
//     // Add active class to clicked link
//     e.target.classList.add('active');
    
//     // Get target section
//     const targetId = e.target.getAttribute('href');
//     const targetSection = document.querySelector(targetId);
    
//     // Scroll to section
//     window.scrollTo({
//         top: targetSection.offsetTop - 80,
//         behavior: 'smooth'
//     });
    
//     // Close mobile menu if open
//     if (navMenu.classList.contains('active')) {
//         toggleMobileMenu();
//     }
// }

// // Mobile menu toggle
// function toggleMobileMenu() {
//     hamburger.classList.toggle('active');
//     navMenu.classList.toggle('active');
// }

// // Scroll spy for navigation
// function handleScroll() {
//     let current = '';
    
//     sections.forEach(section => {
//         const sectionTop = section.offsetTop - 100;
//         const sectionHeight = section.clientHeight;
        
//         if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
//             current = '#' + section.getAttribute('id');
//         }
//     });
    
//     navLinks.forEach(link => {
//         link.classList.remove('active');
//         if (link.getAttribute('href') === current) {
//             link.classList.add('active');
//         }
//     });
// }

// // Animate sections on scroll
// function animateSections() {
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('animate');
//             }
//         });
//     }, { threshold: 0.1 });
    
//     sections.forEach(section => {
//         observer.observe(section);
//     });
// }

// // Animate skill bars
// function animateSkillBars() {
//     skillBars.forEach(bar => {
//         const percent = bar.getAttribute('data-percent');
//         bar.style.width = '0%';
        
//         setTimeout(() => {
//             bar.style.width = percent + '%';
//         }, 500);
//     });
// }

// // Contact form handling
// function handleContactForm() {
//     const form = document.getElementById('contact-form');
    
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         // Here you would normally send the form data to a server
//         // For this example, we'll just simulate a successful submission
        
//         const submitButton = form.querySelector('button[type="submit"]');
//         submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
//         submitButton.disabled = true;
        
//         setTimeout(() => {
//             form.reset();
//             submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
//             setTimeout(() => {
//                 submitButton.innerHTML = 'Send Message';
//                 submitButton.disabled = false;
//             }, 3000);
//         }, 2000);
//     });
// }

// // Initialize everything when the page loads
// window.addEventListener('DOMContentLoaded', () => {
//     // Initialize Three.js scene
//     initThreeJS();
    
//     // Simulate loading
//     simulateLoading();
    
//     // Add event listeners
//     navLinks.forEach(link => {
//         link.addEventListener('click', handleNavClick);
//     });
    
//     hamburger.addEventListener('click', toggleMobileMenu);
    
//     window.addEventListener('scroll', handleScroll);
    
//     // Handle contact form
//     handleContactForm();
// });















// DOM Elements
const loadingScreen = document.querySelector('.loading-screen');
const progressBar = document.querySelector('.progress');
const loadingStatus = document.querySelector('.loading-status');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.section');
const skillBars = document.querySelectorAll('.skill-progress');

// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    antialias: true,
    alpha: true
});

// Configure renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0A0A18, 1);

camera.position.setZ(30);

// Create particles
function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 300;
    }
    
    for (let i = 0; i < particlesCount; i++) {
        scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: 0xFF6B6B,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    return particlesMesh;
}

// Add lights
function addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0xff6b6b, 2);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x3a86ff, 2);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);
}

// Create floating objects
function createFloatingCube() {
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0xff6b6b });
    
    const cube = new THREE.LineSegments(edges, material);
    cube.position.set(15, 0, 10);
    scene.add(cube);
    
    return cube;
}

function createFloatingSphere() {
    const geometry = new THREE.SphereGeometry(2, 24, 16, 0, Math.PI * 2, 0, Math.PI * 2);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x3a86ff });
    
    const sphere = new THREE.LineSegments(edges, material);
    sphere.position.set(-15, 5, 5);
    scene.add(sphere);
    
    return sphere;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    sphere.rotation.x += 0.01;
    sphere.rotation.z += 0.01;
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize the 3D scene
let particles, cube, sphere;

function initThreeJS() {
    particles = createParticles();
    addLights();
    cube = createFloatingCube();
    sphere = createFloatingSphere();
    
    window.addEventListener('resize', onWindowResize);
    
    animate();
}

// Simulate loading progress
function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // Complete loading
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.classList.add('loaded');
                    
                    // Animate sections
                    animateSections();
                    
                    // Animate skill bars
                    animateSkillBars();
                }, 500);
            }, 500);
        }
        
        progressBar.style.width = progress + '%';
        
        // Update loading text
        if (progress < 30) {
            loadingStatus.textContent = 'Loading assets...';
        } else if (progress < 60) {
            loadingStatus.textContent = 'Initializing renderer...';
        } else if (progress < 90) {
            loadingStatus.textContent = 'Preparing particles...';
        } else {
            loadingStatus.textContent = 'Almost ready...';
        }
    }, 150);
}

// Navigation
function handleNavClick(e) {
    e.preventDefault();
    
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    e.target.classList.add('active');
    
    // Get target section
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    // Scroll to section
    window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Scroll spy for navigation
function handleScroll() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
}

// Animate sections on scroll
function animateSections() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Animate skill bars
function animateSkillBars() {
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = percent + '%';
        }, 500);
    });
}

// // Contact form handling
// function handleContactForm() {
//     const form = document.getElementById('contact-form');
    
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         // Here you would normally send the form data to a server
//         // For this example, we'll just simulate a successful submission
        
//         const submitButton = form.querySelector('button[type="submit"]');
//         submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
//         submitButton.disabled = true;
        
//         setTimeout(() => {
//             form.reset();
//             submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
//             setTimeout(() => {
//                 submitButton.innerHTML = 'Send Message';
//                 submitButton.disabled = false;
//             }, 3000);
//         }, 2000);
//     });
// }

// Initialize everything when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js scene
    initThreeJS();
    
    // Simulate loading
    simulateLoading();
    
    // Add event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    hamburger.addEventListener('click', toggleMobileMenu);
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle contact form
    handleContactForm();
});