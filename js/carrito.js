
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
            <p><strong>Cantidad:</strong> ${product.quantity}</p>
            <button class="remove-item-btn" data-index="${index}">Eliminar uno</button>
        </div>
    `;
    cartItemsContainer.appendChild(productDiv);
    total += product.price * product.quantity;
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

// Función para agregar un producto al carrito
function agregarAlCarrito(product) {
  const existingProduct = cart.find(item => item.title === product.title);
  
  if (existingProduct) {
    // Si el producto ya existe, aumentar la cantidad
    existingProduct.quantity += 1;
  } else {
    // Si el producto no existe, añadirlo al carrito con cantidad 1
    product.quantity = 1;  // Asegúrate de que la cantidad se establezca en 1
    cart.push(product);
  }

  actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  const product = cart[index];

  if (product.quantity > 1) {
    // Si la cantidad es mayor a 1, solo disminuir la cantidad
    product.quantity -= 1;
  } else {
    // Si la cantidad es 1, eliminar el producto del carrito
    cart.splice(index, 1);
  }

  actualizarCarrito(); // Actualizar la vista del carrito
}

// Event listener para el botón de añadir al carrito
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    const product = event.target.closest('.product-card').product;
    agregarAlCarrito(product);
  });
});
