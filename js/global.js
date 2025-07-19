/**
 * Global JavaScript for Synkria Website
 * Handles shared functionality, animations, and utilities across all pages
 * Uses GSAP for animations and modern ES6+ syntax for AI-friendly code
 */

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Global configuration and state
const SynkriaGlobal = {
    // Animation settings
    animations: {
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
    },
    
    // Breakpoints for responsive behavior
    breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1280
    },
    
    // Global state
    state: {
        isLoaded: false,
        isMobile: window.innerWidth < 768,
        scrollY: 0,
        activeModal: null
    },
    
    // Utility functions
    utils: {
        // Debounce function for performance optimization
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Throttle function for scroll events
        throttle: (func, limit) => {
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
        },
        
        // Check if element is in viewport
        isInViewport: (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },
        
        // Generate random number between min and max
        random: (min, max) => Math.random() * (max - min) + min,
        
        // Format numbers with commas
        formatNumber: (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
};

/**
 * Preloader Animation
 * Handles the initial loading animation and page reveal
 */
class PreloaderManager {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.init();
    }
    
    init() {
        if (!this.preloader) return;
        
        // Animate preloader elements
        const tl = gsap.timeline();
        
        // tl.from('.preloader .fas', {
        //     scale: 0,
        //     rotation: 180,
        //     duration: 0.8,
        //     ease: "back.out(1.7)"
        // });
        tl.from('.preloader span', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4");
        // tl.from('.preloader .w-64', {
        //     scaleX: 0,
        //     duration: 0.8,
        //     ease: "power2.out"
        // }, "-=0.2");
        
        // Hide preloader after animations complete
        setTimeout(() => {
            this.hide();
        }, 2000);
    }
    
    hide() {
        if (!this.preloader) return;
        
        gsap.to(this.preloader, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                this.preloader.style.display = 'none';
                SynkriaGlobal.state.isLoaded = true;
                document.body.classList.add('loaded');
                
                // Trigger page load animations
                this.triggerPageAnimations();
            }
        });
    }
    
    triggerPageAnimations() {
        // Animate navigation

        if (document.querySelector('#mainNavbar')) {
            gsap.from('#mainNavbar', {
                y: -100,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        }
        
        // Animate page content
        if (document.querySelector('.hero-section') || document.querySelector('.networking-hero') || document.querySelector('#heroSection')) {
            gsap.from('.hero-section, .networking-hero, #heroSection', {
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                delay: 0.2
            });
        }
    }
}

/**
 * Navigation Manager
 * Handles navigation behavior, scroll effects, and mobile menu
 */
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('mainNavbar');
        this.mobileMenuButton = document.querySelector('[data-collapse-toggle="mobile-menu"]');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.lastScrollY = 0;
        
        this.init();
    }
    
    init() {
        if (!this.navbar) return;
        
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }
    
    setupScrollEffects() {
        const handleScroll = SynkriaGlobal.utils.throttle(() => {
            const currentScrollY = window.scrollY;
            SynkriaGlobal.state.scrollY = currentScrollY;
            
            // Add/remove scrolled class for styling
            if (currentScrollY > 50) {
                this.navbar.classList.add('scrolled');
                this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                this.navbar.style.backdropFilter = 'blur(20px)';
            } else {
                this.navbar.classList.remove('scrolled');
                this.navbar.style.background = 'rgba(255, 255, 255, 0.8)';
                this.navbar.style.backdropFilter = 'blur(10px)';
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                // Scrolling down
                gsap.to(this.navbar, {
                    y: -100,
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                // Scrolling up
                gsap.to(this.navbar, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            this.lastScrollY = currentScrollY;
        }, 16);
        
        window.addEventListener('scroll', handleScroll);
    }
    
    setupMobileMenu() {
        if (!this.mobileMenuButton || !this.mobileMenu) return;
        
        this.mobileMenuButton.addEventListener('click', () => {
            const isHidden = this.mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                this.mobileMenu.classList.remove('hidden');
                gsap.from(this.mobileMenu, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                gsap.to(this.mobileMenu, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        this.mobileMenu.classList.add('hidden');
                    }
                });
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && !this.mobileMenu.classList.contains('hidden')) {
                this.mobileMenu.classList.add('hidden');
            }
        });
    }
    
    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: "power2.out"
                    });
                }
            });
        });
    }
}

/**
 * Animation Manager
 * Handles scroll-triggered animations and interactive effects
 */
class AnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupCounterAnimations();
        this.setupParticleEffects();
    }
    
    setupScrollAnimations() {
        // Animate sections on scroll
        gsap.utils.toArray('section').forEach((section, index) => {
            gsap.from(section.children, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        // Animate cards
        gsap.utils.toArray('.card-hover').forEach((card) => {
            gsap.from(card, {
                y: 40,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        // Animate feature items
        gsap.utils.toArray('.feature-item').forEach((item, index) => {
            gsap.from(item, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }
    
    setupHoverEffects() {
        // Button hover effects
        document.querySelectorAll('.btn-ripple').forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
        
        // Card hover effects
        document.querySelectorAll('.card-hover').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
        
        // Interest card selection
        document.querySelectorAll('.interest-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('selected');
                
                if (card.classList.contains('selected')) {
                    gsap.to(card, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                } else {
                    gsap.to(card, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
    }
    
    setupCounterAnimations() {
        // Animate counters
        document.querySelectorAll('[data-count]').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            
            ScrollTrigger.create({
                trigger: counter,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2,
                        ease: "power2.out",
                        snap: { innerHTML: 1 },
                        onUpdate: function() {
                            counter.innerHTML = SynkriaGlobal.utils.formatNumber(Math.ceil(counter.innerHTML));
                        }
                    });
                }
            });
        });
    }
    
    setupParticleEffects() {
        // Create floating particles
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (8 + Math.random() * 4) + 's';
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 12000);
        };
        
        // Create particles periodically
        setInterval(createParticle, 2000);
        
        // Create initial particles
        for (let i = 0; i < 5; i++) {
            setTimeout(createParticle, i * 400);
        }
    }
}

/**
 * Modal Manager
 * Handles modal interactions and animations
 */
class ModalManager {
    constructor() {
        this.activeModal = null;
        this.init();
    }
    
    init() {
        this.setupModalTriggers();
        this.setupModalTabs();
        this.setupModalClose();
    }
    
    setupModalTriggers() {
        // Community modal triggers
        document.addEventListener('click', (e) => {
            if (e.target.closest('.community-card, .professional-card')) {
                const card = e.target.closest('.community-card, .professional-card');
                const modalId = card.classList.contains('community-card') ? 'communityModal' : 'profileModal';
                this.openModal(modalId, card);
            }
        });
    }
    
    setupModalTabs() {
        document.querySelectorAll('.modal-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
    }
    
    setupModalClose() {
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('fixed') && e.target.classList.contains('inset-0')) {
                this.closeModal();
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal();
            }
        });
    }
    
    openModal(modalId, triggerElement = null) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        this.activeModal = modal;
        SynkriaGlobal.state.activeModal = modalId;
        
        // Show modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Animate modal
        gsap.from(modal.querySelector('.inline-block'), {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        gsap.from(modal.querySelector('.fixed'), {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Load modal content if trigger element provided
        if (triggerElement) {
            this.loadModalContent(modalId, triggerElement);
        }
    }
    
    closeModal() {
        if (!this.activeModal) return;
        
        const modal = this.activeModal;
        
        gsap.to(modal.querySelector('.inline-block'), {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        gsap.to(modal.querySelector('.fixed'), {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
                this.activeModal = null;
                SynkriaGlobal.state.activeModal = null;
            }
        });
    }
    
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.modal-tab-btn').forEach(btn => {
            btn.classList.remove('border-primary-500', 'text-primary-600');
            btn.classList.add('border-transparent', 'text-gray-500');
        });
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.remove('border-transparent', 'text-gray-500');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('border-primary-500', 'text-primary-600');
        
        // Update tab content
        document.querySelectorAll('.modal-tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        const activeContent = document.getElementById(`${tabName}-tab`);
        if (activeContent) {
            activeContent.classList.remove('hidden');
            
            // Animate content
            gsap.from(activeContent.children, {
                y: 20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    }
    
    loadModalContent(modalId, triggerElement) {
        // This method would be extended by page-specific scripts
        // to load actual content based on the trigger element
        // Custom logic for communities page
        if (modalId === 'communityModal' && window.CommunitiesPage && window.CommunitiesPage.dataManager) {
            // Find the community id from the card
            const communityId = triggerElement.getAttribute('data-community-id');
            const community = window.CommunitiesPage.dataManager.allCommunities.find(c => c.id == communityId);
            if (community) {
                window.CommunitiesPage.dataManager.loadCommunityModalContent(community);
            }
        }
        // You can add similar logic for other modals if needed
    }
}

/**
 * Notification System
 * Handles toast notifications and alerts
 */
class NotificationManager {
    constructor() {
        this.container = this.createContainer();
        this.notifications = [];
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-20 right-4 z-50 space-y-4';
        document.body.appendChild(container);
        return container;
    }
    
    show(message, type = 'info', duration = 5000) {
        const notification = this.createNotification(message, type);
        this.container.appendChild(notification);
        this.notifications.push(notification);
        
        // Animate in
        gsap.from(notification, {
            x: 400,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
        });
        
        // Auto remove
        setTimeout(() => {
            this.remove(notification);
        }, duration);
        
        return notification;
    }
    
    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification bg-white border-l-4 p-4 rounded-lg shadow-lg max-w-sm ${this.getTypeClasses(type)}`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${this.getTypeIcon(type)} mr-3"></i>
                <p class="text-sm font-medium text-gray-900">${message}</p>
                <button class="ml-auto text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        return notification;
    }
    
    getTypeClasses(type) {
        const classes = {
            success: 'border-green-500',
            error: 'border-red-500',
            warning: 'border-yellow-500',
            info: 'border-blue-500'
        };
        return classes[type] || classes.info;
    }
    
    getTypeIcon(type) {
        const icons = {
            success: 'fa-check-circle text-green-500',
            error: 'fa-exclamation-circle text-red-500',
            warning: 'fa-exclamation-triangle text-yellow-500',
            info: 'fa-info-circle text-blue-500'
        };
        return icons[type] || icons.info;
    }
    
    remove(notification) {
        gsap.to(notification, {
            x: 400,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                this.notifications = this.notifications.filter(n => n !== notification);
            }
        });
    }
}

/**
 * Responsive Manager
 * Handles responsive behavior and device detection
 */
class ResponsiveManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.updateDeviceState();
        this.setupResizeHandler();
    }
    
    updateDeviceState() {
        SynkriaGlobal.state.isMobile = window.innerWidth < SynkriaGlobal.breakpoints.mobile;
        document.body.classList.toggle('is-mobile', SynkriaGlobal.state.isMobile);
    }
    
    setupResizeHandler() {
        const handleResize = SynkriaGlobal.utils.debounce(() => {
            this.updateDeviceState();
            
            // Refresh ScrollTrigger on resize
            ScrollTrigger.refresh();
        }, 250);
        
        window.addEventListener('resize', handleResize);
    }
}

/**
 * Initialize Global Functionality
 * Sets up all global managers and functionality
 */
class SynkriaApp {
    constructor() {
        this.preloader = null;
        this.navigation = null;
        this.animations = null;
        this.modals = null;
        this.notifications = null;
        this.responsive = null;
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        // Initialize all managers
        this.preloader = new PreloaderManager();
        this.navigation = new NavigationManager();
        this.animations = new AnimationManager();
        this.modals = new ModalManager();
        this.notifications = new NotificationManager();
        this.responsive = new ResponsiveManager();
        
        // Setup global event listeners
        this.setupGlobalEvents();
        
        // Expose global API
        this.exposeGlobalAPI();
    }
    
    setupGlobalEvents() {
        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('ajax-form')) {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            }
        });
        
        // Handle filter changes
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('filter-control')) {
                this.handleFilterChange(e.target);
            }
        });
    }
    
    handleFormSubmission(form) {
        // Show loading state
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Loading...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            this.notifications.show('Form submitted successfully!', 'success');
        }, 2000);
    }
    
    handleFilterChange(filter) {
        // Trigger filter update event
        const event = new CustomEvent('filterChange', {
            detail: {
                filter: filter.name,
                value: filter.value
            }
        });
        document.dispatchEvent(event);
    }
    
    exposeGlobalAPI() {
        // Expose global API for use by page-specific scripts
        window.Synkria = {
            // Core functionality
            animations: this.animations,
            modals: this.modals,
            notifications: this.notifications,
            utils: SynkriaGlobal.utils,
            state: SynkriaGlobal.state,
            
            // Helper methods
            showNotification: (message, type, duration) => this.notifications.show(message, type, duration),
            openModal: (modalId, triggerElement) => this.modals.openModal(modalId, triggerElement),
            closeModal: () => this.modals.closeModal(),
            
            // Animation helpers
            animateIn: (elements, options = {}) => {
                const defaults = {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out"
                };
                return gsap.from(elements, { ...defaults, ...options });
            },
            
            animateOut: (elements, options = {}) => {
                const defaults = {
                    y: -30,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out"
                };
                return gsap.to(elements, { ...defaults, ...options });
            }
        };
    }
}

// Initialize the application
const app = new SynkriaApp();

