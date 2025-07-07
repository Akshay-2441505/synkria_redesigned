/**
 * Networking JavaScript for Synkria Website
 * Handles networking page-specific animations, filtering, and interactions
 * Extends global functionality with professional networking features
 */

/**
 * Networking Hero Animation Manager
 * Manages the hero section animations with connection web visualization
 */
class NetworkingHeroManager {
    constructor() {
        this.heroSection = document.querySelector('.networking-hero');
        this.connectionWeb = document.querySelector('.connection-web');
        this.floatingNotifications = document.querySelectorAll('.floating-notification');
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
        this.setupConnectionWeb();
        this.setupFloatingNotifications();
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
    
    setupConnectionWeb() {
        if (!this.connectionWeb) return;
        
        const centralProfile = this.connectionWeb.querySelector('.central-profile');
        const connectedProfiles = this.connectionWeb.querySelectorAll('.connected-profile');
        const connectionLines = this.connectionWeb.querySelectorAll('.connection-line');
        
        // Animate central profile
        if (centralProfile) {
            gsap.from(centralProfile, {
                scale: 0,
                rotation: 180,
                duration: 1,
                delay: 1,
                ease: "back.out(1.7)"
            });
        }
        
        // Animate connected profiles
        connectedProfiles.forEach((profile, index) => {
            gsap.from(profile, {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                delay: 1.5 + (index * 0.1),
                ease: "back.out(1.7)"
            });
            
            // Add hover interactions
            profile.addEventListener('mouseenter', () => {
                gsap.to(profile, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            profile.addEventListener('mouseleave', () => {
                gsap.to(profile, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
        
        // Animate connection lines
        connectionLines.forEach((line, index) => {
            gsap.from(line, {
                scaleX: 0,
                opacity: 0,
                duration: 0.8,
                delay: 2 + (index * 0.1),
                ease: "power2.out"
            });
            
            // Add pulsing animation
            gsap.to(line, {
                opacity: 0.3,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 3 + (index * 0.2)
            });
        });
        
        // Add continuous animations
        this.addContinuousWebAnimations();
    }
    
    addContinuousWebAnimations() {
        const connectedProfiles = this.connectionWeb.querySelectorAll('.connected-profile');
        
        connectedProfiles.forEach((profile, index) => {
            // Floating animation
            gsap.to(profile, {
                y: "random(-15, 15)",
                x: "random(-10, 10)",
                duration: "random(4, 6)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.5
            });
            
            // Subtle rotation
            gsap.to(profile, {
                rotation: "random(-5, 5)",
                duration: "random(8, 12)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.3
            });
        });
    }
    
    setupFloatingNotifications() {
        if (!this.floatingNotifications.length) return;
        
        this.floatingNotifications.forEach((notification, index) => {
            // Initial animation
            gsap.from(notification, {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                delay: 2.5 + (index * 0.3),
                ease: "back.out(1.7)"
            });
            
            // Continuous floating
            gsap.to(notification, {
                y: "random(-20, 20)",
                x: "random(-15, 15)",
                duration: "random(6, 8)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.8
            });
            
            // Hover interactions
            notification.addEventListener('mouseenter', () => {
                gsap.to(notification, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            notification.addEventListener('mouseleave', () => {
                gsap.to(notification, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            // Click to dismiss
            notification.addEventListener('click', () => {
                gsap.to(notification, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        notification.style.display = 'none';
                    }
                });
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
                this.scrollToSection('#eventsSection');
            });
        }
        
        // CTA button interactions
        document.querySelectorAll('.cta-btn-primary').forEach(btn => {
            btn.addEventListener('click', () => {
                this.scrollToSection('#professionalsSection');
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
}

/**
 * Networking Filter Manager
 * Handles professional filtering, searching, and view toggling
 */
class NetworkingFilterManager {
    constructor() {
        this.searchInput = document.getElementById('professionalSearch');
        this.industryFilter = document.getElementById('industryFilter');
        this.experienceFilter = document.getElementById('experienceFilter');
        this.locationFilter = document.getElementById('locationFilter');
        this.connectionFilter = document.getElementById('connectionFilter');
        this.viewButtons = document.querySelectorAll('.view-btn');
        this.resultsCount = document.getElementById('resultsCount');
        
        this.currentFilters = {
            search: '',
            industry: 'all',
            experience: 'all',
            location: 'all',
            connection: 'all'
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
        [this.industryFilter, this.experienceFilter, this.locationFilter, this.connectionFilter].forEach(filter => {
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
        const grid = document.querySelector('.professionals-grid');
        if (!grid) return;
        
        if (view === 'list') {
            grid.classList.remove('grid', 'md:grid-cols-2', 'lg:grid-cols-3');
            grid.classList.add('space-y-4');
            
            // Update card styles for list view
            grid.querySelectorAll('.professional-card').forEach(card => {
                card.classList.add('flex', 'items-center', 'space-x-6');
            });
        } else {
            grid.classList.add('grid', 'md:grid-cols-2', 'lg:grid-cols-3');
            grid.classList.remove('space-y-4');
            
            // Reset card styles for grid view
            grid.querySelectorAll('.professional-card').forEach(card => {
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
        const event = new CustomEvent('networkingFilterChange', {
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
 * Networking Data Manager
 * Handles professional data, events, and rendering
 */
class NetworkingDataManager {
    constructor() {
        this.featuredGrid = document.getElementById('featuredGrid');
        this.professionalsGrid = document.getElementById('professionalsGrid');
        this.eventsGrid = document.getElementById('eventsGrid');
        this.loadMoreButton = document.getElementById('loadMoreProfessionals');
        
        this.currentPage = 1;
        this.itemsPerPage = 9;
        this.allProfessionals = this.generateMockProfessionals();
        this.filteredProfessionals = [...this.allProfessionals];
        this.events = this.generateMockEvents();
        
        this.init();
    }
    
    init() {
        this.loadFeaturedProfessionals();
        this.loadProfessionals();
        this.loadEvents();
        this.setupLoadMore();
        this.setupFilterListener();
    }
    
    generateMockProfessionals() {
        const industries = ['technology', 'finance', 'healthcare', 'education', 'marketing', 'design'];
        const experiences = ['entry', 'mid', 'senior', 'executive'];
        const locations = ['san-francisco', 'new-york', 'london', 'remote'];
        const connections = ['mentors', 'peers', 'leaders', 'recruiters'];
        
        const names = [
            'Sarah Chen', 'Michael Rodriguez', 'Emily Johnson', 'David Kim', 'Jessica Brown',
            'Alex Thompson', 'Maria Garcia', 'James Wilson', 'Lisa Wang', 'Robert Davis',
            'Amanda Miller', 'Kevin Lee', 'Rachel Green', 'Daniel Martinez', 'Sophie Taylor'
        ];
        
        const titles = [
            'Senior Software Engineer', 'Product Manager', 'UX Designer', 'Data Scientist',
            'Marketing Director', 'Financial Analyst', 'DevOps Engineer', 'Research Scientist',
            'Creative Director', 'Business Analyst', 'Frontend Developer', 'Sales Manager'
        ];
        
        const companies = [
            'Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix', 'Tesla', 'Spotify',
            'Airbnb', 'Uber', 'LinkedIn', 'Twitter', 'Adobe', 'Salesforce', 'Dropbox'
        ];
        
        return Array.from({ length: 100 }, (_, index) => ({
            id: index + 1,
            name: names[index % names.length],
            title: titles[index % titles.length],
            company: companies[index % companies.length],
            industry: industries[index % industries.length],
            experience: experiences[index % experiences.length],
            location: locations[index % locations.length],
            connectionType: connections[index % connections.length],
            bio: 'Passionate professional with expertise in modern technologies and a track record of delivering innovative solutions.',
            skills: this.generateSkills(industries[index % industries.length]),
            connections: Math.floor(Math.random() * 1000) + 100,
            posts: Math.floor(Math.random() * 100) + 10,
            endorsements: Math.floor(Math.random() * 200) + 20,
            image: `https://images.unsplash.com/photo-${1500000000000 + index}?w=300&h=300&fit=crop&crop=face`,
            status: ['available', 'busy', 'offline'][index % 3],
            featured: index < 6,
            joinedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
        }));
    }
    
    generateSkills(industry) {
        const skillMap = {
            technology: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
            finance: ['Financial Analysis', 'Risk Management', 'Excel', 'Bloomberg', 'SQL'],
            healthcare: ['Clinical Research', 'Healthcare IT', 'Patient Care', 'Medical Writing'],
            education: ['Curriculum Design', 'E-learning', 'Assessment', 'Educational Technology'],
            marketing: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Social Media'],
            design: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research']
        };
        
        const skills = skillMap[industry] || ['Communication', 'Leadership', 'Project Management'];
        return skills.slice(0, Math.floor(Math.random() * 3) + 3);
    }
    
    generateMockEvents() {
        const eventTypes = ['conference', 'workshop', 'meetup', 'webinar'];
        const eventNames = [
            'Tech Leaders Summit 2024', 'UX Design Workshop', 'Startup Networking Meetup',
            'AI & Machine Learning Conference', 'Digital Marketing Masterclass', 'Product Management Forum',
            'Developer Community Meetup', 'Women in Tech Panel', 'Blockchain Innovation Summit',
            'Remote Work Best Practices', 'Career Growth Workshop', 'Industry Trends Webinar'
        ];
        
        return Array.from({ length: 12 }, (_, index) => ({
            id: index + 1,
            name: eventNames[index % eventNames.length],
            type: eventTypes[index % eventTypes.length],
            date: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000),
            location: index % 2 === 0 ? 'Online' : ['San Francisco', 'New York', 'London'][index % 3],
            attendees: Math.floor(Math.random() * 500) + 50,
            price: index % 3 === 0 ? 'Free' : `$${Math.floor(Math.random() * 200) + 50}`,
            image: `https://images.unsplash.com/photo-${1600000000000 + index}?w=400&h=250&fit=crop`,
            description: 'Join industry professionals for networking, learning, and collaboration opportunities.'
        }));
    }
    
    loadFeaturedProfessionals() {
        if (!this.featuredGrid) return;
        
        const featured = this.allProfessionals.filter(p => p.featured);
        this.renderProfessionals(featured, this.featuredGrid);
    }
    
    loadProfessionals() {
        if (!this.professionalsGrid) return;
        
        const startIndex = 0;
        const endIndex = this.currentPage * this.itemsPerPage;
        const professionalsToShow = this.filteredProfessionals.slice(startIndex, endIndex);
        
        this.renderProfessionals(professionalsToShow, this.professionalsGrid);
        this.updateLoadMoreButton();
    }
    
    loadEvents() {
        if (!this.eventsGrid) return;
        
        this.events.forEach((event, index) => {
            const eventElement = this.createEventCard(event);
            this.eventsGrid.appendChild(eventElement);
        });
        
        // Animate events
        gsap.from(this.eventsGrid.children, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: this.eventsGrid,
                start: "top 80%"
            }
        });
    }
    
    renderProfessionals(professionals, container) {
        if (container === this.professionalsGrid && this.currentPage === 1) {
            container.innerHTML = '';
        }
        
        professionals.forEach((professional, index) => {
            const professionalElement = this.createProfessionalCard(professional);
            container.appendChild(professionalElement);
        });
        
        // Animate new professionals
        const newCards = container.querySelectorAll('.professional-card:not(.animated)');
        newCards.forEach(card => card.classList.add('animated'));
        
        gsap.from(newCards, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    }
    
    createProfessionalCard(professional) {
        const card = document.createElement('div');
        card.className = 'professional-card card-hover bg-white rounded-2xl p-6 shadow-lg cursor-pointer';
        card.setAttribute('data-professional-id', professional.id);
        
        card.innerHTML = `
            <div class="text-center mb-4">
                <div class="relative inline-block">
                    <img src="${professional.image}" alt="${professional.name}" 
                         class="w-20 h-20 rounded-full mx-auto border-4 border-primary-200"
                         onerror="this.src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'">
                    <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${this.getStatusColor(professional.status)}"></div>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mt-3">${professional.name}</h3>
                <p class="text-gray-600">${professional.title}</p>
                <p class="text-sm text-gray-500">${professional.company}</p>
            </div>
            
            <div class="mb-4">
                <p class="text-gray-700 text-sm line-clamp-2">${professional.bio}</p>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-4">
                ${professional.skills.slice(0, 3).map(skill => `
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">${skill}</span>
                `).join('')}
                ${professional.skills.length > 3 ? `<span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">+${professional.skills.length - 3}</span>` : ''}
            </div>
            
            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span><i class="fas fa-users mr-1"></i>${professional.connections}</span>
                <span><i class="fas fa-edit mr-1"></i>${professional.posts}</span>
                <span><i class="fas fa-award mr-1"></i>${professional.endorsements}</span>
            </div>
            
            <div class="flex space-x-2">
                <button class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm">
                    <i class="fas fa-envelope mr-1"></i>Message
                </button>
                <button class="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-sm">
                    <i class="fas fa-user-plus mr-1"></i>Connect
                </button>
            </div>
        `;
        
        // Add click handler
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                this.openProfessionalModal(professional);
            }
        });
        
        return card;
    }
    
    createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'event-card card-hover bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer';
        
        const eventDate = event.date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        card.innerHTML = `
            <div class="aspect-video bg-gray-200 overflow-hidden">
                <img src="${event.image}" alt="${event.name}" 
                     class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                     onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop'">
            </div>
            <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                    <span class="px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-medium capitalize">
                        ${event.type}
                    </span>
                    <span class="text-xs text-gray-500">${event.price}</span>
                </div>
                <h4 class="font-bold text-gray-900 mb-2 line-clamp-2">${event.name}</h4>
                <div class="space-y-1 text-sm text-gray-600 mb-3">
                    <div class="flex items-center">
                        <i class="fas fa-calendar mr-2 text-gray-400"></i>
                        <span>${eventDate}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-users mr-2 text-gray-400"></i>
                        <span>${event.attendees} attending</span>
                    </div>
                </div>
                <button class="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-sm">
                    Register Now
                </button>
            </div>
        `;
        
        // Add click handler
        card.addEventListener('click', () => {
            this.openEventModal(event);
        });
        
        return card;
    }
    
    getStatusColor(status) {
        const colors = {
            available: 'bg-green-500',
            busy: 'bg-yellow-500',
            offline: 'bg-gray-500'
        };
        return colors[status] || 'bg-gray-500';
    }
    
    setupLoadMore() {
        if (!this.loadMoreButton) return;
        
        this.loadMoreButton.addEventListener('click', () => {
            this.currentPage++;
            this.loadProfessionals();
        });
    }
    
    updateLoadMoreButton() {
        if (!this.loadMoreButton) return;
        
        const hasMore = (this.currentPage * this.itemsPerPage) < this.filteredProfessionals.length;
        this.loadMoreButton.style.display = hasMore ? 'inline-flex' : 'none';
    }
    
    setupFilterListener() {
        document.addEventListener('networkingFilterChange', (e) => {
            this.applyFilters(e.detail.filters);
        });
    }
    
    applyFilters(filters) {
        this.filteredProfessionals = this.allProfessionals.filter(professional => {
            // Search filter
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                if (!professional.name.toLowerCase().includes(searchTerm) &&
                    !professional.title.toLowerCase().includes(searchTerm) &&
                    !professional.company.toLowerCase().includes(searchTerm)) {
                    return false;
                }
            }
            
            // Industry filter
            if (filters.industry !== 'all' && professional.industry !== filters.industry) {
                return false;
            }
            
            // Experience filter
            if (filters.experience !== 'all' && professional.experience !== filters.experience) {
                return false;
            }
            
            // Location filter
            if (filters.location !== 'all' && professional.location !== filters.location) {
                return false;
            }
            
            // Connection type filter
            if (filters.connection !== 'all' && professional.connectionType !== filters.connection) {
                return false;
            }
            
            return true;
        });
        
        // Reset pagination and reload
        this.currentPage = 1;
        this.loadProfessionals();
        
        // Update results count
        if (window.networkingFilter) {
            window.networkingFilter.updateResultsCount(this.filteredProfessionals.length);
        }
    }
    
    openProfessionalModal(professional) {
        // Use global modal manager
        if (window.Synkria && window.Synkria.modals) {
            window.Synkria.modals.openModal('profileModal');
            this.loadProfessionalModalContent(professional);
        }
    }
    
    loadProfessionalModalContent(professional) {
        // Update modal content
        const modal = document.getElementById('profileModal');
        if (!modal) return;
        
        // Update header
        const avatar = modal.querySelector('#modalProfileAvatar img');
        const name = modal.querySelector('#modalProfileName');
        const title = modal.querySelector('#modalProfileTitle');
        const location = modal.querySelector('#modalProfileLocation span');
        
        if (avatar) avatar.src = professional.image;
        if (name) name.textContent = professional.name;
        if (title) title.textContent = `${professional.title} at ${professional.company}`;
        if (location) location.textContent = professional.location.replace('-', ' ');
        
        // Update footer stats
        const connectionCount = modal.querySelector('#modalConnectionCount');
        const postCount = modal.querySelector('#modalPostCount');
        const endorsementCount = modal.querySelector('#modalEndorsementCount');
        
        if (connectionCount) connectionCount.textContent = professional.connections;
        if (postCount) postCount.textContent = professional.posts;
        if (endorsementCount) endorsementCount.textContent = professional.endorsements;
        
        // Load tab content
        this.loadModalTabContent(professional);
    }
    
    loadModalTabContent(professional) {
        // Load about tab content
        const aboutContent = document.querySelector('#about-tab .about-content');
        if (aboutContent) {
            aboutContent.innerHTML = `
                <div class="space-y-6">
                    <div>
                        <h4 class="font-semibold text-gray-900 mb-2">About</h4>
                        <p class="text-gray-700">${professional.bio}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-900 mb-2">Industry</h4>
                        <p class="text-gray-700 capitalize">${professional.industry}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-900 mb-2">Experience Level</h4>
                        <p class="text-gray-700 capitalize">${professional.experience} Level</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-900 mb-2">Location</h4>
                        <p class="text-gray-700">${professional.location.replace('-', ' ')}</p>
                    </div>
                </div>
            `;
        }
        
        // Load skills tab content
        const skillsContent = document.querySelector('#skills-tab .skills-content');
        if (skillsContent) {
            skillsContent.innerHTML = `
                <div class="space-y-4">
                    <h4 class="font-semibold text-gray-900">Skills & Expertise</h4>
                    <div class="flex flex-wrap gap-3">
                        ${professional.skills.map(skill => `
                            <span class="px-4 py-2 bg-primary-100 text-primary-600 rounded-xl font-medium">${skill}</span>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }
    
    openEventModal(event) {
        // Create event modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50';
        modal.innerHTML = `
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-2xl max-w-2xl w-full">
                    <div class="relative">
                        <img src="${event.image}" alt="${event.name}" class="w-full h-48 object-cover rounded-t-2xl">
                        <button class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium capitalize">
                                ${event.type}
                            </span>
                            <span class="text-lg font-bold text-gray-900">${event.price}</span>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">${event.name}</h2>
                        <div class="space-y-3 mb-6">
                            <div class="flex items-center text-gray-600">
                                <i class="fas fa-calendar mr-3 text-primary-500"></i>
                                <span>${event.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div class="flex items-center text-gray-600">
                                <i class="fas fa-map-marker-alt mr-3 text-primary-500"></i>
                                <span>${event.location}</span>
                            </div>
                            <div class="flex items-center text-gray-600">
                                <i class="fas fa-users mr-3 text-primary-500"></i>
                                <span>${event.attendees} people attending</span>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-6">${event.description}</p>
                        <div class="flex space-x-4">
                            <button class="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                Save Event
                            </button>
                            <button class="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200">
                                Register Now
                            </button>
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
            if (e.target === modal || e.target.closest('button .fa-times')) {
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
 * Networking Page Main Class
 * Coordinates all networking page functionality
 */
class NetworkingPage {
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
        // Initialize networking managers
        this.heroManager = new NetworkingHeroManager();
        this.filterManager = new NetworkingFilterManager();
        this.dataManager = new NetworkingDataManager();
        
        // Store filter manager globally for cross-component access
        window.networkingFilter = this.filterManager;
        
        // Setup page-specific interactions
        this.setupPageInteractions();
        
        // Expose networking API
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
                    gsap.from(featuredSection.querySelectorAll('.professional-card'), {
                        y: 60,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out"
                    });
                }
            });
        }
        
        // Animate CTA section
        const ctaSection = document.querySelector('.networking-cta-section');
        if (ctaSection) {
            ScrollTrigger.create({
                trigger: ctaSection,
                start: "top 70%",
                onEnter: () => {
                    gsap.from(ctaSection.querySelector('.cta-content'), {
                        y: 40,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                    
                    gsap.from(ctaSection.querySelectorAll('.feature-item'), {
                        y: 30,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.2,
                        ease: "power2.out",
                        delay: 0.3
                    });
                }
            });
        }
    }
    
    exposeAPI() {
        // Expose networking-specific functionality
        window.NetworkingPage = {
            heroManager: this.heroManager,
            filterManager: this.filterManager,
            dataManager: this.dataManager
        };
    }
}

// Initialize networking page when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new NetworkingPage());
} else {
    new NetworkingPage();
}

