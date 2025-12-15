// Main JavaScript for The Cortex Website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    initCarousel();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize team section interactions
    initTeamSection();
    
    // Initialize contact form for new 5-field form
    initContactForm();
    
    // Initialize typing effect for tagline
    initTypingEffect();
    
    // Initialize legacy animations
    initLegacyAnimations();
    
    // Initialize subscribe form
    initSubscribeForm();
});

// Carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.slide');
    const thumbs = document.querySelectorAll('.thumb');
    
    if (slides.length === 0 || thumbs.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and thumbs
        slides.forEach(slide => slide.classList.remove('active'));
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to current slide and thumb
        slides[index].classList.add('active');
        thumbs[index].classList.add('active');
        currentSlide = index;
    }

    // Add click event to thumbnails
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Auto slide functionality
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Start auto sliding
    let autoSlide = setInterval(nextSlide, slideInterval);

    // Reset auto slide timer
    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, slideInterval);
    }

    // Pause auto slide on hover
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });

        carousel.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, slideInterval);
        });

        // Touch swipe functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            resetAutoSlide();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                nextSlide();
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                let prevIndex = currentSlide - 1;
                if (prevIndex < 0) prevIndex = slides.length - 1;
                showSlide(prevIndex);
            }
        }
    }
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-down, .slide-in-left, .slide-in-right, .slide-in-bottom');
    
    if (animatedElements.length === 0) return;
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                
                // Apply delay if specified
                setTimeout(() => {
                    element.classList.add('animate');
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0) translateY(0)';
                }, delay * 1000);
                
                // Unobserve after animation
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-container');
    if (!navbar) return;
    
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton) return;
    
    const scrollThreshold = 300;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Team section interactions
function initTeamSection() {
    const teamCards = document.querySelectorAll('.team-card .card');
    if (teamCards.length === 0) return;
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.filter = 'drop-shadow(0px 0px 40px rgba(157, 228, 255, 0.9))';
            
            // Add pulse animation to social icons
            const socialIcons = this.querySelectorAll('.social-icon');
            socialIcons.forEach((icon, index) => {
                icon.style.animationDelay = `${index * 0.1}s`;
                icon.classList.add('pulse-animation');
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.filter = 'drop-shadow(0px 0px 20px rgba(157, 228, 255, 0.3))';
            
            // Remove pulse animation
            const socialIcons = this.querySelectorAll('.social-icon');
            socialIcons.forEach(icon => {
                icon.classList.remove('pulse-animation');
            });
        });
        
        // Add click event to team cards
        card.addEventListener('click', function() {
            const memberName = this.querySelector('.member-name')?.textContent;
            const memberRole = this.querySelector('.member-role')?.textContent;
            
            if (memberName && memberRole) {
                showTeamMemberModal(memberName, memberRole);
            }
        });
    });
}

// Team Member Modal
function showTeamMemberModal(name, role) {
    const modalHTML = `
        <div class="modal" id="teamModal">
            <div class="modal-content team-modal">
                <div class="modal-header">
                    <h3>${name}</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <p><strong>Position:</strong> ${role}</p>
                    <p><strong>Specialization:</strong> Cybersecurity expert with extensive experience in threat analysis and network security.</p>
                    <p><strong>Contact:</strong> ${name.toLowerCase().replace(' ', '.')}@thecortex.com</p>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn secondary">Close</button>
                    <button class="modal-btn primary">Contact ${name.split(' ')[0]}</button>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    const modal = document.getElementById('teamModal');
    const closeBtn = modal.querySelector('.close');
    const secondaryBtn = modal.querySelector('.secondary');
    const primaryBtn = modal.querySelector('.primary');
    
    // Show modal with animation
    setTimeout(() => {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'translateY(0)';
            modal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    }, 10);
    
    // Close modal function
    function closeModal() {
        modal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
        modal.querySelector('.modal-content').style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            modalContainer.remove();
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    secondaryBtn.addEventListener('click', closeModal);
    primaryBtn.addEventListener('click', () => {
        showNotification(`Contacting ${name}...`, 'success');
        closeModal();
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Contact form handling for new 5-field form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.form-submit-btn');
        if (!submitBtn) return;
        
        const originalText = submitBtn.textContent;
        
        // Collect form data
        const formData = {
            fullname: this.querySelector('#fullname')?.value || '',
            email: this.querySelector('#email')?.value || '',
            phone: this.querySelector('#phone')?.value || '',
            subject: this.querySelector('#subject')?.value || '',
            message: this.querySelector('#message')?.value || ''
        };
        
        // Validate required fields
        if (!formData.fullname.trim() || !formData.email.trim() || 
            !formData.subject.trim() || !formData.message.trim()) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!validateEmail(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message with form data
            showNotification(`Thank you ${formData.fullname}! Your message has been sent. We'll contact you soon.`, 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show confirmation modal
            showContactConfirmation(formData);
        }, 2000);
    });
    
    // Add input validation on blur
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    if (field.required && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (fieldId === 'email' && value && !validateEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (fieldId === 'phone' && value && !validatePhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    return true;
}

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Phone validation helper
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone);
}

// Show field error
function showFieldError(field, message) {
    // Remove existing error
    clearFieldError(field);
    
    // Add error class
    field.classList.add('field-error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ff4d4d;
        font-size: 12px;
        margin-top: 5px;
        text-shadow: 0 0 5px rgba(255, 77, 77, 0.5);
        animation: fadeIn 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorElement);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('field-error');
    
    const existingError = field.parentNode.querySelector('.field-error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Contact confirmation modal
function showContactConfirmation(formData) {
    const modalHTML = `
        <div class="modal" id="contactModal">
            <div class="modal-content contact-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-check-circle" style="color: #4CAF50; margin-right: 10px;"></i>Message Sent Successfully!</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="confirmation-details">
                        <div class="detail-item">
                            <strong><i class="fas fa-user" style="margin-right: 8px;"></i>Name:</strong>
                            <span>${formData.fullname}</span>
                        </div>
                        <div class="detail-item">
                            <strong><i class="fas fa-envelope" style="margin-right: 8px;"></i>Email:</strong>
                            <span>${formData.email}</span>
                        </div>
                        ${formData.phone ? `
                        <div class="detail-item">
                            <strong><i class="fas fa-phone" style="margin-right: 8px;"></i>Phone:</strong>
                            <span>${formData.phone}</span>
                        </div>
                        ` : ''}
                        <div class="detail-item">
                            <strong><i class="fas fa-tag" style="margin-right: 8px;"></i>Subject:</strong>
                            <span>${formData.subject}</span>
                        </div>
                        <div class="detail-item full-width">
                            <strong><i class="fas fa-comment" style="margin-right: 8px;"></i>Message:</strong>
                            <p>${formData.message}</p>
                        </div>
                    </div>
                    <div class="confirmation-message">
                        <p>Thank you for contacting The Cortex! Our team will review your message and get back to you within 24 hours.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn primary print-btn"><i class="fas fa-print" style="margin-right: 8px;"></i>Print Confirmation</button>
                    <button class="modal-btn secondary">Close</button>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    const modal = document.getElementById('contactModal');
    const closeBtn = modal.querySelector('.close');
    const secondaryBtn = modal.querySelector('.secondary');
    const printBtn = modal.querySelector('.print-btn');
    
    // Show modal with animation
    setTimeout(() => {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'translateY(0)';
            modal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    }, 10);
    
    // Close modal function
    function closeModal() {
        modal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
        modal.querySelector('.modal-content').style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            modalContainer.remove();
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    secondaryBtn.addEventListener('click', closeModal);
    printBtn.addEventListener('click', () => window.print());
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #0a0e2a, #1a1f4a);
                border: 1px solid rgba(157, 228, 255, 0.3);
                border-radius: 10px;
                padding: 20px;
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                transform: translateX(150%);
                transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .notification.success {
                border-left: 4px solid #4CAF50;
            }
            
            .notification.error {
                border-left: 4px solid #f44336;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .notification-content i {
                font-size: 24px;
            }
            
            .notification.success .notification-content i {
                color: #4CAF50;
            }
            
            .notification.error .notification-content i {
                color: #f44336;
            }
            
            .notification-close {
                background: transparent;
                border: none;
                color: var(--light-blue);
                cursor: pointer;
                font-size: 18px;
                margin-left: 20px;
                transition: color 0.3s;
            }
            
            .notification-close:hover {
                color: white;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => notification.remove(), 500);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

// Button interactions
function initButtons() {
    // Hero button
    const heroBtn = document.querySelector('.synthwave-laser-button');
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                showNotification('Welcome to The Cortex! Start your cybersecurity journey.', 'success');
                this.innerHTML = originalHTML;
                
                // Scroll to about section
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }, 1500);
        });
    }
    
    // Learn More button
    const learnMoreBtn = document.querySelector('.animated-button');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            showNotification('Opening cybersecurity resources...', 'success');
            
            // Scroll to cyber warfare section
            const cyberSection = document.getElementById('cyber-warfare');
            if (cyberSection) {
                cyberSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Card buttons
    document.querySelectorAll('.card-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const text = this.textContent;
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                showNotification(`Opening ${text} section...`, 'success');
                this.innerHTML = originalHTML;
            }, 1000);
        });
    });
}

// Typing effect for tagline
function initTypingEffect() {
    const element = document.getElementById('typing-tagline');
    if (!element) return;
    
    const texts = ['defence', 'offence', 'all in one place'];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseAfterType = 600; 
    let pauseAfterDelete = 50; 
    let pauseAfterLast = 400; 
    
    function type() {
        const currentText = texts[currentTextIndex];
        
        if (!isDeleting) {
            if (currentCharIndex < currentText.length) {
                element.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                setTimeout(type, typingSpeed);
            } else {
                isDeleting = true;
                const waitTime = currentTextIndex === texts.length - 1 ? pauseAfterLast : pauseAfterType;
                setTimeout(type, waitTime);
            }
        } else {
            if (currentCharIndex > 0) {
                element.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                setTimeout(type, deletingSpeed);
            } else {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                setTimeout(type, pauseAfterDelete);
            }
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// Legacy animations (for compatibility)
function initLegacyAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0) translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with legacy animation classes
    document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-bottom').forEach(el => {
        observer.observe(el);
    });
}

// Subscribe form handling
function initSubscribeForm() {
    const subscribeBox = document.querySelector('.subscribe-box');
    if (!subscribeBox) return;
    
    const subscribeBtn = subscribeBox.querySelector('.subscribe-btn');
    const subscribeInput = subscribeBox.querySelector('.subscribe-input');
    
    if (!subscribeBtn || !subscribeInput) return;
    
    subscribeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!subscribeInput.value.trim()) {
            showNotification('Please enter your email address.', 'error');
            subscribeInput.focus();
            return;
        }
        
        if (!validateEmail(subscribeInput.value)) {
            showNotification('Please enter a valid email address.', 'error');
            subscribeInput.focus();
            return;
        }
        
        const originalText = subscribeBtn.textContent;
        subscribeBtn.textContent = 'Subscribing...';
        subscribeBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for subscribing to The Cortex newsletter!', 'success');
            subscribeInput.value = '';
            subscribeBtn.textContent = originalText;
            subscribeBtn.disabled = false;
        }, 1500);
    });
    
    // Allow Enter key to submit
    subscribeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            subscribeBtn.click();
        }
    });
}

// Add parallax effect on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const about = document.querySelector('.about');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    if (about) {
        about.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal[style*="display: block"]');
        if (modal) {
            modal.querySelector('.close')?.click();
        }
    }
    
    // Spacebar pauses/resumes carousel
    if (e.key === ' ' && !e.target.matches('input, textarea, button')) {
        e.preventDefault();
        // Optional: Add carousel pause/resume functionality
    }
});



// Add hover effects for all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover class to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .team-card, .social-icon');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
});

// Initialize modal system CSS
document.addEventListener('DOMContentLoaded', function() {
    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
        const modalStyle = document.createElement('style');
        modalStyle.id = 'modal-styles';
        modalStyle.textContent = `
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) translateY(-50px);
                background: linear-gradient(135deg, #0a0e2a, #1a1f4a);
                padding: 40px;
                border-radius: 20px;
                border: 2px solid rgba(157, 228, 255, 0.3);
                color: white;
                max-width: 500px;
                width: 90%;
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(157, 228, 255, 0.3);
            }
            
            .modal-header h3 {
                color: var(--light-blue);
                font-size: 24px;
                margin: 0;
            }
            
            .close {
                font-size: 28px;
                cursor: pointer;
                color: var(--light-blue);
                transition: color 0.3s;
            }
            
            .close:hover {
                color: white;
            }
            
            .modal-body {
                margin-bottom: 30px;
            }
            
            .modal-body p {
                margin-bottom: 15px;
                line-height: 1.6;
            }
            
            .modal-footer {
                display: flex;
                gap: 15px;
                justify-content: flex-end;
            }
            
            .modal-btn {
                padding: 12px 24px;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                font-size: 16px;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .modal-btn.primary {
                background: linear-gradient(90deg, var(--blue), #0066cc);
                color: white;
            }
            
            .modal-btn.secondary {
                background: rgba(157, 228, 255, 0.1);
                color: white;
                border: 1px solid rgba(157, 228, 255, 0.3);
            }
            
            .modal-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(157, 228, 255, 0.3);
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .pulse-animation {
                animation: pulse 0.5s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-5px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(modalStyle);
    }
});

