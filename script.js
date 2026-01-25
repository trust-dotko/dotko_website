// ===== DOM Elements =====
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('backToTop');
const fadeElements = document.querySelectorAll('.fade-in');
const stats = document.querySelectorAll('.stat-number');
const contactForm = document.getElementById('earlyAccessForm');

// ===== Header Scroll Effect =====
window.addEventListener('scroll', () => {
    // Header background on scroll
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Fade in elements on scroll
    fadeInOnScroll();
});

// ===== Mobile Menu Toggle =====
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times';
        document.body.style.overflow = 'hidden';
    } else {
        icon.className = 'fas fa-bars';
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        document.body.style.overflow = 'auto';
    });
});

// ===== Back to Top =====
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Animated Counter =====
function animateCounter() {
    stats.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = target % 1 === 0 ? 
                Math.floor(current) : 
                current.toFixed(1);
        }, 16);
    });
}

// ===== Fade In on Scroll =====
function fadeInOnScroll() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
            
            // Animate counters when they become visible
            if (element.querySelector('.stat-number')) {
                setTimeout(animateCounter, 300);
            }
        }
    });
}

// ===== Form Submission =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 40px;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.2);
                text-align: center;
                z-index: 10000;
                max-width: 500px;
                width: 90%;
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #1565C0 0%, #FFB300 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                ">
                    <i class="fas fa-check" style="color: white; font-size: 32px;"></i>
                </div>
                <h3 style="margin-bottom: 15px; color: #0A0F29;">Application Received!</h3>
                <p style="color: #64748B; margin-bottom: 25px;">
                    Thank you for your interest in Dotko.in. We'll contact you within 24 hours to set up your early access.
                </p>
                <button id="closeSuccess" style="
                    background: linear-gradient(135deg, #1565C0 0%, #FFB300 100%);
                    color: white;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 50px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 16px;
                ">
                    Continue Browsing
                </button>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(10, 15, 41, 0.8);
                backdrop-filter: blur(5px);
                z-index: 9999;
            "></div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Close success message
        document.getElementById('closeSuccess').addEventListener('click', () => {
            document.body.removeChild(successMessage);
        });
        
        // Also close when clicking outside
        successMessage.addEventListener('click', (e) => {
            if (e.target === successMessage) {
                document.body.removeChild(successMessage);
            }
        });
    });
}

// ===== Newsletter Form =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        // Show toast notification
        showToast('Subscribed successfully! Check your email for confirmation.');
        newsletterForm.reset();
    });
}

// ===== Toast Notification =====
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #1565C0 0%, #FFB300 100%);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(21, 101, 192, 0.3);
        z-index: 10001;
        font-weight: 500;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// Add toast animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Progress Bar Animation =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Initial fade in check
    fadeInOnScroll();
    
    // Animate progress bars
    setTimeout(animateProgressBars, 1000);
    
    // Animate dashboard cards
    const dashboard = document.querySelector('.dashboard-preview');
    if (dashboard) {
        dashboard.style.animationPlayState = 'running';
    }
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.problem-card, .solution-card, .audience-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add loading animation for stats
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            document.body.style.overflow = 'auto';
        }
    });
});

// ===== Performance Optimization =====
// Debounce scroll events
let scrollTimer;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        // Header scroll effect
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, 10);
});

// ===== Add Loading State for Images =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    if (img.complete) {
        img.classList.add('loaded');
    }
});
