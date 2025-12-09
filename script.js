document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE NAVEGACIÓN MÓVIL ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Cambiar el ícono del botón (hamburguesa <-> cerrar)
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); 
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); 
        }
    });

    // Cierra el menú cuando se hace clic en un enlace (solo en móvil)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- LÓGICA DE VISTA PREVIA (MODAL) ---
    const modal = document.getElementById('preview-modal');
    const closeBtn = document.getElementById('close-modal');
    const iframe = document.getElementById('preview-iframe');
    const modalTitle = document.getElementById('modal-title');
    const projectsGrid = document.querySelector('.projects-grid');

    projectsGrid.addEventListener('click', (e) => {
        // Busca el botón primario (Vista Previa) que fue presionado
        const primaryBtn = e.target.closest('.btn-primary');
        if (primaryBtn) {
            e.preventDefault(); // Detiene la navegación normal del enlace
            
            const projectCard = primaryBtn.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const projectUrl = primaryBtn.getAttribute('href');
            
            if (projectUrl && projectUrl !== '#') {
                modalTitle.textContent = "Vista Previa: " + projectTitle;
                iframe.src = projectUrl;
                modal.style.display = 'flex'; // Muestra el modal
            } else {
                 alert("Lo siento, este proyecto no tiene una URL de vista previa funcional.");
            }
        }
    });

    // Cerrar el modal al hacer clic en (X)
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        iframe.src = ''; // Limpiar el iframe al cerrar
    });

    // Cerrar el modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            iframe.src = ''; // Limpiar el iframe al cerrar
        }
    });
});