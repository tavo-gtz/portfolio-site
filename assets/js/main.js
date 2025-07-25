/**
 * Toledo Portfolio Template - Main JavaScript
 * Enhanced interactions and animations
 */

class ToledoPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initParallax();
        this.initFloatingNav();
        this.initButtonEffects();
        this.initIntersectionObserver();
        this.initPreloader();
    }

    setupEventListeners() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Handle window resize
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // Handle scroll for mobile
        window.addEventListener('scroll', this.debounce(this.handleScroll.bind(this), 16));
    }

    onDOMReady() {
        console.log('Toledo Portfolio initialized');
        this.addLoadedClass();
    }

    addLoadedClass() {
        document.body.classList.add('loaded');
    }

    initParallax() {
        const heroImage = document.querySelector('.hero-image');
        const parallaxBg = document.querySelector('.parallax-bg');

        if (!heroImage || !parallaxBg) return;

        // Parallax effect on mouse move (desktop only)
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

                // Subtle parallax for background pattern
                parallaxBg.style.transform = `translate(${mouseX * 5}px, ${mouseY * 5}px)`;

                // Subtle image movement
                heroImage.style.transform = `scale(1.05) translate(${mouseX * 3}px, ${mouseY * 3}px)`;
            });

            // Reset on mouse leave
            document.addEventListener('mouseleave', () => {
                parallaxBg.style.transform = 'translate(0, 0)';
                heroImage.style.transform = 'scale(1.05)';
            });
        }
    }

    initFloatingNav() {
        const navDots = document.querySelectorAll('.nav-dot');

        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Update active state
                navDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                // Add click animation
                dot.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    dot.style.transform = dot.classList.contains('active') ? 'scale(1.3)' : 'scale(1)';
                }, 150);

                // Trigger haptic feedback on supported devices
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            });

            // Enhanced hover effects
            dot.addEventListener('mouseenter', () => {
                if (!dot.classList.contains('active')) {
                    dot.style.transform = 'scale(1.2)';
                }
            });

            dot.addEventListener('mouseleave', () => {
                if (!dot.classList.contains('active')) {
                    dot.style.transform = 'scale(1)';
                }
            });
        });
    }

    initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {
            // Enhanced hover effects
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });

            // Click effect
            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'translateY(-1px) scale(0.98)';
            });

            btn.addEventListener('mouseup', () => {
                btn.style.transform = 'translateY(-3px) scale(1)';
            });

            // Keyboard accessibility
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        });

        // Enhanced social link effects
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
            });
        });
    }

    initIntersectionObserver() {
        // Animate elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');

                    // Start any paused animations
                    if (entry.target.style.animationPlayState === 'paused') {
                        entry.target.style.animationPlayState = 'running';
                    }
                }
            });
        }, observerOptions);

        // Observe main content elements
        const elementsToObserve = [
            '.content',
            '.hero-image',
            '.social-links'
        ];

        elementsToObserve.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                observer.observe(element);
            }
        });
    }

    initPreloader() {
        // Simple preloader for hero image
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const imageLoader = new Image();
            imageLoader.onload = () => {
                heroImage.style.opacity = '1';
                heroImage.classList.add('loaded');
            };
            imageLoader.src = heroImage.src;
        }
    }

    handleResize() {
        // Handle responsive adjustments
        const isMobile = window.innerWidth <= 768;
        const floatingNav = document.querySelector('.floating-nav');

        if (floatingNav) {
            floatingNav.style.display = isMobile ? 'none' : 'flex';
        }

        // Reset parallax transforms on resize
        const parallaxBg = document.querySelector('.parallax-bg');
        const heroImage = document.querySelector('.hero-image');

        if (parallaxBg) parallaxBg.style.transform = 'translate(0, 0)';
        if (heroImage) heroImage.style.transform = 'scale(1.05)';
    }

    handleScroll() {
        // Add scroll-based effects for mobile
        if (window.innerWidth <= 768) {
            const scrolled = window.pageYOffset;
            const parallaxBg = document.querySelector('.parallax-bg');

            if (parallaxBg) {
                parallaxBg.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        }
    }

    // Utility function for debouncing
    debounce(func, wait) {
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

    // Public method to update content dynamically
    updateContent(newContent) {
        const content = document.querySelector('.content');
        if (content && newContent) {
            // Fade out
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';

            setTimeout(() => {
                // Update content
                if (newContent.title) {
                    const logo = content.querySelector('.title');
                    if (logo) logo.textContent = newContent.title;
                }

                if (newContent.tagline) {
                    const tagline = content.querySelector('.tagline');
                    if (tagline) tagline.textContent = newContent.tagline;
                }

                if (newContent.description) {
                    const description = content.querySelector('.description');
                    if (description) description.textContent = newContent.description;
                }

                // Fade in
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    // Error handling for missing elements
    safeQuerySelector(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
        }
        return element;
    }
}

// Initialize the portfolio when the script loads
const portfolio = new ToledoPortfolio();

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ToledoPortfolio;
}

// Add some CSS classes dynamically for enhanced animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .loaded .hero-image {
        transition: opacity 0.5s ease-in-out;
    }

    .hero-image:not(.loaded) {
        opacity: 0;
    }
`;
document.head.appendChild(style);