
  function typeTagline() {
    const element = document.getElementById('typing-tagline');
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
    
    setTimeout(type, 500);
}

window.addEventListener('DOMContentLoaded', typeTagline);

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

document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-bottom').forEach(el => {
    observer.observe(el);
});

