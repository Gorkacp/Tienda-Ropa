// Verificar si el carrito ya está definido globalmente
if (typeof window.cart === 'undefined') {
  window.cart = []; // Carrito de compras global
}

// Función para agregar un producto al carrito
function agregarAlCarrito(product) {
  window.cart.push(product); // Usar cart global
  alert(`${product.title} ha sido añadido a tu cesta.`);
  console.log('Carrito:', window.cart);
}

// Función para mostrar el carrito en un modal o en otro lugar
function mostrarCarrito() {
  const cartModal = document.getElementById('cart-modal');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  // Limpiar los productos en el carrito
  cartItemsContainer.innerHTML = '';

  let total = 0;

  window.cart.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('cart-item');
      productItem.innerHTML = `
          <p>${product.title}</p>
          <p>${product.price} €</p>
      `;
      cartItemsContainer.appendChild(productItem);
      total += product.price;
  });

  cartTotal.innerText = `Total: ${total} €`;

  // Mostrar el modal del carrito
  cartModal.style.display = 'block';
}

// Función para cerrar el modal del carrito
function cerrarCarrito() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'none';
}

// Event listener para cerrar el carrito
const closeCartBtn = document.querySelector('.close-cart-btn');
closeCartBtn.addEventListener('click', cerrarCarrito);
