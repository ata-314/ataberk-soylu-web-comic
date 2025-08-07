// Enhanced Parallax Web Comic Site JavaScript

class ParallaxSite {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoader();
        this.setupParallax();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupScrollToTop();
        this.setupIntersectionObserver();
        this.setupFloatingElements();
        this.setupSmoothScrolling();
    }

    // Enhanced Loader
    setupLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    this.animateHeroContent();
                }, 500);
            }, 3000);
        }
    }

    // Hero Content Animation
    animateHeroContent() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1s ease-out';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Advanced Parallax System
    setupParallax() {
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        const floatingItems = document.querySelectorAll('.floating-item');
        const heroContent = document.querySelector('.hero-content');

        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            // Parallax layers
            parallaxLayers.forEach(layer => {
                const speed = layer.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                layer.style.transform = `translateY(${yPos}px)`;
            });

            // Floating elements with different speeds
            floatingItems.forEach((item, index) => {
                const speed = item.dataset.speed || 0.8;
                const yPos = -(scrolled * speed);
                const xPos = Math.sin(scrolled * 0.001 + index) * 20;
                item.style.transform = `translateY(${yPos}px) translateX(${xPos}px)`;
            });

            // Hero content parallax
            if (heroContent) {
                const heroSpeed = 0.3;
                const yPos = scrolled * heroSpeed;
                heroContent.style.transform = `translateY(${yPos}px)`;
            }

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
        window.addEventListener('resize', requestTick, { passive: true });
    }

    // Scroll Animations with Intersection Observer
    setupScrollAnimations() {
        const chapterContainers = document.querySelectorAll('.chapter-container');
        const contentElements = document.querySelectorAll('.content');
        const imageContainers = document.querySelectorAll('.imgContainer');

        const animateOnScroll = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Stagger animation for child elements
                    const children = entry.target.querySelectorAll('.content, .imgContainer');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        };

        const scrollObserver = new IntersectionObserver(animateOnScroll, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        chapterContainers.forEach(container => {
            scrollObserver.observe(container);
        });
    }

    // Enhanced Navigation
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu toggle
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                // Add mobile menu functionality here
            });
        }
    }

    // Scroll to Top Button
    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        if (scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            });

            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Intersection Observer for various animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Animate elements when they come into view
        const animateElements = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        };

        const elementObserver = new IntersectionObserver(animateElements, observerOptions);

        // Observe elements that need animation
        const animatedElements = document.querySelectorAll('.content, .imgContainer, .stat-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease-out';
            elementObserver.observe(el);
        });
    }

    // Floating Elements Animation
    setupFloatingElements() {
        const floatingItems = document.querySelectorAll('.floating-item');
        
        floatingItems.forEach((item, index) => {
            // Add random movement
            setInterval(() => {
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;
                item.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + index * 1000);
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        const scrollIndicator = document.querySelector('.scroll-arrow');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const chaptersSection = document.getElementById('chapters');
                if (chaptersSection) {
                    chaptersSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }

        // Smooth scroll for all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Performance optimization
    optimizePerformance() {
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Handle scroll end
            }, 100);
        });

        // Use passive listeners for better performance
        window.addEventListener('touchstart', () => {}, { passive: true });
        window.addEventListener('touchmove', () => {}, { passive: true });
    }

    // Utility functions
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the site when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxSite();
});

// Additional CSS for enhanced navbar
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background: rgba(3, 1, 4, 0.95) !important;
        backdrop-filter: blur(15px) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }
    
    .hamburger-menu.active .bar:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger-menu.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger-menu.active .bar:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .chapter-container {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
    }
    
    .chapter-container.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .content, .imgContainer {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    .stat-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    .stat-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);



