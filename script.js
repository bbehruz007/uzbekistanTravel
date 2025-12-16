// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollAnimations();
    initScrollToTop();
    initSmoothScrolling();
    initGallery();
    initContactForm();
    initHeroAnimations();
    initLanguageSelector();
    initMobileMenu();
    initLightbox();
    initFormValidation();
    initCitiesGrid();
});

// Navigation Functions
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.city-card, .tourism-card, .service-card, .timeline-item, .heritage-stat, .gallery-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// Gallery Functions
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Set initial styles
    galleryItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        item.style.display = 'block';
        item.style.transition = 'all 0.3s ease';
    });
}

// Cities Grid Initialization
function initCitiesGrid() {
    const citiesData = document.getElementById('citiesData');
    if (!citiesData) return;
    
    const cities = JSON.parse(citiesData.textContent).cities;
    const citiesGrid = document.getElementById('citiesGrid');
    
    // Render cities
    renderCities(cities, 'all');
    
    // Initialize filters
    initCityFilters(cities);
}

function renderCities(cities, filter = 'all') {
    const citiesGrid = document.getElementById('citiesGrid');
    if (!citiesGrid) return;
    
    const filteredCities = cities.filter(city => {
        if (filter === 'all') return true;
        if (filter === 'republic') return city.type === 'republic';
        if (filter === 'republic-city') return city.type === 'republic-city';
        if (filter === 'capital') return city.type === 'capital';
        if (filter === 'city') return city.type === 'city';
        if (filter === 'region') return city.type === 'region';
        return city.type === filter;
    });
    
    citiesGrid.innerHTML = '';
    
    filteredCities.forEach(city => {
        const cityCard = createCityCard(city);
        citiesGrid.appendChild(cityCard);
    });
}

function createCityCard(city) {
    const card = document.createElement('div');
    card.className = `city-card ${city.type}`;
    card.setAttribute('data-city', city.id);
    card.setAttribute('data-type', city.type);
    
    const attractions = city.attractions.map(attraction => 
        `<div class="attraction-item">
            <i class="${attraction.icon}"></i>
            <span>${attraction.name}</span>
            <small>${attraction.description}</small>
        </div>`
    ).join('');
    
    card.innerHTML = `
        <div class="city-image">
            <img src="${city.image}" alt="${city.name}" loading="lazy">
            <div class="city-overlay">
                <div class="city-info">
                    <h3>${city.name}</h3>
                    <p>${city.description}</p>
                    <div class="city-stats">
                        <span><i class="fas fa-users"></i> ${city.population}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="city-attractions">
            <h4><i class="fas fa-star"></i> Ko'zga ko'rinarli joylar</h4>
            <div class="attractions-grid">
                ${attractions}
            </div>
        </div>
    `;
    
    // Add click event
    card.addEventListener('click', () => {
        showCityDetails(city);
    });
    
    return card;
}

function initCityFilters(cities) {
    const filterBtns = document.querySelectorAll('.region-filters .filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            renderCities(cities, filter);
        });
    });
}

function showCityDetails(city) {
    // Create modal or detailed view
    const modal = document.createElement('div');
    modal.className = 'city-modal';
    modal.innerHTML = `
        <div class="city-modal-content">
            <div class="city-modal-header">
                <img src="${city.image}" alt="${city.name}">
                <div class="city-modal-info">
                    <h2>${city.name}</h2>
                    <p>${city.description}</p>
                    <span class="population"><i class="fas fa-users"></i> ${city.population}</span>
                </div>
                <button class="city-modal-close">&times;</button>
            </div>
            <div class="city-modal-body">
                <h3><i class="fas fa-star"></i> Ko'zga ko'rinarli joylar</h3>
                <div class="attractions-list">
                    ${city.attractions.map((attraction, index) => `
                        <div class="attraction-detail" data-attraction-index="${index}">
                            <div class="attraction-image">
                                <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
                            </div>
                            <div class="attraction-content">
                                <div class="attraction-icon">
                                    <i class="${attraction.icon}"></i>
                                </div>
                                <div class="attraction-info">
                                    <h4>${attraction.name}</h4>
                                    <p class="attraction-description">${attraction.description}</p>
                                    <p class="attraction-details">${attraction.details}</p>
                                    <div class="visit-info">
                                        <i class="fas fa-info-circle"></i>
                                        <span>${attraction.visitInfo}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
    }, 10);
    
    // Close functionality
    const closeBtn = modal.querySelector('.city-modal-close');
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        setTimeout(() => modal.remove(), 300);
    }
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Contact Form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('Xabaringiz muvaffaqiyatli yuborildi! Tez orada sizga javob beramiz.', 'success');
                
                // Reset form
                form.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Hero Animations
function initHeroAnimations() {
    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add random animation delay
        const delay = Math.random() * 2;
        card.style.animationDelay = `${delay}s`;
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format number with proper suffix
                let displayValue = Math.floor(current);
                if (stat.textContent.includes('K')) {
                    displayValue += 'K';
                } else if (stat.textContent.includes('M')) {
                    displayValue += 'M';
                }
                
                stat.textContent = displayValue;
            }, 20);
        });
    }
}

// Language Selector
function initLanguageSelector() {
    const languageSelect = document.getElementById('language');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLang = this.value;
            
            // Store language preference
            localStorage.setItem('preferredLanguage', selectedLang);
            
            // Update page language (you can implement actual translation here)
            document.documentElement.lang = selectedLang;
            
            // Show notification
            showNotification(`Til ${selectedLang === 'uz' ? 'O\'zbek' : selectedLang === 'ru' ? 'Rus' : 'Ingliz'} ga o\'zgartirildi`, 'info');
        });
        
        // Load saved language preference
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
            document.documentElement.lang = savedLanguage;
        }
    }
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Lightbox
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const zoomButtons = document.querySelectorAll('.gallery-zoom');
    
    if (lightbox && lightboxImage && lightboxClose) {
        // Open lightbox
        zoomButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const imageSrc = this.getAttribute('data-image');
                lightboxImage.src = imageSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (required && !value) {
        isValid = false;
        errorMessage = 'Bu maydon to\'ldirilishi kerak';
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Email manzili noto\'g\'ri';
        }
    }
    
    // Phone validation (if phone type exists)
    if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Telefon raqami noto\'g\'ri';
        }
    }
    
    // Date validation
    if (type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Kelajak sanasini tanlang';
        }
    }
    
    // Show/hide error
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #e74c3c;
        font-size: 0.9rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;
    
    field.parentNode.appendChild(errorElement);
    field.style.borderColor = '#e74c3c';
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = '';
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const colorMap = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${iconMap[type]}"></i>
            </div>
            <div class="notification-message">${message}</div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colorMap[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    // Add animation styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            .notification-icon {
                font-size: 1.2rem;
            }
            .notification-message {
                flex: 1;
                font-weight: 500;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// City Card Interactions
function initCityCards() {
    const cityCards = document.querySelectorAll('.city-card');
    
    cityCards.forEach(card => {
        card.addEventListener('click', function() {
            const cityName = this.querySelector('h3').textContent;
            showNotification(`${cityName} haqida batafsil ma'lumot tez orada qo'shiladi`, 'info');
        });
    });
}

// Tourism Card Interactions
function initTourismCards() {
    const tourismCards = document.querySelectorAll('.tourism-card');
    
    tourismCards.forEach(card => {
        card.addEventListener('click', function() {
            const tourType = this.querySelector('h3').textContent;
            showNotification(`${tourType} haqida batafsil ma'lumot tez orada qo'shiladi`, 'info');
        });
    });
}

// Service Card Interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            showNotification(`${serviceName} xizmati haqida batafsil ma'lumot uchun biz bilan bog'laning`, 'info');
        });
    });
}

// Initialize additional card interactions
initCityCards();
initTourismCards();
initServiceCards();

// Social Media Sharing
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('[data-share]');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-share');
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('O\'zbekiston sayohat saytiga tashrif buyuring!');
            
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Initialize social sharing
initSocialSharing();

// Loading Animation
function showLoading(element) {
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuklanmoqda...';
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                // Focus search input if exists
                const searchInput = document.querySelector('input[type="search"]');
                if (searchInput) {
                    searchInput.focus();
                }
                break;
        }
    }
});

// Performance Optimization
function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize image optimization
optimizeImages();

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send error reports to a logging service here
});

// Accessibility Improvements
function initAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Asosiy kontentga o\'tish';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

// Initialize accessibility features
initAccessibility();

// Console welcome message
console.log('%c🇺🇿 O\'zbekiston Sayohat Veb-sayt', 'color: #009639; font-size: 24px; font-weight: bold;');
console.log('%cSayt muvaffaqiyatli yuklandi!', 'color: #1e88e5; font-size: 16px;');

console.log('Sayt xususiyatlari:');
console.log('• Responsive dizayn');
console.log('• Smooth scroll animatsiyalar');
console.log('• Interaktiv galeriya');
console.log('• Ko\'p tili qo\'llab-quvvatlash');
console.log('• Form validatsiyasi');
console.log('• Lightbox galeriya');
console.log('• Mobile-first yondashuv');