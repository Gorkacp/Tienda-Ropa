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
  cart.forEach((product, index) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('cart-item');
      productDiv.innerHTML = `
          <img src="${product.images[0]}" alt="${product.title}" class="cart-item-image">
          <div class="cart-item-info">
              <h3>${product.title}</h3>
              <p><strong>${product.price} €</strong></p>
              <button class="remove-item-btn" data-index="${index}">Eliminar</button>
          </div>
      `;
      cartItemsContainer.appendChild(productDiv);
      total += product.price;
  });

  // Actualizar el total del carrito
  cartTotal.textContent = total.toFixed(2);

  // Añadir funcionalidad de eliminar producto
  document.querySelectorAll('.remove-item-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const productIndex = event.target.getAttribute('data-index');
      eliminarProducto(productIndex);
    });
  });
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
  actualizarCarrito(); // Actualizar la vista del carrito
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  cart.splice(index, 1); // Eliminar el producto en la posición 'index'
  actualizarCarrito(); // Actualizar la vista del carrito
}
