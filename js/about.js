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
    
    // Initialize buttons
    initButtons();
    
    // Initialize typing effect for tagline
    initTypingEffect();
    
    // Initialize legacy animations
    initLegacyAnimations();
    
    // Initialize subscribe form
    initSubscribeForm();
});


// Scroll animation with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add delay for staggered animations
            const delay = entry.target.getAttribute('data-delay') || 0;
            
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay * 1000);
            
            // Stop observing after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-bottom, .fade-in-up, .fade-in, .scale-in').forEach(el => {
    observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-container');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    typeTagline();
    
    // Add initial class for smooth transition
    document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-bottom, .fade-in-up, .fade-in, .scale-in').forEach(el => {
        el.style.transition = 'all 0.8s ease-out';
    });
});

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

// إضافة هذه الدوال في نهاية ملف about.js

function initCarousel() {
    // يمكن إضافة كاروسيل إذا لزم الأمر
    console.log("Carousel initialized");
}

function initScrollAnimations() {
    // تم تهيئتها بالفعل في الكود
}

function initNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar-container');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initScrollToTop() {
    // إنشاء زر العودة للأعلى
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #04B4E7, #0278a8);
        border: 2px solid var(--light-blue);
        color: white;
        font-size: 24px;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 0 20px rgba(157, 228, 255, 0.5);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initContactForm() {
    const contactForm = document.querySelector('form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    });
}

function initButtons() {
    // تأثيرات الأزرار
    const buttons = document.querySelectorAll('button:not(.social-icon):not(.close):not(.modal-btn)');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // زر Learn More في قسم About
    const learnMoreBtn = document.querySelector('.animated-button');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const defenceSection = document.querySelector('#defence') || document.querySelector('.defence-section');
            if (defenceSection) {
                defenceSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function initTypingEffect() {
    // إضافة تأثير الكتابة إذا كان هناك عنصر للكتابة
    const typingElement = document.getElementById('typing-tagline');
    if (typingElement) {
        typeTagline();
    }
}

function initLegacyAnimations() {
    // هذه الدالة للحفاظ على التوافق مع الأنيميشن القديمة
    console.log("Legacy animations initialized");
}

function initSubscribeForm() {
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const subscribeInput = document.querySelector('.subscribe-input');
    
    if (subscribeBtn && subscribeInput) {
        subscribeBtn.addEventListener('click', function() {
            const email = subscribeInput.value;
            if (email && validateEmail(email)) {
                showNotification('Subscribed successfully!', 'success');
                subscribeInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
        
        subscribeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)'};
        color: white;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// إضافة أنيميشن للإشعارات
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// تهيئة كل العناصر عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', function() {
    // تطبيق الأنيميشن على العناصر الموجودة
    const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-bottom, .fade-in-up, .fade-in-left, .fade-in-right, .fade-in, .scale-in');
    
    animatedElements.forEach(el => {
        el.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
    
    // بدء الأنيميشن الأولي
    setTimeout(() => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    }, 100);
    
    // إضافة Intersection Observer للعناصر الجديدة
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});