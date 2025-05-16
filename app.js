




// DOM Elements
const loadingScreen = document.querySelector('.loading-screen');
const progressBar = document.querySelector('.progress');
const loadingStatus = document.querySelector('.loading-status');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.section');
const skillBars = document.querySelectorAll('.skill-progress');

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

// Initialize everything when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Simulate loading
    simulateLoading();
    
    // Add event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    hamburger.addEventListener('click', toggleMobileMenu);
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle contact form (if you choose to implement it later)
    // handleContactForm();
});






