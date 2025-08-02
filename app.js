// Professional Resume Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initPrintFunctionality();
    initSmoothScrolling();
    initScrollSpy();
    initInteractiveEffects();
    initPhotoHandling();
    initContactTracking();
    
    console.log('Resume template initialized successfully');
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav-menu').offsetHeight;
                const elementPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                updateActiveNavLink(this);
                
                console.log(`Navigating to section: ${targetId}`);
            }
        });
    });
    
    console.log('Navigation initialized with', navLinks.length, 'links');
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Print functionality - Fixed implementation
function initPrintFunctionality() {
    const printBtn = document.getElementById('printBtn');
    
    if (printBtn) {
        printBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Print button clicked - initiating print dialog');
            
            // Show loading state
            const originalContent = this.innerHTML;
            const originalDisabled = this.disabled;
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
            this.disabled = true;
            
            // Small delay to ensure UI updates, then trigger print
            setTimeout(() => {
                try {
                    // Force print dialog to open
                    window.print();
                    
                    console.log('Print dialog opened successfully');
                } catch (error) {
                    console.error('Print operation failed:', error);
                    
                    // Fallback alert with instructions
                    alert('Print dialog could not be opened automatically. Please use Ctrl+P (Windows) or Cmd+P (Mac) to print this resume.');
                }
                
                // Reset button state after a short delay
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.disabled = originalDisabled;
                }, 1000);
            }, 300);
        });
        
        console.log('Print functionality initialized successfully');
    } else {
        console.error('Print button element not found - check HTML structure');
    }
}

// Professional photo handling - Enhanced for real photo integration
function initPhotoHandling() {
    const photoContainer = document.querySelector('.professional-photo-container');
    const photoPlaceholder = document.querySelector('.professional-photo-placeholder');
    
    if (photoContainer && photoPlaceholder) {
        // Make photo container clickable for future photo upload
        photoPlaceholder.addEventListener('click', function() {
            console.log('Photo placeholder clicked - ready for photo replacement');
            
            // Add a subtle click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add keyboard accessibility
        photoPlaceholder.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make photo focusable
        photoPlaceholder.setAttribute('tabindex', '0');
        photoPlaceholder.setAttribute('role', 'button');
        photoPlaceholder.setAttribute('aria-label', 'Professional photo area - ready for your headshot');
        
        console.log('Photo handling initialized - ready for real photo integration');
    }
    
    // Function to replace placeholder with actual photo (can be called externally)
    window.replaceWithActualPhoto = function(imageSrc, altText = 'Raghavender Pudichery - Professional Headshot') {
        if (photoContainer && photoPlaceholder) {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = altText;
            img.className = 'professional-photo';
            img.loading = 'eager';
            
            // Handle successful load
            img.addEventListener('load', function() {
                photoContainer.replaceChild(img, photoPlaceholder);
                console.log('Professional photo successfully replaced');
                
                // Add click functionality for photo viewing
                img.addEventListener('click', function() {
                    createPhotoModal(this.src, this.alt);
                });
                
                // Add keyboard accessibility
                img.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        createPhotoModal(this.src, this.alt);
                    }
                });
                
                img.setAttribute('tabindex', '0');
                img.setAttribute('role', 'button');
                img.setAttribute('aria-label', 'Click to view larger photo');
            });
            
            // Handle load error
            img.addEventListener('error', function() {
                console.error('Failed to load professional photo');
                alert('Unable to load the professional photo. Please check the image source.');
            });
        }
    };
}

// Create photo modal for larger viewing
function createPhotoModal(src, alt) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.photo-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <div class="photo-modal-overlay">
            <div class="photo-modal-content">
                <button class="photo-modal-close" aria-label="Close photo">
                    <i class="fas fa-times"></i>
                </button>
                <img src="${src}" alt="${alt}" class="photo-modal-image">
                <p class="photo-modal-caption">${alt}</p>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .photo-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .photo-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-out;
        }
        
        .photo-modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: var(--color-surface);
            border-radius: var(--radius-lg);
            padding: var(--space-20);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease-out;
        }
        
        .photo-modal-image {
            max-width: 400px;
            max-height: 400px;
            width: auto;
            height: auto;
            border-radius: var(--radius-base);
            display: block;
            margin: 0 auto;
        }
        
        .photo-modal-caption {
            text-align: center;
            margin-top: var(--space-16);
            color: var(--color-text-secondary);
            font-size: var(--font-size-sm);
        }
        
        .photo-modal-close {
            position: absolute;
            top: var(--space-12);
            right: var(--space-12);
            background: none;
            border: none;
            font-size: var(--font-size-xl);
            color: var(--color-text-secondary);
            cursor: pointer;
            padding: var(--space-8);
            border-radius: var(--radius-sm);
            transition: all var(--duration-fast) var(--ease-standard);
        }
        
        .photo-modal-close:hover {
            background: var(--color-bg-1);
            color: var(--color-text);
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: scale(0.8) translateY(20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
    `;
    
    // Add styles to document
    let styleSheet = document.querySelector('#photo-modal-styles');
    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = 'photo-modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add modal to DOM
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    // Event listeners
    modal.querySelector('.photo-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.photo-modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Keyboard support
    document.addEventListener('keydown', function handleModalKeydown(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleModalKeydown);
        }
    });
    
    console.log('Photo modal created');
}

// Smooth scrolling for all internal links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a hash
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.nav-menu').offsetHeight;
                const elementPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
                
                console.log(`Smooth scrolling to: ${href}`);
            }
        });
    });
    
    console.log('Smooth scrolling initialized for', links.length, 'links');
}

// Scroll spy to highlight current section in navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateScrollSpy() {
        const scrollPos = window.scrollY + 150; // Offset for better UX
        
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
    
    // Throttle scroll events for better performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollSpy();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Initial call
    updateScrollSpy();
    
    console.log('Scroll spy initialized for', sections.length, 'sections');
}

// Interactive effects and animations
function initInteractiveEffects() {
    // Achievement cards hover effects
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(33, 128, 141, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Skill tag hover effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.style.transition = 'all 0.2s ease';
        
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 2px 8px rgba(33, 128, 141, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Experience item hover effects
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(3px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Language item hover effects
    const languageItems = document.querySelectorAll('.language-item');
    languageItems.forEach(item => {
        item.style.transition = 'transform 0.2s ease';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(3px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Certification item hover effects
    const certificationItems = document.querySelectorAll('.certification-item');
    certificationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
            this.style.transform = 'scale(1)';
        });
    });
    
    // Competency category hover effects
    const competencyCategories = document.querySelectorAll('.competency-category');
    competencyCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Add intersection observer for fade-in animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe achievement cards, experience items, and other elements
        const animatedElements = document.querySelectorAll(
            '.achievement-card, .experience-item, .competency-category, .education-block, .certifications-block'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    console.log('Interactive effects initialized');
}

// Contact link click tracking and copy functionality
function initContactTracking() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const link = item.querySelector('a');
        const span = item.querySelector('span');
        
        if (link) {
            link.addEventListener('click', function() {
                const href = this.getAttribute('href');
                if (href.startsWith('tel:')) {
                    trackContactClick('phone');
                } else if (href.startsWith('mailto:')) {
                    trackContactClick('email');
                } else if (href.includes('linkedin')) {
                    trackContactClick('linkedin');
                }
            });
        } else if (span) {
            // Make non-linked contact info clickable for copy functionality
            span.addEventListener('click', function() {
                const text = this.textContent;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(() => {
                        console.log('Contact info copied to clipboard:', text);
                        
                        // Show brief feedback
                        const originalText = this.textContent;
                        this.textContent = 'Copied!';
                        this.style.color = 'var(--color-success)';
                        setTimeout(() => {
                            this.textContent = originalText;
                            this.style.color = '';
                        }, 2000);
                    }).catch(() => {
                        console.log('Clipboard API not available');
                    });
                }
            });
            
            // Add cursor pointer to indicate clickability
            span.style.cursor = 'pointer';
            span.title = 'Click to copy';
        }
    });
    
    console.log('Contact tracking initialized');
}

// Contact link click tracking (for analytics if needed)
function trackContactClick(type) {
    console.log(`Contact method clicked: ${type}`);
    
    // Add any analytics tracking here if needed
    // Example: gtag('event', 'contact_click', { contact_type: type });
}

// Enhanced keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Ctrl+P or Cmd+P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        const printBtn = document.getElementById('printBtn');
        if (printBtn) {
            printBtn.click();
        }
    }
    
    // Alt + P for print (alternative)
    if (e.altKey && e.key === 'p') {
        e.preventDefault();
        const printBtn = document.getElementById('printBtn');
        if (printBtn) {
            printBtn.click();
        }
    }
    
    // Escape key to blur focused elements
    if (e.key === 'Escape') {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }
});

// Performance optimization: Debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Handle window resize for responsive adjustments
const handleResize = debounce(function() {
    // Recalculate scroll spy positions after resize
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, 250);

window.addEventListener('resize', handleResize);

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add a subtle entrance animation to the main container
    const resumeContainer = document.querySelector('.resume-container');
    if (resumeContainer) {
        resumeContainer.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        resumeContainer.style.opacity = '1';
        resumeContainer.style.transform = 'translateY(0)';
    }
    
    console.log('Resume template fully loaded and ready for professional photo');
});

// Error handling for any potential issues
window.addEventListener('error', function(e) {
    console.error('Resume template error:', e.error);
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Progressive enhancement for modern browsers
if ('IntersectionObserver' in window) {
    console.log('Enhanced animations enabled');
} else {
    console.log('Using fallback animations');
    // Fallback for older browsers
    const fallbackElements = document.querySelectorAll(
        '.achievement-card, .experience-item, .competency-category'
    );
    
    fallbackElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// Export functions for potential external use
window.ResumeTemplate = {
    updateActiveNavLink,
    trackContactClick,
    isInViewport,
    initNavigation,
    initPrintFunctionality,
    initPhotoHandling,
    createPhotoModal,
    replaceWithActualPhoto: window.replaceWithActualPhoto
};

// Instructions for photo replacement (console message)
console.log('%c📸 Photo Integration Ready!', 'color: #218380; font-size: 16px; font-weight: bold;');
console.log('%cTo replace the placeholder with your actual professional photo:', 'color: #666; font-size: 14px;');
console.log('%c1. Call: ResumeTemplate.replaceWithActualPhoto("your-photo-url.jpg")', 'color: #333; font-size: 12px;');
console.log('%c2. Or replace the .professional-photo-placeholder element in HTML', 'color: #333; font-size: 12px;');
console.log('%c3. The photo will automatically integrate with all existing functionality', 'color: #333; font-size: 12px;');