document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const nav = document.querySelector('.nav');
    
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalClose = document.querySelectorAll('[data-close]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            // Если это кнопка "Подробнее" в каталоге
            if (modalId === 'propertyModal' && this.closest('.property')) {
                fillPropertyModal(this.closest('.property'));
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Заполнение модального окна данными объекта
    function fillPropertyModal(property) {
        const title = property.querySelector('.property__title').textContent;
        const location = property.querySelector('.property__location').textContent;
        const price = property.querySelector('.property__price').textContent;
        const details = property.querySelectorAll('.property__details span');
        const imgSrc = property.querySelector('.property__img').src.replace('400x300', '800x600');
        
        const modal = document.getElementById('propertyModal');
        modal.querySelector('.property-modal__title').textContent = title;
        modal.querySelector('.property-modal__location').textContent = location;
        modal.querySelector('.property-modal__price').textContent = price;
        modal.querySelector('.property-modal__img').src = imgSrc;
        
        // Заполняем характеристики
        const modalDetails = modal.querySelectorAll('.property-modal__detail span');
        details.forEach((detail, index) => {
            if (modalDetails[index]) {
                modalDetails[index].textContent = detail.textContent;
            }
        });
        
        // Генерируем описание
        const description = `Просторная ${title.toLowerCase()} по адресу ${location}. ${price} за ${modalDetails[2] ? modalDetails[2].textContent : 'неизвестную площадь'}.`;
        modal.querySelector('.property-modal__description').textContent = description;
    }
    
    // Login/register modal switching
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const loginLink2 = document.getElementById('loginLink2');
    
    if (loginLink && registerLink && loginLink2) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('loginModal').classList.add('active');
        });
        
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('loginModal').classList.remove('active');
            document.getElementById('registerModal').classList.add('active');
        });
        
        loginLink2.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('registerModal').classList.remove('active');
            document.getElementById('loginModal').classList.add('active');
        });
    }
    
    // Property filters
    const applyFilters = document.getElementById('applyFilters');
    
    if (applyFilters) {
        applyFilters.addEventListener('click', function() {
            const typeFilter = document.getElementById('type').value;
            const roomsFilter = document.getElementById('rooms').value;
            const priceFilter = document.getElementById('price').value;
            
            const properties = document.querySelectorAll('.property');
            
            properties.forEach(property => {
                const type = property.getAttribute('data-type');
                const rooms = property.getAttribute('data-rooms');
                const price = parseInt(property.getAttribute('data-price'));
                
                let typeMatch = typeFilter === 'all' || type === typeFilter;
                let roomsMatch = roomsFilter === 'all' || 
                                (roomsFilter === '3' && parseInt(rooms) >= 3) || 
                                rooms === roomsFilter;
                let priceMatch = priceFilter === 'all' || price <= parseInt(priceFilter);
                
                if (typeMatch && roomsMatch && priceMatch) {
                    property.style.display = 'block';
                } else {
                    property.style.display = 'none';
                }
            });
        });
    }
    
    // Property modal image gallery
    const propertyThumbs = document.querySelectorAll('.property-modal__thumbs img');
    
    if (propertyThumbs.length > 0) {
        propertyThumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const modalImg = this.closest('.property-modal').querySelector('.property-modal__img');
                modalImg.src = this.src.replace('100x75', '800x600');
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
        });
    });
});