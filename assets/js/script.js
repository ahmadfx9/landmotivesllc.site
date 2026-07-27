/**
 * LAND MOTIVES LLC - Interactions & Animations
 * Theme Toggle, Scroll Reveal, Mobile Nav
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Toggle
    const themeBtn = document.querySelector('.theme-btn');
    const htmlEl = document.documentElement;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
    }
    
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            htmlEl.classList.toggle('dark');
            const isDark = htmlEl.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
        });
        
        // Initial icon state
        themeBtn.innerHTML = htmlEl.classList.contains('dark') ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    }

    // 2. Scroll Reveal Animations (Intersection Observer + Fallback)
    const animatedElements = document.querySelectorAll('.animate-up, .animate-left, .animate-right');

    const revealElement = (el) => {
        el.classList.add('is-visible');
    };

    const checkVisibility = () => {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= viewportHeight + 100 && rect.bottom >= -100) {
                revealElement(el);
            }
        });
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.01, rootMargin: '100px 0px 100px 0px' });

        animatedElements.forEach(el => observer.observe(el));
    }

    // Trigger check immediately and on window events
    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    window.addEventListener('load', checkVisibility);

    setTimeout(checkVisibility, 50);
    setTimeout(checkVisibility, 200);
    setTimeout(checkVisibility, 500);

    // 3. Interactive Tabs Logic
    const tabs = document.querySelectorAll('.problem-tab');
    const panes = document.querySelectorAll('.problem-pane');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and panes
                tabs.forEach(t => t.classList.remove('active'));
                panes.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show the corresponding pane
                const target = tab.getAttribute('data-target');
                const targetPane = document.getElementById(target);
                if(targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // 4. Operations Showcase Tabs Logic
    const opsTabs = document.querySelectorAll('.ops-tab');
    const opsPanes = document.querySelectorAll('.ops-pane');
    const opsDots = document.querySelectorAll('.ops-dot');

    function switchOpsTab(targetId) {
        opsTabs.forEach(t => t.classList.remove('active'));
        opsPanes.forEach(p => p.classList.remove('active'));
        opsDots.forEach(d => d.classList.remove('active'));

        const activeTab = document.querySelector(`.ops-tab[data-ops-target="${targetId}"]`);
        const activePane = document.getElementById(targetId);
        const activeDot = document.querySelector(`.ops-dot[data-ops-dot="${targetId}"]`);

        if (activeTab) activeTab.classList.add('active');
        if (activePane) activePane.classList.add('active');
        if (activeDot) activeDot.classList.add('active');
    }

    opsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchOpsTab(tab.getAttribute('data-ops-target'));
        });
    });

    opsDots.forEach(dot => {
        dot.addEventListener('click', () => {
            switchOpsTab(dot.getAttribute('data-ops-dot'));
        });
    });

    // 5. Accordion Logic (Services & FAQs)
    const accItems = document.querySelectorAll('.svc-accordion-item');
    if (accItems.length > 0) {
        accItems.forEach(item => {
            const header = item.querySelector('.svc-acc-header');
            if (header) {
                header.addEventListener('click', () => {
                    // Toggle current item
                    item.classList.toggle('active');
                });
            }
        });
    }

    // 6. Mobile Menu Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    if (mobileMenuBtn && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuOverlay.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu if user clicks outside of it (optional overlay behavior)
        document.addEventListener('click', (e) => {
            if (mobileMenuOverlay.classList.contains('active') && !mobileMenuOverlay.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
});
