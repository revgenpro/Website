document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialSlider && testimonialCards.length > 0) {
        let currentIndex = 0;
        const totalSlides = testimonialCards.length;
        
        // Function to update slider position
        function updateSlider() {
            testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }
        
        // Previous slide
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
        
        // Event listeners for controls
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Header Scroll Effect
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                showFormError('Please fill in all required fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormError('Please enter a valid email address');
                return;
            }
            
            // If validation passes, show success message
            // In a real implementation, you would send the form data to a server here
            showFormSuccess('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show form error
    function showFormError(message) {
        // Check if error message already exists
        const existingError = document.querySelector('.form-error');
        if (existingError) {
            existingError.textContent = message;
            return;
        }
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.color = '#e53e3e';
        errorDiv.style.marginBottom = '15px';
        errorDiv.textContent = message;
        
        // Insert at the top of the form
        contactForm.insertBefore(errorDiv, contactForm.firstChild);
        
        // Remove after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    // Helper function to show form success
    function showFormSuccess(message) {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.style.color = '#10b981';
        successDiv.style.marginBottom = '15px';
        successDiv.style.padding = '10px';
        successDiv.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        successDiv.style.borderRadius = '8px';
        successDiv.textContent = message;
        
        // Insert at the top of the form
        contactForm.insertBefore(successDiv, contactForm.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Animation on Scroll
    const animatedElements = document.querySelectorAll('.service-card, .about-item, .stat-item');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .about-item, .stat-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .about-item.animate, .stat-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            padding: 20px;
            z-index: 1000;
        }
        
        .mobile-menu.active i:before {
            content: '\\f00d';
        }
        
        header.scrolled {
            padding: 10px 0;
            background-color: rgba(255, 255, 255, 0.98);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .testimonial-slider {
            transition: transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});