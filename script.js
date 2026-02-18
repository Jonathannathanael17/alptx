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

        /* =========================================
           3. LIGHTBOX MODAL (Tap to Zoom)
           ========================================= */
        const carouselContainer = track.parentElement.parentElement;
        const lightbox = document.createElement('div');
        lightbox.className = 'carousel-lightbox';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'carousel-lightbox-close';
        closeBtn.textContent = '×';
        closeBtn.setAttribute('aria-label', 'Close');
        
        const lightboxImg = document.createElement('img');
        
        lightbox.appendChild(closeBtn);
        lightbox.appendChild(lightboxImg);
        carouselContainer.appendChild(lightbox);

        // Click image to open lightbox
        slides.forEach((slide) => {
            const img = slide.querySelector('img');
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close lightbox
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        /* =========================================
           4. SWIPE GESTURE DETECTION
           ========================================= */
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > minSwipeDistance) {
                if (diff > 0) {
                    // Swiped left → next slide
                    moveToSlide(currentIndex + 1);
                } else {
                    // Swiped right → previous slide
                    moveToSlide(currentIndex - 1);
                }
            }
        }
    }
});

