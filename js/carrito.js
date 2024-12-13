// Función para mostrar y ocultar el carrito
function toggleCart() {
  const cartSection = document.getElementById('cart-section');
  const cartBtn = document.getElementById('cart-btn');

  // Alternar la visibilidad del carrito
  if (cartSection.style.display === 'none') {
      cartSection.style.display = 'block';
      cartBtn.classList.add('active');
  } else {
      cartSection.style.display = 'none';
      cartBtn.classList.remove('active');
  }
}

// Función para actualizar el carrito
function actualizarCarrito() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = ''; // Limpiar el contenido actual del carrito

  let total = 0;

  // Recorrer los productos del carrito y mostrarlos
  cart.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('cart-item');
      productDiv.innerHTML = `
          <img src="${product.images[0]}" alt="${product.title}" class="cart-item-image">
          <div class="cart-item-info">
              <h3>${product.title}</h3>
              <p><strong>${product.price} €</strong></p>
          </div>
      `;
      cartItemsContainer.appendChild(productDiv);
      total += product.price;
  });

  // Actualizar el total del carrito
  cartTotal.textContent = total.toFixed(2);
}

// Función de ejemplo para proceder al pago (puedes modificarla según tus necesidades)
function proceedToCheckout() {
  alert('Procediendo al pago...');
}

// Event listener para el botón de añadir al carrito
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', (event) => {
      const product = event.target.closest('.product-card').product;
      agregarAlCarrito(product);
  });
});

// Agregar producto al carrito
function agregarAlCarrito(product) {
  cart.push(product);
  alert(`${product.title} ha sido añadido a tu cesta.`);
  actualizarCarrito(); // Actualizar la vista del carrito
}

