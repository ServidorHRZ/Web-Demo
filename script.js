document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    let lastScroll = 0;

    // Función para manejar el menú hamburguesa
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animar las barras del menú hamburguesa
        const bars = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            const bars = hamburger.querySelectorAll('span');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Efecto de scroll en el header
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Mostrar/ocultar header al hacer scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        // Añadir sombra al header cuando se hace scroll
        if (currentScroll > 50) {
            header.style.boxShadow = 'var(--shadow)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Activar el enlace de navegación correspondiente
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Animación suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animación para los elementos de logros
    const logroItems = document.querySelectorAll('.logro-item');
    logroItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Animación para las tarjetas de servicios
    const servicioCards = document.querySelectorAll('.servicio-card');
    servicioCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Animación para los testimonios
    const testimonios = document.querySelectorAll('.testimonio');
    testimonios.forEach((testimonio, index) => {
        testimonio.style.animationDelay = `${index * 0.3}s`;
    });

    // Inicializar contadores para los logros
    const contadores = document.querySelectorAll('.contador');
    contadores.forEach(contador => {
        const target = parseInt(contador.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                contador.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                contador.textContent = target;
            }
        };

        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                counterObserver.unobserve(contador);
            }
        });

        counterObserver.observe(contador);
    });

    // Efecto parallax para la sección de inicio
    const inicio = document.querySelector('.inicio');
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        if (inicio) {
            inicio.style.backgroundPositionY = `${scroll * 0.5}px`;
        }
    });

    // Efecto hover 3D para las tarjetas
    const cards = document.querySelectorAll('.servicio-card, .formato');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });
});