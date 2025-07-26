/**
 * Octavio Gutierrez Portfolio - Fixed Back-to-Top Button
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const elements = {
        hamburgerBtn: document.getElementById('hamburgerBtn'),
        mobileMenu: document.getElementById('mobileMenu'),
        topNav: document.querySelector('.top-nav'),
        navDots: document.querySelectorAll('.nav-dot'),
        mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),
        navLinks: document.querySelectorAll('.nav-link'),
        body: document.body,
        backToTop: document.querySelector('.back-to-top')
    };

    const sections = ['home', 'about', 'blog'];
    let navHidden = false;
    let programmaticScrolling = false;
    let lastScrollY = 0;
    let scrollDirection = 'up';
    let backToTopVisible = false;
    let userScrolledUp = false;

    // Mobile detection
    const isMobile = () => window.innerWidth <= 768;

    // Back-to-top button logic
    function handleBackToTopVisibility() {
        const scrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollBottom = scrollY + windowHeight;

        // Simple approach: Show when near bottom, hide when scrolled up significantly
        const distanceFromBottom = documentHeight - scrollBottom;
        const showThreshold = 50; // Show when within 50px of bottom
        const hideThreshold = windowHeight * 0.10; // Hide when scrolled up 50% of viewport (reaches middle of card)

        if (elements.backToTop) {
            // Show button when near bottom
            if (distanceFromBottom <= showThreshold && !programmaticScrolling) {
                if (!backToTopVisible) {
                    elements.backToTop.classList.add('visible');
                    backToTopVisible = true;
                }
            }
            // Hide button when scrolled up significantly (disappears around middle of card)
            else if (distanceFromBottom > hideThreshold && backToTopVisible && !programmaticScrolling) {
                elements.backToTop.classList.remove('visible');
                backToTopVisible = false;
            }
        }
    }

    // CRITICAL FIX: Remove ALL scroll event interference
    // Only handle navigation visibility with massive throttling
    let scrollThrottle = null;
    function minimalScrollHandler() {
        // Clear any pending calls
        if (scrollThrottle) return;

        scrollThrottle = setTimeout(() => {
            const scrollY = window.scrollY;

            // Determine scroll direction
            scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
            lastScrollY = scrollY;

            // Simple nav hide/show with large buffer zones
            if (scrollY > 300 && !navHidden) {
                elements.topNav.classList.add('hidden');
                navHidden = true;
            } else if (scrollY < 150 && navHidden) {
                elements.topNav.classList.remove('hidden');
                navHidden = false;
            }

            // Update nav dots only when not programmatically scrolling
            if (!programmaticScrolling) {
                updateActiveNavDot();
            }

            // Handle back to top button visibility
            handleBackToTopVisibility();

            scrollThrottle = null;
        }, 150); // Heavy throttling - 150ms delay
    }

    // PASSIVE scroll listener - critical for performance
    window.addEventListener('scroll', minimalScrollHandler, {
        passive: true,
        capture: false
    });

    // Simplified nav dot update
    function updateActiveNavDot() {
        const scrollPos = window.scrollY + 200;
        let activeIndex = 0;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && scrollPos >= section.offsetTop) {
                activeIndex = i;
                break;
            }
        }

        elements.navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    // COMPLETELY NATIVE smooth scroll - no custom implementation
    function scrollToSection(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        programmaticScrolling = true;

        // Reset back-to-top state when using button
        if (targetId === 'home' && backToTopVisible) {
            userScrolledUp = false;
            backToTopVisible = false;
            elements.backToTop.classList.remove('visible');
        }

        // Use native browser scrolling
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Reset flag after scroll animation
        setTimeout(() => {
            programmaticScrolling = false;
        }, 1500);
    }

    // Mobile menu functions - simplified
    function toggleMobileMenu() {
        const isActive = elements.mobileMenu.classList.contains('active');
        const scrollY = window.scrollY;

        elements.hamburgerBtn.classList.toggle('active');
        elements.mobileMenu.classList.toggle('active');

        if (!isActive) {
            elements.body.style.position = 'fixed';
            elements.body.style.top = `-${scrollY}px`;
            elements.body.style.width = '100%';
        } else {
            elements.body.style.position = '';
            elements.body.style.top = '';
            elements.body.style.width = '';
            window.scrollTo(0, scrollY);
        }
    }

    function closeMobileMenu() {
        if (!elements.mobileMenu.classList.contains('active')) return;

        const scrollY = parseInt(elements.body.style.top || '0') * -1;

        elements.hamburgerBtn.classList.remove('active');
        elements.mobileMenu.classList.remove('active');
        elements.body.style.position = '';
        elements.body.style.top = '';
        elements.body.style.width = '';

        window.scrollTo(0, scrollY);
    }

    // EVENT LISTENERS - Minimal and clean

    // Mobile hamburger
    if (elements.hamburgerBtn) {
        elements.hamburgerBtn.addEventListener('click', toggleMobileMenu);
    }

    // Nav dots - simple click handling
    elements.navDots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(sections[index]);
        });
    });

    // Desktop nav links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href?.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href.substring(1));
            }
        });
    });

    // Mobile nav links
    elements.mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href?.startsWith('#')) {
                e.preventDefault();
                closeMobileMenu();
                setTimeout(() => scrollToSection(href.substring(1)), 300);
            } else {
                closeMobileMenu();
            }
        });
    });

    // Escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    // Resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMobileMenu();
    });

    // Back to top functionality
    if (elements.backToTop) {
        elements.backToTop.addEventListener('click', () => {
            scrollToSection('home');
        });
    }

    // Force scroll to top on page load/refresh
    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0);
    });

    // Additional scroll to top on page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    });

    // Force scroll to top immediately
    if (window.history.scrollRestoration) {
        window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Initialize nav dots
    setTimeout(updateActiveNavDot, 100);

    console.log('Portfolio initialized - Fixed back-to-top button');
});