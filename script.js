document.addEventListener('DOMContentLoaded', function() {
    // ===== Header Scroll Effect =====
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    header.appendChild(mobileMenuBtn);

    const nav = document.querySelector('nav');
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // ===== Cart Functionality =====
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;

    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.product-card .btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Animation
            cartCount.style.transform = 'scale(1.5)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 300);
            
            // Product added notification
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            showNotification(`${productName} added to cart!`);
        });
    });

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ===== Category Card Hover Effects =====
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1)';
        });
    });

    // ===== Product Card Flip Effect =====
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't flip if clicking on button
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            
            this.classList.toggle('flipped');
        });
    });

    // ===== Scroll Reveal Animations =====
    const scrollRevealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollRevealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollRevealObserver.unobserve(entry.target);
            }
        });
    }, scrollRevealOptions);

    document.querySelectorAll('.category-card, .product-card, .section-title, .sell-content').forEach(el => {
        el.classList.add('scroll-reveal');
        scrollRevealObserver.observe(el);
    });

    // ===== Image Lazy Loading =====
    const lazyLoadObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                lazyLoadObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('img[data-src]').forEach(img => {
        lazyLoadObserver.observe(img);
    });

    // ===== Back to Top Button =====
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== Newsletter Form =====
    const newsletterForm = document.createElement('form');
    newsletterForm.className = 'newsletter-form';
    newsletterForm.innerHTML = `
        <h3>Stay Updated</h3>
        <p>Subscribe to our newsletter for exclusive deals</p>
        <div class="form-group">
            <input type="email" placeholder="Your email address" required>
            <button type="submit" class="btn">Subscribe</button>
        </div>
    `;
    document.querySelector('.footer-grid').appendChild(newsletterForm);

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        showNotification(`Thanks for subscribing with ${email}!`);
        this.reset();
    });
});