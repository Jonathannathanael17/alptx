document.addEventListener('DOMContentLoaded', function() {
    
    /* =========================================
       1. MOBILE MENU LOGIC (HAMBURGER)
       ========================================= */
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Only run this if the mobile button actually exists on the page
    if (menuBtn) {
        // Toggle menu open/close
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    /* =========================================
       2. CAROUSEL LOGIC
       ========================================= */
    const track = document.querySelector('.carousel-track');
    
    // Only run carousel code if the carousel exists on this page
    if (track) {
        const slides = Array.from(track.children);
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const currentPageSpan = document.getElementById('current-page');
        const totalPagesSpan = document.getElementById('total-pages');

        let currentIndex = 0;
        const totalSlides = slides.length;

        // Set "Total Pages" text
        if (totalPagesSpan) totalPagesSpan.textContent = totalSlides;

        // Move Slide Function (using transform only)
        const moveToSlide = (targetIndex) => {
            if (targetIndex < 0) {
                targetIndex = totalSlides - 1;
            } else if (targetIndex >= totalSlides) {
                targetIndex = 0;
            }

            track.style.transform = 'translateX(-' + (100 * targetIndex) + '%)';
            currentIndex = targetIndex;
            
            if (currentPageSpan) currentPageSpan.textContent = currentIndex + 1;
        }

        // Event Listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                moveToSlide(currentIndex + 1);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                moveToSlide(currentIndex - 1);
            });
        }

        // Responsive Fix
        window.addEventListener('resize', () => {
            // Snap to current slide without animation
            const originalTransition = track.style.transition;
            track.style.transition = 'none';
            track.style.transform = 'translateX(-' + (100 * currentIndex) + '%)';
            
            setTimeout(() => {
                track.style.transition = originalTransition;
            }, 50);
        });
    }
});

