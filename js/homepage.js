/**
 * Homepage JavaScript for Synkria Website
 * Handles homepage-specific animations, interactions, and content management
 * Extends global functionality with page-specific features
 */

/**
 * Homepage Hero Animation Manager
 * Manages the animated word display and hero section animations
 */
class HeroAnimationManager {
    constructor() {
        this.animatedWordElement = document.getElementById('heroAnimatedWord');
        this.brandShowcase = document.getElementById('brandShowcase');
        this.words = ['Connect', 'Learn', 'Grow', 'Discover', 'Collaborate', 'Innovate'];
        this.currentWordIndex = 0;
        this.isAnimating = false;
        
        this.init();
        // Removed fallback setTimeout for .brand-showcase
    }
    
    init() {
        if (!this.animatedWordElement || !this.brandShowcase) return;
        
        this.startWordAnimation();
        this.setupHeroInteractions();
    }
    
    startWordAnimation() {
        // Initial word display
        this.animatedWordElement.textContent = this.words[0];
        
        // Animate first word in
        gsap.to(this.animatedWordElement, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            delay: 0.5
        });
        
        // Start word cycling
        setTimeout(() => {
            this.cycleWords();
        }, 2000);
    }
    
    cycleWords() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const tl = gsap.timeline({
            onComplete: () => {
                this.isAnimating = false;
                
                // Continue cycling or show brand
                if (this.currentWordIndex < this.words.length - 1) {
                    setTimeout(() => this.cycleWords(), 1500);
                } else {
                    setTimeout(() => this.showBrandShowcase(), 1000);
                }
            }
        });
        
        // Animate current word out
        tl.to(this.animatedWordElement, {
            opacity: 0,
            scale: 0.8,
            rotation: 10,
            duration: 0.5,
            ease: "power2.in"
        });
        
        // Change word and animate in
        tl.call(() => {
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            this.animatedWordElement.textContent = this.words[this.currentWordIndex];
        });
        
        tl.to(this.animatedWordElement, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        });
    }
    
    showBrandShowcase() {
        const tl = gsap.timeline();
        
        // Hide animated word
        tl.to(this.animatedWordElement, {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            ease: "power2.in"
        });
        
        // Show brand showcase
        tl.call(() => {
            this.brandShowcase.classList.add('visible');
        });
        
        // Animate brand elements
        tl.from('#brandName', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        })
        .from('#brandTagline', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5");
        if (document.querySelector('.hero-btn-primary') || document.querySelector('.hero-btn-secondary')) {
            tl.from('.hero-btn-primary, .hero-btn-secondary', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=0.3");
        }
    }
    
    setupHeroInteractions() {
        // Hero button interactions
        const primaryBtn = document.querySelector('.hero-btn-primary');
        const secondaryBtn = document.querySelector('.hero-btn-secondary');
        
        if (primaryBtn) {
            primaryBtn.addEventListener('click', () => {
                this.scrollToSection('#interestSection');
            });
        }
        
        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', () => {
                this.showVideoModal();
            });
        }
        
        // Scroll indicator interaction
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                this.scrollToSection('#interestSection');
            });
        }
    }
    
    scrollToSection(selector) {
        const target = document.querySelector(selector);
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: "power2.out"
            });
        }
    }
    
    showVideoModal() {
        // Create and show video modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75';
        modal.innerHTML = `
            <div class="relative max-w-4xl w-full mx-4">
                <button class="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors duration-200">
                    <i class="fas fa-times"></i>
                </button>
                <div class="aspect-video bg-gray-900 rounded-xl overflow-hidden">
                    <div class="flex items-center justify-center h-full text-white">
                        <div class="text-center">
                            <i class="fas fa-play text-6xl mb-4 opacity-50"></i>
                            <p class="text-xl">Demo video would play here</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate modal in
        gsap.from(modal, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Close modal functionality
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('button')) {
                gsap.to(modal, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => modal.remove()
                });
            }
        });
    }
}

/**
 * Interest Selection Manager
 * Handles the interest selection section interactions
 */
class InterestSelectionManager {
    constructor() {
        this.interestCards = document.querySelectorAll('.interest-card');
        this.selectedInterests = new Set();
        this.maxSelections = 5;
        
        this.init();
    }
    
    init() {
        if (!this.interestCards.length) return;
        
        this.setupInterestSelection();
        this.animateInterestCards();
    }
    
    setupInterestSelection() {
        this.interestCards.forEach(card => {
            card.addEventListener('click', () => {
                this.toggleInterest(card);
            });
            
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('selected')) {
                    gsap.to(card, {
                        y: -4,
                        scale: 1.02,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('selected')) {
                    gsap.to(card, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
    }
    
    toggleInterest(card) {
        const interest = card.getAttribute('data-interest');
        const isSelected = card.classList.contains('selected');
        
        if (isSelected) {
            // Deselect
            this.selectedInterests.delete(interest);
            card.classList.remove('selected');
            
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            // Check if max selections reached
            if (this.selectedInterests.size >= this.maxSelections) {
                window.Synkria.showNotification(
                    `You can select up to ${this.maxSelections} interests`,
                    'warning'
                );
                return;
            }
            
            // Select
            this.selectedInterests.add(interest);
            card.classList.add('selected');
            
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        }
        
        // Update UI based on selections
        this.updateSelectionFeedback();
    }
    
    updateSelectionFeedback() {
        // Show selection count
        const count = this.selectedInterests.size;
        if (count > 0) {
            window.Synkria.showNotification(
                `${count} interest${count > 1 ? 's' : ''} selected`,
                'info',
                2000
            );
        }
        
        // Enable/disable continue button if it exists
        const continueBtn = document.querySelector('.interests-continue-btn');
        if (continueBtn) {
            continueBtn.disabled = count === 0;
            continueBtn.classList.toggle('opacity-50', count === 0);
        }
    }
    
    animateInterestCards() {
        // Animate cards on scroll
        ScrollTrigger.create({
            trigger: '#interestSection',
            start: "top 70%",
            onEnter: () => {
                gsap.from(this.interestCards, {
                    y: 40,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out"
                });
            }
        });
    }
}

/**
 * News Section Manager
 * Handles news filtering, loading, and display
 */
class NewsSectionManager {
    constructor() {
        this.newsGrid = document.getElementById('newsGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.loadMoreButton = document.getElementById('loadMoreNews');
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.itemsPerPage = 6;
        
        // Mock news data
        this.newsData = this.generateMockNews();
        
        this.init();
    }
    
    init() {
        if (!this.newsGrid) return;
        
        this.setupFilters();
        this.setupLoadMore();
        this.loadNews();
    }
    
    generateMockNews() {
        const categories = ['technology', 'education', 'career'];
        const titles = [
            'The Future of AI in Education',
            'Remote Learning Best Practices',
            'Career Growth in Tech Industry',
            'Building Effective Learning Communities',
            'Digital Transformation in Education',
            'Networking Strategies for Professionals',
            'Emerging Technologies in 2024',
            'Skills for the Future Workforce',
            'Online Education Trends',
            'Professional Development Tips',
            'Innovation in EdTech',
            'Building Your Personal Brand'
        ];

        const myImages = {
            'The Future of AI in Education': 'assets/FutureO.jpg',
            'Remote Learning Best Practices': 'assets/RemoteLearnngB.jpg',
            'Career Growth in Tech Industry': 'assets/CarrierG.jpg',
            'Building Effective Learning Communities': 'assets/BuildingE.jpg',
            'Digital Transformation in Education': 'assets/DigitalT.jpg',
            'Networking Strategies for Professionals': 'assets/NetworkingS.jpg',
            'Emerging Technologies in 2024': 'assets/EmergingT.jpg',
            'Skills for the Future Workforce': 'assets/SkillsF.jpg',
            'Online Education Trends': 'assets/OnlineE.jpg',
            'Professional Development Tips': 'assets/PersonalD.jpg',
            'Innovation in EdTech': 'assets/InnovationE.jpeg',
            'Building Your Personal Brand': 'assets/personalB.png'
        };

        return Array.from({ length: 24 }, (_, index) => ({
            id: index + 1,
            title: titles[index % titles.length],
            category: categories[index % categories.length],
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: myImages[titles[index % titles.length]] || 'assets/default.jpg',
            author: `Author ${index + 1}`,
            date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            readTime: Math.floor(Math.random() * 10) + 3
        }));
    }
    
    setupFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.setActiveFilter(button, filter);
                this.filterNews(filter);
            });
        });
    }
    
    setActiveFilter(activeButton, filter) {
        // Update button states
        this.filterButtons.forEach(btn => {
            btn.classList.remove('bg-white', 'text-primary-600', 'shadow-sm');
            btn.classList.add('text-gray-600');
        });
        
        activeButton.classList.add('bg-white', 'text-primary-600', 'shadow-sm');
        activeButton.classList.remove('text-gray-600');
        
        this.currentFilter = filter;
        this.currentPage = 1;
    }
    
    filterNews(filter) {
        // Animate out current news
        gsap.to(this.newsGrid.children, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
            onComplete: () => {
                this.loadNews();
            }
        });
    }
    
    loadNews() {
        const filteredNews = this.getFilteredNews();
        const newsToShow = filteredNews.slice(0, this.currentPage * this.itemsPerPage);
        
        this.renderNews(newsToShow);
        this.updateLoadMoreButton(filteredNews.length > newsToShow.length);
    }
    
    getFilteredNews() {
        if (this.currentFilter === 'all') {
            return this.newsData;
        }
        return this.newsData.filter(article => article.category === this.currentFilter);
    }
    
    renderNews(articles) {
        this.newsGrid.innerHTML = '';
        
        articles.forEach((article, index) => {
            const articleElement = this.createNewsCard(article);
            this.newsGrid.appendChild(articleElement);
        });
        
        // Animate in new articles
        gsap.from(this.newsGrid.children, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    }
    
    createNewsCard(article) {
        const card = document.createElement('div');
        card.className = 'card-hover bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer';
        card.innerHTML = `
            <div class="aspect-video bg-gray-200 overflow-hidden">
                <img src="${article.image}" alt="${article.title}" 
                     class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                     onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'">
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                    <span class="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium capitalize">
                        ${article.category}
                    </span>
                    <span class="text-gray-500 text-sm">${article.readTime} min read</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">${article.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">${article.excerpt}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                            <span class="text-white text-sm font-medium">${article.author.charAt(0)}</span>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-900">${article.author}</p>
                            <p class="text-xs text-gray-500">${article.date}</p>
                        </div>
                    </div>
                    <button class="text-primary-600 hover:text-primary-700 transition-colors duration-200">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add click handler
        card.addEventListener('click', () => {
            this.openArticle(article);
        });
        
        return card;
    }
    
    setupLoadMore() {
        if (!this.loadMoreButton) return;
        
        this.loadMoreButton.addEventListener('click', () => {
            this.currentPage++;
            this.loadNews();
        });
    }
    
    updateLoadMoreButton(hasMore) {
        if (!this.loadMoreButton) return;
        
        this.loadMoreButton.style.display = hasMore ? 'inline-flex' : 'none';
    }
    
    openArticle(article) {
        // Create article modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50';
        modal.innerHTML = `
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
                    <div class="relative">
                        <img src="${article.image}" alt="${article.title}" class="w-full h-64 object-cover">
                        <button class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="p-8">
                        <div class="flex items-center justify-between mb-6">
                            <span class="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium capitalize">
                                ${article.category}
                            </span>
                            <span class="text-gray-500">${article.readTime} min read</span>
                        </div>
                        <h1 class="text-3xl font-bold text-gray-900 mb-4">${article.title}</h1>
                        <div class="flex items-center space-x-4 mb-6">
                            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                                <span class="text-white font-medium">${article.author.charAt(0)}</span>
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">${article.author}</p>
                                <p class="text-gray-500">${article.date}</p>
                            </div>
                        </div>
                        <div class="prose max-w-none">
                            <p class="text-lg text-gray-700 leading-relaxed mb-6">${article.excerpt}</p>
                            <p class="text-gray-700 leading-relaxed mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p class="text-gray-700 leading-relaxed mb-4">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <p class="text-gray-700 leading-relaxed">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate modal in
        gsap.from(modal.querySelector('.bg-white'), {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Close modal functionality
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('button')) {
                gsap.to(modal.querySelector('.bg-white'), {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => modal.remove()
                });
            }
        });
    }
}

/**
 * Homepage Features Animation Manager
 * Handles animations for the features section
 */
class FeaturesAnimationManager {
    constructor() {
        this.featuresSection = document.getElementById('featuresSection');
        this.featureCards = document.querySelectorAll('#featuresSection .card-hover');
        
        this.init();
    }
    
    init() {
        if (!this.featuresSection) return;
        
        this.setupFeatureAnimations();
        this.setupFeatureInteractions();
        this.setupResizeHandler();
    }
    
    setupResizeHandler() {
        // Handle window resize to recalculate scroll distances
        const resizeHandler = SynkriaGlobal.utils.debounce(() => {
            const scrollContainer = document.getElementById('featuresHorizontalScroll');
            const scrollInner = scrollContainer ? scrollContainer.querySelector('.horizontal-scroll-inner') : null;
            
            if (scrollContainer && scrollInner) {
                // Kill existing ScrollTrigger
                ScrollTrigger.getAll().forEach(trigger => {
                    if (trigger.vars.trigger === scrollContainer) {
                        trigger.kill();
                    }
                });
                // Reinitialize horizontal scroll
                // setTimeout(() => {
                //     this.initializeHorizontalScroll(scrollContainer, scrollInner);
                // }, 100);
            }
        }, 250);
        
        window.addEventListener('resize', resizeHandler);
    }
    
    setupFeatureAnimations() {
        // Simple carousel/slider for features section with autoplay
        const scrollContainer = document.getElementById('featuresHorizontalScroll');
        const scrollInner = scrollContainer ? scrollContainer.querySelector('.horizontal-scroll-inner') : null;
        const cards = scrollInner ? Array.from(scrollInner.children) : [];
        const prevBtn = document.getElementById('featuresPrevBtn');
        const nextBtn = document.getElementById('featuresNextBtn');
        if (!scrollContainer || !scrollInner || !cards.length) return;

        function getCardsPerView() {
            if (window.innerWidth < 640) return 1;
            if (window.innerWidth < 1024) return 2;
            return 3;
        }

        let currentIndex = 0;
        let cardsPerView = getCardsPerView();
        let autoplayInterval = null;
        // Removed isHovered logic

        function updateCarousel() {
            cardsPerView = getCardsPerView();
            if (currentIndex > cards.length - cardsPerView) {
                currentIndex = Math.max(0, cards.length - cardsPerView);
            }
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(cards[0]).marginRight) || 0;
            const offset = (cardWidth + gap) * currentIndex;
            scrollInner.style.transform = `translateX(-${offset}px)`;
            if (prevBtn) prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
            if (nextBtn) nextBtn.style.visibility = currentIndex >= cards.length - cardsPerView ? 'hidden' : 'visible';
        }

        function goToNext() {
            if (currentIndex < cards.length - cardsPerView) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop to start
            }
            updateCarousel();
        }

        function goToPrev() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = cards.length - cardsPerView; // Loop to end
            }
            updateCarousel();
        }

        function startAutoplay() {
            if (autoplayInterval) clearInterval(autoplayInterval);
            autoplayInterval = setInterval(() => {
                goToNext(); // Always auto-scroll, never pause
            }, 3000);
        }

        function stopAutoplay() {
            if (autoplayInterval) clearInterval(autoplayInterval);
        }

        if (prevBtn) {
            prevBtn.classList.remove('hidden');
            prevBtn.onclick = () => {
                goToPrev();
                startAutoplay(); // Reset timer
            };
        }
        if (nextBtn) {
            nextBtn.classList.remove('hidden');
            nextBtn.onclick = () => {
                goToNext();
                startAutoplay(); // Reset timer
            };
        }

        // Touch/swipe support
        let startX = 0;
        let isDragging = false;
        let dragOffset = 0;
        scrollInner.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            dragOffset = 0;
        });
        scrollInner.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            dragOffset = e.touches[0].clientX - startX;
        });
        scrollInner.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            if (dragOffset < -50 && currentIndex < cards.length - cardsPerView) {
                currentIndex++;
                updateCarousel();
                startAutoplay(); // Reset timer
            } else if (dragOffset > 50 && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
                startAutoplay(); // Reset timer
            }
        });

        // Removed mouseenter/mouseleave event listeners for autoplay pause

        // Responsive
        window.addEventListener('resize', () => {
            updateCarousel();
        });

        // Initial update and autoplay
        updateCarousel();
        startAutoplay();
    }
    
    setupFeatureInteractions() {
        this.featureCards.forEach((card, index) => {
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -12,
                    scale: 1.02,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                // Animate icon
                const icon = card.querySelector('.w-16 i');
                if (icon) {
                    gsap.to(icon, {
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                // Reset icon
                const icon = card.querySelector('.w-16 i');
                if (icon) {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
            
            // Click interactions
            card.addEventListener('click', () => {
                const link = card.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
            });
        });
    }
}

/**
 * Homepage Main Class
 * Coordinates all homepage functionality
 */
class Homepage {
    constructor() {
        this.heroAnimation = null;
        this.interestSelection = null;
        this.newsSection = null;
        this.featuresAnimation = null;
        
        this.init();
    }
    
    init() {
        // Wait for global app to be ready
        if (window.Synkria) {
            this.setup();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.setup(), 100);
            });
        }
    }
    
    setup() {
        // Initialize homepage managers
        this.heroAnimation = new HeroAnimationManager();
        this.interestSelection = new InterestSelectionManager();
        this.newsSection = new NewsSectionManager();
        this.featuresAnimation = new FeaturesAnimationManager();
        
        // Setup page-specific interactions
        this.setupPageInteractions();
        
        // Expose homepage API
        this.exposeAPI();
    }
    
    setupPageInteractions() {
        // CTA button interactions
        document.querySelectorAll('.cta-btn-primary').forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = 'communities.html';
            });
        });
        
        // Handle interest-based recommendations
        document.addEventListener('interestSelected', (e) => {
            this.updateRecommendations(e.detail.interests);
        });
    }
    
    updateRecommendations(interests) {
        // Update content based on selected interests
        console.log('Updating recommendations for interests:', interests);
        
        // This would typically make API calls to get personalized content
        window.Synkria.showNotification(
            'Recommendations updated based on your interests!',
            'success'
        );
    }
    
    exposeAPI() {
        // Expose homepage-specific functionality
        window.Homepage = {
            heroAnimation: this.heroAnimation,
            interestSelection: this.interestSelection,
            newsSection: this.newsSection,
            featuresAnimation: this.featuresAnimation
        };
    }
}

// Initialize homepage when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new Homepage());
} else {
    new Homepage();
}

