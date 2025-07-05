/**
 * Communities JavaScript for Synkria Website
 * Handles communities page-specific animations, filtering, and interactions
 * Extends global functionality with community-focused features
 */

/**
 * Communities Hero Animation Manager
 * Manages the hero section animations specific to communities page
 */
class CommunitiesHeroManager {
    constructor() {
        this.heroSection = document.querySelector('.networking-hero, .hero-gradient');
        this.floatingCards = document.querySelectorAll('.floating-community-card');
        this.heroStats = document.querySelectorAll('.stat-item [data-count]');
        this.heroBadge = document.querySelector('.hero-badge');
        this.heroTitle = document.querySelector('.hero-title');
        this.heroDescription = document.querySelector('.hero-description');
        this.heroStats = document.querySelector('.hero-stats');
        this.heroActions = document.querySelector('.hero-actions');
        
        this.init();
    }
    
    init() {
        if (!this.heroSection) return;
        
        this.setupHeroAnimations();
        this.setupFloatingCards();
        this.setupHeroInteractions();
    }
    
    setupHeroAnimations() {
        // Create hero timeline
        const tl = gsap.timeline({ delay: 0.5 });
        
        // Animate hero elements in sequence
        if (this.heroBadge) {
            tl.from(this.heroBadge, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            });
        }
        
        if (this.heroTitle) {
            tl.from(this.heroTitle, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.3");
        }
        
        if (this.heroDescription) {
            tl.from(this.heroDescription, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.4");
        }
        
        if (this.heroStats) {
            tl.from(this.heroStats.children, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.3");
        }
        
        if (this.heroActions) {
            tl.from(this.heroActions.children, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=0.2");
        }
    }
    
    setupFloatingCards() {
        if (!this.floatingCards.length) return;
        
        // Animate floating cards
        this.floatingCards.forEach((card, index) => {
            gsap.from(card, {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                delay: 1 + (index * 0.2),
                ease: "back.out(1.7)"
            });
            
            // Add continuous floating animation
            gsap.to(card, {
                y: "random(-20, 20)",
                x: "random(-10, 10)",
                rotation: "random(-5, 5)",
                duration: "random(4, 6)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    }
    
    setupHeroInteractions() {
        // Hero button interactions
        const primaryBtn = document.querySelector('.hero-btn-primary');
        const secondaryBtn = document.querySelector('.hero-btn-secondary');
        
        if (primaryBtn) {
            primaryBtn.addEventListener('click', () => {
                this.scrollToSection('#searchSection');
            });
        }
        
        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', () => {
                this.openCreateCommunityModal();
            });
        }
        
        // CTA button interactions
        document.querySelectorAll('.cta-btn-primary').forEach(btn => {
            btn.addEventListener('click', () => {
                this.openCreateCommunityModal();
            });
        });
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
    
    openCreateCommunityModal() {
        // Create community creation modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50';
        modal.innerHTML = `
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-2xl max-w-2xl w-full">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-2xl font-bold text-gray-900">Create New Community</h3>
                            <button class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                    </div>
                    <div class="p-6">
                        <form class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Community Name</label>
                                <input type="text" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-0" placeholder="Enter community name">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-0 h-24" placeholder="Describe your community"></textarea>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-0">
                                    <option>Technology</option>
                                    <option>Design</option>
                                    <option>Business</option>
                                    <option>Science</option>
                                    <option>Arts</option>
                                    <option>Language</option>
                                </select>
                            </div>
                            <div class="flex space-x-4 pt-4">
                                <button type="button" class="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    Cancel
                                </button>
                                <button type="submit" class="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200">
                                    Create Community
                                </button>
                            </div>
                        </form>
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
            if (e.target === modal || e.target.closest('button[type="button"]') || e.target.closest('.fa-times')) {
                gsap.to(modal.querySelector('.bg-white'), {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => modal.remove()
                });
            }
        });
        
        // Handle form submission
        modal.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            window.Synkria.showNotification('Community created successfully!', 'success');
            modal.remove();
        });
    }
}

/**
 * Communities Filter Manager
 * Handles filtering, searching, and view toggling
 */
class CommunitiesFilterManager {
    constructor() {
        this.searchInput = document.getElementById('communitySearch');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.activityFilter = document.getElementById('activityFilter');
        this.sizeFilter = document.getElementById('sizeFilter');
        this.sortFilter = document.getElementById('sortFilter');
        this.viewButtons = document.querySelectorAll('.view-btn');
        this.resultsCount = document.getElementById('resultsCount');
        
        this.currentFilters = {
            search: '',
            category: 'all',
            activity: 'all',
            size: 'all',
            sort: 'members'
        };
        this.currentView = 'grid';
        
        this.init();
    }
    
    init() {
        this.setupFilterListeners();
        this.setupViewToggle();
        this.setupSearchDebounce();
    }
    
    setupFilterListeners() {
        // Search input
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.debounce((e) => {
                this.currentFilters.search = e.target.value;
                this.applyFilters();
            }, 300));
        }
        
        // Filter dropdowns
        [this.categoryFilter, this.activityFilter, this.sizeFilter, this.sortFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', (e) => {
                    const filterType = filter.id.replace('Filter', '');
                    this.currentFilters[filterType] = e.target.value;
                    this.applyFilters();
                });
            }
        });
    }
    
    setupViewToggle() {
        this.viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.getAttribute('data-view');
                this.setActiveView(btn, view);
                this.toggleView(view);
            });
        });
    }
    
    setupSearchDebounce() {
        // Add search button functionality
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.applyFilters();
            });
        }
    }
    
    setActiveView(activeButton, view) {
        // Update button states
        this.viewButtons.forEach(btn => {
            btn.classList.remove('bg-white', 'text-primary-600', 'shadow-sm');
            btn.classList.add('text-gray-600');
        });
        
        activeButton.classList.add('bg-white', 'text-primary-600', 'shadow-sm');
        activeButton.classList.remove('text-gray-600');
        
        this.currentView = view;
    }
    
    toggleView(view) {
        const grid = document.querySelector('.communities-grid');
        if (!grid) return;
        
        if (view === 'list') {
            grid.classList.remove('grid', 'md:grid-cols-2', 'lg:grid-cols-3');
            grid.classList.add('space-y-4');
            
            // Update card styles for list view
            grid.querySelectorAll('.community-card').forEach(card => {
                card.classList.add('flex', 'items-center', 'space-x-6');
            });
        } else {
            grid.classList.add('grid', 'md:grid-cols-2', 'lg:grid-cols-3');
            grid.classList.remove('space-y-4');
            
            // Reset card styles for grid view
            grid.querySelectorAll('.community-card').forEach(card => {
                card.classList.remove('flex', 'items-center', 'space-x-6');
            });
        }
        
        // Animate view change
        gsap.from(grid.children, {
            opacity: 0,
            y: 20,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out"
        });
    }
    
    applyFilters() {
        // Trigger filter change event
        const event = new CustomEvent('communitiesFilterChange', {
            detail: {
                filters: this.currentFilters,
                view: this.currentView
            }
        });
        document.dispatchEvent(event);
    }
    
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
    
    updateResultsCount(count) {
        if (this.resultsCount) {
            this.resultsCount.textContent = count.toLocaleString();
        }
    }
}

/**
 * Communities Data Manager
 * Handles community data, loading, and rendering
 */
class CommunitiesDataManager {
    constructor() {
        this.featuredGrid = document.getElementById('featuredGrid');
        this.communitiesGrid = document.getElementById('communitiesGrid');
        this.loadMoreButton = document.getElementById('loadMoreCommunities');
        
        this.currentPage = 1;
        this.itemsPerPage = 9;
        this.allCommunities = this.generateMockCommunities();
        this.filteredCommunities = [...this.allCommunities];
        
        this.init();
    }
    
    init() {
        this.loadFeaturedCommunities();
        this.loadCommunities();
        this.setupLoadMore();
        this.setupFilterListener();
    }
    
    generateMockCommunities() {
        const categories = ['technology', 'design', 'business', 'science', 'arts', 'language'];
        const activities = ['very-active', 'active', 'moderate', 'new'];
        const sizes = ['large', 'medium', 'small', 'intimate'];
        
        const communityNames = [
            'Web Development Hub', 'AI & Machine Learning', 'Design Masters', 'Startup Founders',
            'Data Science Community', 'UX/UI Designers', 'React Developers', 'Python Programmers',
            'Digital Marketing', 'Blockchain Enthusiasts', 'Mobile App Developers', 'DevOps Engineers',
            'Graphic Designers', 'Content Creators', 'Product Managers', 'Cybersecurity Experts',
            'Cloud Computing', 'Game Developers', 'Frontend Masters', 'Backend Engineers'
        ];
        
        return Array.from({ length: 50 }, (_, index) => ({
            id: index + 1,
            name: communityNames[index % communityNames.length],
            description: 'A vibrant community of learners and professionals sharing knowledge and growing together.',
            category: categories[index % categories.length],
            activity: activities[index % activities.length],
            size: sizes[index % sizes.length],
            memberCount: Math.floor(Math.random() * 5000) + 100,
            postCount: Math.floor(Math.random() * 1000) + 50,
            resourceCount: Math.floor(Math.random() * 100) + 10,
            image: `https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=300&fit=crop`,
            tags: this.generateTags(categories[index % categories.length]),
            featured: index < 6,
            createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
        }));
    }
    
    generateTags(category) {
        const tagMap = {
            technology: ['JavaScript', 'React', 'Node.js', 'Python'],
            design: ['UI/UX', 'Figma', 'Adobe', 'Sketch'],
            business: ['Startup', 'Marketing', 'Strategy', 'Growth'],
            science: ['Research', 'Data', 'Analysis', 'Innovation'],
            arts: ['Creative', 'Visual', 'Digital', 'Traditional'],
            language: ['Learning', 'Practice', 'Culture', 'Exchange']
        };
        
        const tags = tagMap[category] || ['General', 'Community', 'Learning'];
        return tags.slice(0, Math.floor(Math.random() * 3) + 2);
    }
    
    loadFeaturedCommunities() {
        if (!this.featuredGrid) return;
        
        const featured = this.allCommunities.filter(c => c.featured);
        this.renderCommunities(featured, this.featuredGrid);
    }
    
    loadCommunities() {
        if (!this.communitiesGrid) return;
        
        const startIndex = 0;
        const endIndex = this.currentPage * this.itemsPerPage;
        const communitiesToShow = this.filteredCommunities.slice(startIndex, endIndex);
        
        this.renderCommunities(communitiesToShow, this.communitiesGrid);
        this.updateLoadMoreButton();
    }
    
    renderCommunities(communities, container) {
        if (container === this.communitiesGrid && this.currentPage === 1) {
            container.innerHTML = '';
        }
        
        communities.forEach((community, index) => {
            const communityElement = this.createCommunityCard(community);
            container.appendChild(communityElement);
        });
        
        // Animate new communities
        const newCards = container.querySelectorAll('.community-card:not(.animated)');
        newCards.forEach(card => card.classList.add('animated'));
        
        gsap.from(newCards, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    }
    
    createCommunityCard(community) {
        const card = document.createElement('div');
        card.className = 'community-card card-hover bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer';
        card.setAttribute('data-community-id', community.id);
        
        card.innerHTML = `
            <div class="aspect-video bg-gray-200 overflow-hidden">
                <img src="${community.image}" alt="${community.name}" 
                     class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                     onerror="this.src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'">
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                    <span class="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium capitalize">
                        ${community.category}
                    </span>
                    <div class="flex items-center space-x-1">
                        <div class="w-2 h-2 rounded-full ${this.getActivityColor(community.activity)}"></div>
                        <span class="text-xs text-gray-500 capitalize">${community.activity.replace('-', ' ')}</span>
                    </div>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">${community.name}</h3>
                <p class="text-gray-600 mb-4 line-clamp-2">${community.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${community.tags.map(tag => `
                        <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">${tag}</span>
                    `).join('')}
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <span><i class="fas fa-users mr-1"></i>${community.memberCount.toLocaleString()}</span>
                        <span><i class="fas fa-edit mr-1"></i>${community.postCount}</span>
                    </div>
                    <button class="text-primary-600 hover:text-primary-700 transition-colors duration-200">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add click handler
        card.addEventListener('click', () => {
            this.openCommunityModal(community);
        });
        
        return card;
    }
    
    getActivityColor(activity) {
        const colors = {
            'very-active': 'bg-green-500',
            'active': 'bg-blue-500',
            'moderate': 'bg-yellow-500',
            'new': 'bg-gray-500'
        };
        return colors[activity] || 'bg-gray-500';
    }
    
    setupLoadMore() {
        if (!this.loadMoreButton) return;
        
        this.loadMoreButton.addEventListener('click', () => {
            this.currentPage++;
            this.loadCommunities();
        });
    }
    
    updateLoadMoreButton() {
        if (!this.loadMoreButton) return;
        
        const hasMore = (this.currentPage * this.itemsPerPage) < this.filteredCommunities.length;
        this.loadMoreButton.style.display = hasMore ? 'inline-flex' : 'none';
    }
    
    setupFilterListener() {
        document.addEventListener('communitiesFilterChange', (e) => {
            this.applyFilters(e.detail.filters);
        });
    }
    
    applyFilters(filters) {
        this.filteredCommunities = this.allCommunities.filter(community => {
            // Search filter
            if (filters.search && !community.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }
            
            // Category filter
            if (filters.category !== 'all' && community.category !== filters.category) {
                return false;
            }
            
            // Activity filter
            if (filters.activity !== 'all' && community.activity !== filters.activity) {
                return false;
            }
            
            // Size filter
            if (filters.size !== 'all' && community.size !== filters.size) {
                return false;
            }
            
            return true;
        });
        
        // Apply sorting
        this.sortCommunities(filters.sort);
        
        // Reset pagination and reload
        this.currentPage = 1;
        this.loadCommunities();
        
        // Update results count
        if (window.communitiesFilter) {
            window.communitiesFilter.updateResultsCount(this.filteredCommunities.length);
        }
    }
    
    sortCommunities(sortBy) {
        switch (sortBy) {
            case 'members':
                this.filteredCommunities.sort((a, b) => b.memberCount - a.memberCount);
                break;
            case 'activity':
                const activityOrder = { 'very-active': 4, 'active': 3, 'moderate': 2, 'new': 1 };
                this.filteredCommunities.sort((a, b) => activityOrder[b.activity] - activityOrder[a.activity]);
                break;
            case 'newest':
                this.filteredCommunities.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case 'name':
                this.filteredCommunities.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }
    
    openCommunityModal(community) {
        // Use global modal manager
        if (window.Synkria && window.Synkria.modals) {
            window.Synkria.modals.openModal('communityModal');
            this.loadCommunityModalContent(community);
        }
    }
    
    loadCommunityModalContent(community) {
        // Update modal content
        const modal = document.getElementById('communityModal');
        if (!modal) return;
        
        // Update header
        const avatar = modal.querySelector('#modalCommunityAvatar i');
        const name = modal.querySelector('#modalCommunityName');
        const meta = modal.querySelector('#modalCommunityMeta');
        const tags = modal.querySelector('#modalCommunityTags');
        
        if (avatar) avatar.className = this.getCommunityIcon(community.category);
        if (name) name.textContent = community.name;
        if (meta) meta.textContent = `${community.memberCount.toLocaleString()} members • ${community.activity.replace('-', ' ')}`;
        if (tags) {
            tags.innerHTML = community.tags.map(tag => 
                `<span class="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">${tag}</span>`
            ).join('');
        }
        
        // Update footer stats
        const memberCount = modal.querySelector('#modalMemberCount');
        const postCount = modal.querySelector('#modalPostCount');
        const resourceCount = modal.querySelector('#modalResourceCount');
        
        if (memberCount) memberCount.textContent = community.memberCount.toLocaleString();
        if (postCount) postCount.textContent = community.postCount;
        if (resourceCount) resourceCount.textContent = community.resourceCount;
        
        // Load tab content
        this.loadModalTabContent(community);
    }
    
    getCommunityIcon(category) {
        const icons = {
            technology: 'fas fa-code text-white text-2xl',
            design: 'fas fa-palette text-white text-2xl',
            business: 'fas fa-briefcase text-white text-2xl',
            science: 'fas fa-flask text-white text-2xl',
            arts: 'fas fa-paint-brush text-white text-2xl',
            language: 'fas fa-language text-white text-2xl'
        };
        return icons[category] || 'fas fa-users text-white text-2xl';
    }
    
    loadModalTabContent(community) {
        // Load posts tab content
        const postsContent = document.querySelector('#posts-tab .posts-content');
        if (postsContent) {
            postsContent.innerHTML = `
                <div class="space-y-4">
                    ${Array.from({ length: 5 }, (_, i) => `
                        <div class="border border-gray-200 rounded-xl p-4">
                            <div class="flex items-center space-x-3 mb-3">
                                <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                                    <span class="text-white font-medium">U${i + 1}</span>
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">User ${i + 1}</p>
                                    <p class="text-sm text-gray-500">${Math.floor(Math.random() * 24)} hours ago</p>
                                </div>
                            </div>
                            <p class="text-gray-700">This is a sample post content for the community. It shows how posts would appear in the modal.</p>
                            <div class="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                                <button class="hover:text-primary-600 transition-colors duration-200">
                                    <i class="fas fa-heart mr-1"></i>${Math.floor(Math.random() * 50)}
                                </button>
                                <button class="hover:text-primary-600 transition-colors duration-200">
                                    <i class="fas fa-comment mr-1"></i>${Math.floor(Math.random() * 20)}
                                </button>
                                <button class="hover:text-primary-600 transition-colors duration-200">
                                    <i class="fas fa-share mr-1"></i>Share
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
}

/**
 * Communities Page Main Class
 * Coordinates all communities page functionality
 */
class CommunitiesPage {
    constructor() {
        this.heroManager = null;
        this.filterManager = null;
        this.dataManager = null;
        
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
        // Initialize communities managers
        this.heroManager = new CommunitiesHeroManager();
        this.filterManager = new CommunitiesFilterManager();
        this.dataManager = new CommunitiesDataManager();
        
        // Store filter manager globally for cross-component access
        window.communitiesFilter = this.filterManager;
        
        // Setup page-specific interactions
        this.setupPageInteractions();
        
        // Expose communities API
        this.exposeAPI();
    }
    
    setupPageInteractions() {
        // Setup scroll animations for sections
        this.setupScrollAnimations();
    }
    
    setupScrollAnimations() {
        // Animate featured section
        const featuredSection = document.querySelector('.featured-section');
        if (featuredSection) {
            ScrollTrigger.create({
                trigger: featuredSection,
                start: "top 70%",
                onEnter: () => {
                    gsap.from(featuredSection.querySelectorAll('.community-card'), {
                        y: 60,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out"
                    });
                }
            });
        }
    }
    
    exposeAPI() {
        // Expose communities-specific functionality
        window.CommunitiesPage = {
            heroManager: this.heroManager,
            filterManager: this.filterManager,
            dataManager: this.dataManager
        };
    }
}

// Initialize communities page when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CommunitiesPage());
} else {
    new CommunitiesPage();
}

