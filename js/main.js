/**
 * For Honitee ❤️ - Premium Interactive Script
 * Author: Antigravity AI
 * Year: 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    initNavbarScroll();
    initMobileNav();
    initAmbientParticles();
    initCelebrationSystem();
    initPhotoUploads();
    initTimelineEdits();
    initScrollRevealFallback();
});

/* ==========================================================================
   NAVBAR ACTIVE SCROLL MODULE
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   MOBILE HAMBURGER DROPDOWN MENU
   ========================================================================== */
function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (!hamburger || !navMenu) return;

    const navLinks = navMenu.querySelectorAll('.nav-link');

    function toggleMenu() {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    }

    function closeMenu() {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    // Toggle on hamburger click
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when a nav link is clicked (and let smooth scroll happen)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            hamburger.focus();
        }
    });

    // Close menu on window resize beyond mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

/* ==========================================================================
   AMBIENT BACKGROUND FIREFLIES (PARTICLES CANVAS)
   ========================================================================== */
function initAmbientParticles() {
    const canvas = document.getElementById('ambient-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const maxParticles = 40;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Firefly {
        constructor() {
            this.reset(true);
        }
        
        reset(isInitial = false) {
            this.x = Math.random() * canvas.width;
            this.y = isInitial ? Math.random() * canvas.height : canvas.height + 20;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = -(Math.random() * 0.5 + 0.1); // Slowly drift upwards
            this.alpha = 0;
            this.targetAlpha = Math.random() * 0.5 + 0.1;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
            this.wobbleSpeed = Math.random() * 0.02;
            this.wobbleRange = Math.random() * 0.5 + 0.1;
            this.angle = Math.random() * Math.PI * 2;
        }
        
        update() {
            // Move particle
            this.x += this.speedX + Math.sin(this.angle) * this.wobbleRange;
            this.y += this.speedY;
            this.angle += this.wobbleSpeed;
            
            // Fade in/out logic
            if (this.alpha < this.targetAlpha) {
                this.alpha += this.fadeSpeed;
            }
            
            // Reset if particle moves offscreen or fades out
            if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            // Draw soft golden glowing firefly
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
            gradient.addColorStop(0, 'rgba(247, 231, 196, 1)'); // Soft light gold
            gradient.addColorStop(0.3, 'rgba(197, 160, 89, 0.4)');
            gradient.addColorStop(1, 'rgba(197, 160, 89, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Seed fireflies
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Firefly());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* ==========================================================================
   GLOBAL CELEBRATION CANVAS: CONFETTI & FLOATING HEARTS & BURSTS
   ========================================================================== */
function initCelebrationSystem() {
    const canvas = document.getElementById('celebration-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let activeEffects = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Draw perfect Bezier heart
    function drawHeart(c, x, y, size, color, alpha) {
        c.save();
        c.globalAlpha = alpha;
        c.fillStyle = color;
        c.beginPath();
        c.moveTo(x, y - size / 4);
        c.bezierCurveTo(x - size / 2, y - size, x - size, y - size / 3, x, y + size * 0.85);
        c.bezierCurveTo(x + size, y - size / 3, x + size / 2, y - size, x, y - size / 4);
        c.closePath();
        c.fill();
        c.restore();
    }
    
    // Class for Click Heart Burst
    class ClickHeart {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 15 + 10;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = -(Math.random() * 5 + 3);
            this.alpha = 1;
            this.fadeSpeed = Math.random() * 0.02 + 0.015;
            this.angle = Math.random() * 360;
            this.spinSpeed = Math.random() * 4 - 2;
            const colors = ['#F2B6B6', '#FFF0F0', '#C5A059', '#E89F9F', '#C67878'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += 0.08; // Slight gravity pull down after burst
            this.alpha -= this.fadeSpeed;
            this.angle += this.spinSpeed;
        }
        
        draw() {
            drawHeart(ctx, this.x, this.y, this.size, this.color, this.alpha);
        }
    }
    
    // Class for Floating Birthday Hearts (Rising from Bottom)
    class FloatingHeart {
        constructor() {
            this.reset();
            this.y = canvas.height + Math.random() * 100;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 20;
            this.size = Math.random() * 20 + 8;
            this.speedY = -(Math.random() * 2 + 0.5);
            this.wobbleSpeed = Math.random() * 0.03 + 0.01;
            this.wobbleRange = Math.random() * 2 + 0.5;
            this.angle = Math.random() * Math.PI * 2;
            this.alpha = Math.random() * 0.6 + 0.2;
            const colors = ['#FFF0F0', '#F2B6B6', '#F9D5D5', '#E89F9F', '#FCE8E8'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.angle) * this.wobbleRange;
            this.angle += this.wobbleSpeed;
        }
        
        draw() {
            drawHeart(ctx, this.x, this.y, this.size, this.color, this.alpha);
        }
    }
    
    // Class for Celebration Confetti
    class Confetti {
        constructor(isFromSide = false, side = 'left') {
            this.size = Math.random() * 8 + 6;
            this.alpha = 1;
            this.fadeSpeed = Math.random() * 0.008 + 0.003;
            this.gravity = Math.random() * 0.15 + 0.1;
            this.drag = 0.98;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            
            const shapes = ['square', 'circle', 'triangle'];
            this.shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            const colors = ['#E89F9F', '#C5A059', '#C67878', '#FAF6EE', '#F7E7C4', '#EFE9DC'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            if (isFromSide) {
                this.y = canvas.height * 0.7;
                if (side === 'left') {
                    this.x = 0;
                    this.speedX = Math.random() * 15 + 10;
                    this.speedY = -(Math.random() * 18 + 12);
                } else {
                    this.x = canvas.width;
                    this.speedX = -(Math.random() * 15 + 10);
                    this.speedY = -(Math.random() * 18 + 12);
                }
            } else {
                this.x = Math.random() * canvas.width;
                this.y = -20;
                this.speedX = Math.random() * 4 - 2;
                this.speedY = Math.random() * 5 + 2;
            }
        }
        
        update() {
            this.speedX *= this.drag;
            this.speedY += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= this.fadeSpeed;
            this.rotation += this.rotationSpeed;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            
            ctx.beginPath();
            if (this.shape === 'circle') {
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            } else if (this.shape === 'triangle') {
                ctx.moveTo(0, -this.size / 2);
                ctx.lineTo(this.size / 2, this.size / 2);
                ctx.lineTo(-this.size / 2, this.size / 2);
                ctx.closePath();
            } else {
                ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
            }
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Ambient floating hearts initialization
    let ambientHearts = [];
    const maxAmbientHearts = 15;
    for (let i = 0; i < maxAmbientHearts; i++) {
        ambientHearts.push(new FloatingHeart());
    }
    
    // Global Click Emitter for Heart Bursts
    window.addEventListener('click', (e) => {
        // Exclude inputs, buttons, links, labels, and contenteditables
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('label') || e.target.closest('.timeline-desc')) return;
        
        for (let i = 0; i < 15; i++) {
            activeEffects.push(new ClickHeart(e.clientX, e.clientY));
        }
    });
    
    // Shoot Side Confetti Blasts
    function triggerConfettiBlast() {
        // Left blast
        for (let i = 0; i < 75; i++) {
            activeEffects.push(new Confetti(true, 'left'));
        }
        // Right blast
        for (let i = 0; i < 75; i++) {
            activeEffects.push(new Confetti(true, 'right'));
        }
    }
    
    // Event listeners for celebration triggers
    const shootConfettiBtn = document.getElementById('btn-shoot-confetti');
    if (shootConfettiBtn) {
        shootConfettiBtn.addEventListener('click', triggerConfettiBlast);
    }
    
    const heartTrigger = document.getElementById('trigger-celebration');
    if (heartTrigger) {
        heartTrigger.addEventListener('click', triggerConfettiBlast);
    }
    
    // Animation main loop
    function updateLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 1. Draw ambient floating hearts
        ambientHearts.forEach(h => {
            h.update();
            h.draw();
            if (h.y < -20) {
                h.reset();
            }
        });
        
        // 2. Draw active burst particles (hearts & confetti)
        for (let i = activeEffects.length - 1; i >= 0; i--) {
            const p = activeEffects[i];
            p.update();
            p.draw();
            
            if (p.alpha <= 0 || p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
                activeEffects.splice(i, 1);
            }
        }
        
        requestAnimationFrame(updateLoop);
    }
    
    updateLoop();
}

/* ==========================================================================
   PHOTO GALLERY FILE UPLOADS & LOCALSTORAGE PERSISTENCE
   ========================================================================== */
function initPhotoUploads() {
    const photoPairs = [
        { uploadId: 'upload-childhood', imgId: 'img-childhood', storeKey: 'mom_photo_childhood' },
        { uploadId: 'upload-schooldays', imgId: 'img-schooldays', storeKey: 'mom_photo_schooldays' },
        { uploadId: 'upload-lessons', imgId: 'img-lessons', storeKey: 'mom_photo_lessons' },
        { uploadId: 'upload-today', imgId: 'img-today', storeKey: 'mom_photo_today' }
    ];
    
    photoPairs.forEach(pair => {
        const inputEl = document.getElementById(pair.uploadId);
        const imgEl = document.getElementById(pair.imgId);
        
        if (!inputEl || !imgEl) return;
        
        // 1. Load saved photos from LocalStorage if present
        const savedPhoto = localStorage.getItem(pair.storeKey);
        if (savedPhoto) {
            imgEl.src = savedPhoto;
        }
        
        // 2. Handle new uploads
        inputEl.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64String = event.target.result;
                    imgEl.src = base64String;
                    
                    // Persist Base64 string in localstorage
                    try {
                        localStorage.setItem(pair.storeKey, base64String);
                    } catch (error) {
                        console.warn('LocalStorage limit exceeded. Storing images in LocalStorage is only supported for typical image files. Try uploading a smaller image or compression.', error);
                        alert("To save large photos across refreshes, please upload images smaller than 1.5MB! It will display fine for this session though.");
                    }
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Accessibility: allow keyboard activation for label buttons
        const labelEl = inputEl.previousElementSibling;
        if (labelEl) {
            labelEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    inputEl.click();
                }
            });
        }
    });
}

/* ==========================================================================
   EDITABLE TIMELINE NODES SYNCED WITH LOCALSTORAGE
   ========================================================================== */
function initTimelineEdits() {
    const editTimelineButtons = document.querySelectorAll('.btn-edit-timeline');
    
    editTimelineButtons.forEach(btn => {
        const targetId = btn.getAttribute('data-target');
        const contentEl = document.getElementById(targetId);
        if (!contentEl) return;
        
        const cardContainer = contentEl.closest('.timeline-content');
        const actionsContainer = cardContainer.querySelector('.edit-actions');
        const saveBtn = cardContainer.querySelector('.btn-save-edit');
        const cancelBtn = cardContainer.querySelector('.btn-cancel-edit');
        
        const storageKey = `mom_timeline_${targetId}`;
        
        // 1. Load custom memories from storage if available
        const savedMemory = localStorage.getItem(storageKey);
        if (savedMemory) {
            contentEl.textContent = savedMemory;
        }
        
        let originalText = "";
        
        // 2. Toggle Edit Mode
        btn.addEventListener('click', () => {
            originalText = contentEl.textContent.trim();
            contentEl.contentEditable = "true";
            contentEl.focus();
            
            // Move cursor to end of text
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(contentEl);
            range.collapse(false); // false means collapse to end
            selection.removeAllRanges();
            selection.addRange(range);
            
            actionsContainer.classList.remove('hidden');
            btn.classList.add('hidden'); // Hide the main edit button
        });
        
        // 3. Save Changes
        saveBtn.addEventListener('click', () => {
            const newText = contentEl.textContent.trim();
            contentEl.contentEditable = "false";
            
            localStorage.setItem(storageKey, newText);
            
            actionsContainer.classList.add('hidden');
            btn.classList.remove('hidden');
        });
        
        // 4. Cancel Changes
        cancelBtn.addEventListener('click', () => {
            contentEl.textContent = originalText;
            contentEl.contentEditable = "false";
            
            actionsContainer.classList.add('hidden');
            btn.classList.remove('hidden');
        });
    });
    
    // Global data reset helper
    const resetBtn = document.getElementById('btn-reset-data');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm("Would you like to reset all personalized memories and uploaded photos to their original states?")) {
                localStorage.clear();
                window.location.reload();
            }
        });
    }
}

/* ==========================================================================
   SCROLL REVEAL STYLES PROGRESSIVE ENHANCEMENT FALLBACK (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollRevealFallback() {
    // If native scroll timelines are supported, native CSS handles everything performantly!
    if (CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
        console.log("Native CSS scroll-driven timelines supported! Skipping JavaScript Fallback.");
        return;
    }
    
    console.log("Native CSS scroll timelines unsupported. Deploying smooth IntersectionObserver fallback.");
    
    const revealElements = document.querySelectorAll('[data-reveal], .polaroid-card, .lesson-card, .timeline-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Reveal when 15% visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        el.classList.add('reveal-init');
        observer.observe(el);
    });
}
