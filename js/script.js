// URL base de la API
const apiUrl = 'https://api.escuelajs.co/api/v1';

// Variables globales para el control de paginación
let currentPage = 1;
const productsPerPage = 10;
let currentCategory = ''; // Variable para almacenar la categoría actual
let loadedProducts = new Set(); // Conjunto para almacenar los ID de productos cargados
let isLoading = false; // Bandera para evitar cargar productos múltiples veces al mismo tiempo
let cart = []; // Carrito de compras

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
        if (currentCategory === categoryId) return;

        currentCategory = categoryId;
        currentPage = 1; 
        loadedProducts.clear();

        const allSections = document.querySelectorAll('section');
        allSections.forEach(section => {
            section.style.display = 'none';
        });

        document.querySelector('header').style.display = 'block';
        document.querySelector('footer').style.display = 'block';

        const productContainer = document.querySelector('.product-container');
        productContainer.innerHTML = '';

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

        productContainer.appendChild(productPage);

        const loadMoreBtn = document.querySelector('#load-more-btn');
        loadMoreBtn.addEventListener('click', () => loadMoreProducts(categoryId));

        loadMoreProducts(categoryId);

        history.pushState({ categoryId: categoryId }, `Productos de la categoría`, `?categoryId=${categoryId}`);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Cargar más productos al hacer clic en el botón o al hacer scroll
async function loadMoreProducts(categoryId) {
    if (isLoading) return;

    try {
        isLoading = true;
        const loadingMessage = document.querySelector('#loading-message');
        loadingMessage.style.display = 'block';

        const response = await fetch(`${apiUrl}/categories/${categoryId}/products?page=${currentPage}&limit=${productsPerPage}`);
        const products = await response.json();

        const productList = document.querySelector('#product-list');
        if (products.length > 0) {
            products.forEach(product => {
                if (loadedProducts.has(product.id)) {
                    return;
                }

                loadedProducts.add(product.id);

                // Crear la tarjeta de producto
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <div class="product-image-container">
                        <img src="${product.images[0]}" alt="${product.title}" class="product-image">
                    </div>
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <p><strong>${product.price} €</strong></p>
                    </div>
                `;

                // Añadir el evento para abrir el modal al hacer clic en el producto
                productCard.addEventListener('click', () => mostrarModalProducto(product));

                productList.appendChild(productCard);
            });

            currentPage++;

            history.pushState({ categoryId: categoryId, page: currentPage }, `Productos de la categoría`, `?categoryId=${categoryId}&page=${currentPage}`);
        } else {
            const loadMoreBtn = document.querySelector('#load-more-btn');
            loadMoreBtn.disabled = true;
            loadingMessage.innerHTML = 'No hay más productos para mostrar.';
        }

        loadingMessage.style.display = 'none';
    } catch (error) {
        console.error('Error al cargar más productos:', error);
    } finally {
        isLoading = false;
    }
}

// Mostrar el modal con la información del producto
function mostrarModalProducto(product) {
    console.log('Abriendo modal para el producto:', product.title); // Depuración

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>${product.title}</h2>
            <p><strong>Precio:</strong> ${product.price} €</p>
            <img src="${product.images[0]}" alt="${product.title}" class="modal-product-image">
            <p>${product.description}</p>
            <button class="add-to-cart-btn">Añadir a la cesta</button>
        </div>
    `;

    // Añadir el modal al cuerpo
    document.body.appendChild(modal);

    // Estilo básico para el modal
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    
    // Fondo oscuro detrás del modal
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    
    // Cerrar el modal al hacer clic en la 'X'
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Añadir el producto al carrito
    const addToCartBtn = modal.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        agregarAlCarrito(product);
        modal.remove(); // Cerrar el modal al añadir el producto
    });

    // Estilo para la imagen en el modal para que se ajuste adecuadamente
    const modalImage = modal.querySelector('.modal-product-image');
    modalImage.style.maxWidth = '100%'; // Limitar el tamaño máximo de la imagen
    modalImage.style.height = 'auto'; // Mantener la proporción de la imagen
    modalImage.style.objectFit = 'contain'; // Asegurar que la imagen no se distorsione
}

// Agregar el producto al carrito
function agregarAlCarrito(product) {
    cart.push(product);
    alert(`${product.title} ha sido añadido a tu cesta.`); // Alerta de confirmación
    console.log('Carrito:', cart); // Mostrar el carrito en la consola
}

window.addEventListener('scroll', () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    if (nearBottom) {
        const categoryId = new URLSearchParams(window.location.search).get('categoryId');
        if (categoryId) {
            loadMoreProducts(categoryId);
        }
    }
});

obtenerCategorias();

window.addEventListener('popstate', (event) => {
    if (event.state && event.state.categoryId) {
        mostrarProductosDeCategoria(event.state.categoryId);
    }
});

document.querySelector('#inicio-btn').addEventListener('click', () => {
    document.querySelector('header').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
    document.querySelector('.hero').style.display = 'block';
    document.querySelector('.categories').style.display = 'block';

    document.querySelector('.product-container').innerHTML = '';

    obtenerCategorias();

    history.pushState({}, 'Inicio', '/');

    const header = document.querySelector('.header');
    if (header.classList.contains('show')) {
        header.classList.remove('show');
    }
});
