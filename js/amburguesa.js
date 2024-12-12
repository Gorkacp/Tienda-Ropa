const hamburger = document.querySelector('.hamburger');
const header = document.querySelector('.header');
const menuItems = document.querySelectorAll('.desktop-menu li a, .mobile-menu li a');

// Toggle de clase 'active' al hacer clic en el ícono de la hamburguesa
hamburger.addEventListener('click', () => {
    header.classList.toggle('active'); // Activa el menú móvil
});

// Prevenir que el menú se cierre al hacer clic en los elementos del menú (solo en el móvil)
menuItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.stopPropagation(); // Evitar que el clic cierre el menú
    });
});

// Escuchar el clic fuera del menú para cerrarlo
document.addEventListener('click', (event) => {
    if (!header.contains(event.target) && header.classList.contains('active')) {
        header.classList.remove('active'); // Cerrar el menú si el clic es fuera del header
    }
});

