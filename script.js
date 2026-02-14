document.addEventListener('DOMContentLoaded', function() {
    
    // --- SELECT DOM ELEMENTS ---
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    // Indicator Elements
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');

    // --- SETUP STATE ---
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Set "Total Pages" text immediately (e.g., " / 3")
    totalPagesSpan.textContent = totalSlides;

    // Get width of one slide to know how far to move
    // We update this on resize to be responsive
    let slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides side-by-side
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    // --- CORE MOVING FUNCTION ---
    const moveToSlide = (targetIndex) => {
        // Handle Infinite Loop (Optional logic)
        // If going back from 0, go to last. If going forward from last, go to 0.
        if (targetIndex < 0) {
            targetIndex = totalSlides - 1;
        } else if (targetIndex >= totalSlides) {
            targetIndex = 0;
        }

        // Move the track
        track.style.transform = 'translateX(-' + (slideWidth * targetIndex) + 'px)';
        
        // Update State
        currentIndex = targetIndex;

        // Update Text Indicator (Index is 0-based, so +1 for display)
        currentPageSpan.textContent = currentIndex + 1;
    }

    // --- BUTTON EVENT LISTENERS ---
    
    // Click Right (Next)
    nextBtn.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });

    // Click Left (Prev)
    prevBtn.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });

    // --- RESPONSIVE RESIZE FIX ---
    window.addEventListener('resize', () => {
        // Recalculate slide width
        slideWidth = slides[0].getBoundingClientRect().width;
        
        // Reset positions
        slides.forEach(setSlidePosition);
        
        // Snap to current slide immediately without animation to prevent glitch
        const originalTransition = track.style.transition;
        track.style.transition = 'none';
        track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
        
        // Restore animation
        setTimeout(() => {
            track.style.transition = originalTransition;
        }, 50);
    });
});