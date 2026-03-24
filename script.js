document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Suble 3D Tilt for Bento Items & Parallax for Hero
    const heroVisual = document.querySelector('.hero-visual');
    const bentoItems = document.querySelectorAll('.bento-item, .app-frame');
    
    document.addEventListener('mousemove', (e) => {
        // Hero Parallax
        if (heroVisual) {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;
            heroVisual.style.transform = `translate(calc(-50% + ${x}px), calc(-40% + ${y}px))`;
        }

        bentoItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom) {
                const xVal = e.clientX - rect.left;
                const yVal = e.clientY - rect.top;
                
                const xRotation = (yVal - rect.height/2) / (rect.height/2) * -1.5;
                const yRotation = (xVal - rect.width/2) / (rect.width/2) * 1.5;
                
                item.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.01)`;
                item.style.boxShadow = '0 30px 60px rgba(0,0,0,0.12)';
            }
        });
    });

    bentoItems.forEach(item => {
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            item.style.boxShadow = '';
        });
    });

    // Reveal animations on scroll
    const scrollObserverParams = { threshold: 0.1 };
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, scrollObserverParams);

    const animatedItems = document.querySelectorAll('.bento-item, .section-title, .hero-title, .hero-subtitle');
    animatedItems.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        scrollObserver.observe(el);
    });

    // Modal Logic
    const modal = document.getElementById('privacyModal');
    const triggers = document.querySelectorAll('.privacy-trigger');
    const closeBtn = document.getElementById('closeModal');
    const gotItBtn = document.getElementById('gotItBtn');

    if (modal && triggers.length > 0) {
        triggers.forEach(t => {
            t.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);
        gotItBtn.addEventListener('click', closeModal);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});
