// URL base de la API
const apiUrl = 'https://api.escuelajs.co/api/v1';

// Variables globales para el control de paginación
let currentPage = 1;
const productsPerPage = 10;
let currentCategory = ''; // Variable para almacenar la categoría actual
let loadedProducts = new Set(); // Conjunto para almacenar los ID de productos cargados
let isLoading = false; // Bandera para evitar cargar productos múltiples veces al mismo tiempo

// Obtener las categorías de productos desde la API
async function obtenerCategorias() {
    try {
        const response = await fetch(`${apiUrl}/categories`);
        const categories = await response.json();
        mostrarCategorias(categories.slice(0, 5)); // Mostrar solo las primeras 5 categorías
    } catch (error) {
        console.error('Error al obtener categorías:', error);
    }
}

// Mostrar las categorías dinámicamente
function mostrarCategorias(categories) {
    const categoryList = document.querySelector('.category-list');
    categoryList.innerHTML = ''; // Limpiar la lista de categorías antes de agregar nuevas

    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.classList.add('category-card');
        categoryCard.innerHTML = `
            <div class="category-media">
                <img src="${category.image}" alt="${category.name}" class="category-image" />
            </div>
            <h3>${category.name}</h3>
        `;
        // Redirigir al hacer clic en la categoría
        categoryCard.addEventListener('click', () => {
            console.log('Categoría seleccionada:', category.name); // Depuración
            mostrarProductosDeCategoria(category.id); // Mostrar productos de la categoría
        });
        categoryList.appendChild(categoryCard);
    });
}

// Obtener los productos de una categoría seleccionada
async function mostrarProductosDeCategoria(categoryId) {
    try {
        // Si la categoría es la misma, no recargar los productos
        if (currentCategory === categoryId) return;

        // Actualizar la categoría actual
        currentCategory = categoryId;
        currentPage = 1; // Reiniciar la página a la 1 cuando se cambia de categoría
        loadedProducts.clear(); // Limpiar los productos cargados para la nueva categoría

        // Ocultar todas las secciones excepto la cabecera y el pie de página
        const allSections = document.querySelectorAll('section');
        allSections.forEach(section => {
            section.style.display = 'none'; // Ocultar cada sección
        });

        // Asegúrate de que la cabecera y el pie de página no se oculten
        document.querySelector('header').style.display = 'block';
        document.querySelector('footer').style.display = 'block';

        // Crear una nueva "vista" de productos dentro de la misma sección
        const productContainer = document.querySelector('.product-container'); // Contenedor de productos
        productContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos productos

        // Crear la estructura de productos
        const productPage = document.createElement('div');
        productPage.classList.add('product-page');
        productPage.innerHTML = `
            <h2>Productos de la categoría</h2>
            <div class="product-list" id="product-list">
                <!-- Productos insertados dinámicamente -->
            </div>
            <button id="load-more-btn" class="load-more-btn">Cargar más productos</button>
            <div id="loading-message" class="loading-message" style="display: none;">Cargando más productos...</div>
        `;

        // Agregar la "página" de productos al contenedor
        productContainer.appendChild(productPage);

        // Agregar evento para cargar más productos mediante el botón
        const loadMoreBtn = document.querySelector('#load-more-btn');
        loadMoreBtn.addEventListener('click', () => loadMoreProducts(categoryId));

        // Cargar los productos iniciales
        loadMoreProducts(categoryId);

        // Cambiar la URL sin recargar la página
        history.pushState({ categoryId: categoryId }, `Productos de la categoría`, `?categoryId=${categoryId}`);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Cargar más productos al hacer clic en el botón o al hacer scroll
async function loadMoreProducts(categoryId) {
    if (isLoading) return; // Evitar carga simultánea de productos

    try {
        isLoading = true; // Marcar que estamos cargando productos
        const loadingMessage = document.querySelector('#loading-message');
        loadingMessage.style.display = 'block'; // Mostrar el mensaje de carga

        // Cambiar la URL con los parámetros de página
        const response = await fetch(`${apiUrl}/categories/${categoryId}/products?_page=${currentPage}&_limit=${productsPerPage}`);
        const products = await response.json();

        const productList = document.querySelector('#product-list');
        if (products.length > 0) {
            products.forEach(product => {
                // Verificar si el producto ya ha sido cargado
                if (loadedProducts.has(product.id)) {
                    return; // Si el producto ya ha sido cargado, no agregarlo
                }

                // Marcar el producto como cargado
                loadedProducts.add(product.id);

                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <h3>${product.title}</h3>
                    <p><strong>${product.price} €</strong></p>
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                `;
                productList.appendChild(productCard);
            });

            currentPage++; // Incrementar la página para la siguiente carga

            // Actualizar la URL para reflejar la página actual
            history.pushState({ categoryId: categoryId, page: currentPage }, `Productos de la categoría`, `?categoryId=${categoryId}&page=${currentPage}`);
        } else {
            const loadMoreBtn = document.querySelector('#load-more-btn');
            loadMoreBtn.disabled = true; // Deshabilitar el botón si no hay más productos
            loadingMessage.innerHTML = 'No hay más productos para mostrar.';
        }

        loadingMessage.style.display = 'none'; // Ocultar el mensaje de carga
    } catch (error) {
        console.error('Error al cargar más productos:', error);
    } finally {
        isLoading = false; // Marcar como no cargando al finalizar
    }
}

// Escuchar el scroll para cargar más productos automáticamente (scroll infinito)
window.addEventListener('scroll', () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    if (nearBottom) {
        const categoryId = new URLSearchParams(window.location.search).get('categoryId');
        if (categoryId) {
            loadMoreProducts(categoryId);
        }
    }
});

// Llamada inicial para cargar las categorías
obtenerCategorias();

// Escuchar cambios en la URL para cargar productos de una categoría
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.categoryId) {
        mostrarProductosDeCategoria(event.state.categoryId);
    }
});

// Lógica para el botón de "Inicio" en el header
document.querySelector('#inicio-btn').addEventListener('click', () => {
    // Mostrar todas las secciones, incluyendo el hero, categorías y footer
    document.querySelector('header').style.display = 'block'; // Asegurarse de que el header sea visible
    document.querySelector('footer').style.display = 'block'; // Asegurarse de que el footer sea visible
    document.querySelector('.hero').style.display = 'block'; // Asegurarse de que el hero sea visible
    document.querySelector('.categories').style.display = 'block'; // Asegurarse de que las categorías sean visibles

    // Restablecer cualquier contenedor de productos (en caso de que se haya ocultado o eliminado)
    document.querySelector('.product-container').innerHTML = '';

    // Volver a cargar las categorías si es necesario (en caso de que se haya limpiado)
    obtenerCategorias();

    // Cambiar la URL para volver al inicio
    history.pushState({}, 'Inicio', '/'); // Cambiar la URL a la raíz

    // Cerrar el menú móvil si está abierto
    const header = document.querySelector('.header');
    if (header.classList.contains('open')) {
        header.classList.remove('open');
    }
});
