document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initScrollToTop();
    initSmoothScrolling();
    initContactForm();
    initHeroAnimations();
    initLanguageSelector();
    initMobileMenu();
    initLightbox();
    initFormValidation();
    initCitiesGrid();
    loadCitiesData();
});

const API_CONFIG = {
    CITIES_DATA_URL: 'data/uzbekistan-cities.json',
    FALLBACK_DATA: {
        cities: [{
                id: "tashkent",
                name: "Toshkent",
                type: "capital",
                description: "Zamonaviy poytaxt va transport markazi",
                population: "2.4M aholi",
                image: "img/tashkent-city.jpg",
                attractions: [{
                        name: "Amir Temur maydoni",
                        icon: "fas fa-crown",
                        description: "O'zbekistonning markaziy maydoni",
                        image: "img/tashkent-amir-temur.jpg",
                        details: "O'zbekiston poytaxtining markaziy maydoni. Bu yerda Amir Temurning haykali joylashgan bo'lib, u O'zbekistonning eng muhim tarixiy joylaridan biridir.",
                        visitInfo: "Ish vaqti: 24 soat | Kirish: bepul"
                    },
                    {
                        name: "Metro tizimi",
                        icon: "fas fa-subway",
                        description: "Zamonaviy metro tizimi",
                        image: "img/tashkent-metro.jpg",
                        details: "O'zbekistonning birinchi va Markaziy Osiyodagi eng chiroyli metro tizimi. Har bir bekat o'ziga xos me'morchilik uslubi va bezaklari bilan mashhur.",
                        visitInfo: "Ish vaqti: 05:30-24:00 | Narx: 1200 so'm"
                    }
                ]
            },
            {
                id: "samarkand",
                name: "Samarqand",
                type: "republic-city",
                description: "Silk Roadning durdonasi",
                population: "550K aholi",
                image: "img/samarkand-city.jpg",
                attractions: [{
                        name: "Registon maydoni",
                        icon: "fas fa-monument",
                        description: "Xivolshshash madrasasi",
                        image: "img/samarkand-registan.jpg",
                        details: "Samarqandning eng mashhur maydoni. Uchta tarixiy madrasa joylashgan bu yer Silk Roadning markazi bo'lgan va UNESCO World Heritage site hisoblanadi.",
                        visitInfo: "Ish vaqti: 08:00-20:00 | Kirish narxi: 20,000 so'm"
                    },
                    {
                        name: "Gur-i Amir",
                        icon: "fas fa-tomb",
                        description: "Amir Temur maqbarasi",
                        image: "img/samarkand-gur-amir.webp",
                        details: "Amir Temur va uning oilasining maqbarasi. 1404-1406 yillar orasida qurilgan bu maqbaraga 45 ta davlatdan ziyolilar dafn etilgan.",
                        visitInfo: "Ish vaqti: 08:00-19:00 | Kirish narxi: 15,000 so'm"
                    }
                ]
            },
            {
                id: "bukhara",
                name: "Buxoro",
                type: "city",
                description: "Islom madaniyatining markazi",
                population: "1400+ yil tarix",
                image: "img/bukhara-city.jpg",
                attractions: [{
                        name: "Po-i-Kalyon majmuasi",
                        icon: "fas fa-mosque",
                        description: "Madrasa va masjid majmuasi",
                        image: "img/bukhara-kalyon.jpg",
                        details: "Buxoroning eng mashhur majmuasi. Kalyon minorasi va madrasalar bir joyda joylashgan. 16-asrda qurilgan bu majmua islom me'morchiligining nodir namunasi.",
                        visitInfo: "Ish vaqti: 08:00-20:00 | Kirish narxi: 25,000 so'm"
                    },
                    {
                        name: "Ark qal'asi",
                        icon: "fas fa-fort-awesome",
                        description: "Qadimgi qal'a va saroy",
                        image: "img/bukhara-ark.jpg",
                        details: "Buxoroning eng qadimgi arki. Miloddan avvalgi 4-asrdan boshlab qurilgan. Emirlarning rasmiy saroyi va ma'muriy markazi bo'lgan.",
                        visitInfo: "Ish vaqti: 08:00-18:00 | Kirish narxi: 20,000 so'm"
                    }
                ]
            },
            {
                id: "khiva",
                name: "Xiva",
                type: "city",
                description: "Xivadagi ichki shahar merosi",
                population: "Kunyali shahar",
                image: "img/khiva-city.webp",
                attractions: [{
                    name: "Ichan Qala",
                    icon: "fas fa-castle",
                    description: "UNESCO World Heritage",
                    image: "img/khiva_ichan_qala_3.jpg",
                    details: "Xivadagi ichki shahar, UNESCO Jahon merosi ro'yxatiga kiritilgan. 2500 yillik tarixga ega bo'lgan bu qal'a ichida 50 dan ortiq tarixiy yodgorliklar mavjud.",
                    visitInfo: "Ish vaqti: 09:00-20:00 | Kirish narxi: 30,000 so'm"
                }]
            },
            {
                id: "fergana-region",
                name: "Farg'ona viloyati",
                type: "region",
                description: "Chashma va baliq yerlari",
                population: "3.7M aholi",
                image: "img/fergana-valley.jpg",
                attractions: [{
                        name: "Farg'ona",
                        icon: "fas fa-city",
                        description: "Viloyat markazi",
                        image: "img/fergana_city_6.jpg",
                        details: "Farg'ona viloyatining poytaxti. O'zbekistoning markaziy qismidagi yirik shahar. Iqtisodiy markaz.",
                        visitInfo: "Tashrif buyurish: erkin"
                    },
                    {
                        name: "Rishtan",
                        icon: "fas fa-vase",
                        description: "Milliy sopol hunarmandligi",
                        image: "img/fergana-rishtan.jpg",
                        details: "O'zbekistonning mashhur sopol markazi. 8-asrlardan boshlab rishtan sopollari butun Osiyoga mashhur. Rang-bargli naqshlar va noyob ranglar bilan mashhur.",
                        visitInfo: "Ish vaqti: 08:00-18:00 | Kirish narxi: bepul (ustaxonalar)"
                    }
                ]
            }
        ]
    }
};

async function loadCitiesData() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const citiesGrid = document.getElementById('citiesGrid');

    try {
        loadingIndicator.style.display = 'flex';

        let citiesData = null;
        try {
            const response = await fetch(API_CONFIG.CITIES_DATA_URL);
            if (response.ok) {
                citiesData = await response.json();
            }
        } catch (error) {
            console.log('External API not available, using fallback data');
        }

        if (!citiesData) {
            citiesData = API_CONFIG.FALLBACK_DATA;
        }

        // Initialize cities grid with data
        initCitiesGrid(citiesData);

        // Hide loading indicator
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
        }, 1000);

    } catch (error) {
        console.error('Error loading cities data:', error);
        showNotification('Ma\'lumotlarni yuklashda xatolik yuz berdi', 'error');
        loadingIndicator.style.display = 'none';
    }
}

// Cities Grid Initialization
function initCitiesGrid(data = null) {
    const citiesData = data || API_CONFIG.FALLBACK_DATA;
    const citiesGrid = document.getElementById('citiesGrid');

    if (!citiesGrid) return;

    // Render cities
    renderCities(citiesData.cities, 'all');

    // Initialize filters
    initCityFilters(citiesData.cities);
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

    const attractions = city.attractions.slice(0, 2).map(attraction =>
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

    card.addEventListener('click', () => {
        showCityDetails(city);
    });

    return card;
}

function initCityFilters(cities) {
    const filterBtns = document.querySelectorAll('.region-filters .filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            renderCities(cities, filter);
        });
    });
}

function showCityDetails(city) {
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
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
    }, 10);
    
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
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

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
    updateActiveLink(); 
}

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

    const animateElements = document.querySelectorAll('.city-card, .tourism-card, .service-card, .timeline-item, .heritage-stat, .gallery-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

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

function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Xabaringiz muvaffaqiyatli yuborildi! Tez orada sizga javob beramiz.', 'success');
                
                form.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function initHeroAnimations() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
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

function initLanguageSelector() {
    const languageSelect = document.getElementById('language');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLang = this.value;
            
            localStorage.setItem('preferredLanguage', selectedLang);
            
            document.documentElement.lang = selectedLang;
            
            showNotification(`Til ${selectedLang === 'uz' ? 'O\'zbek' : selectedLang === 'ru' ? 'Rus' : 'Ingliz'} ga o\'zgartirildi`, 'info');
        });
        
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
            document.documentElement.lang = savedLanguage;
        }
    }
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const zoomButtons = document.querySelectorAll('.gallery-zoom');
    
    if (lightbox && lightboxImage && lightboxClose) {
        zoomButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const imageSrc = this.getAttribute('data-image');
                lightboxImage.src = imageSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
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
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
}

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
    
    if (required && !value) {
        isValid = false;
        errorMessage = 'Bu maydon to\'ldirilishi kerak';
    }
    
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Email manzili noto\'g\'ri';
        }
    }
    
    if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Telefon raqami noto\'g\'ri';
        }
    }
    
    if (type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Kelajak sanasini tanlang';
        }
    }
    
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

function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
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
    
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

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