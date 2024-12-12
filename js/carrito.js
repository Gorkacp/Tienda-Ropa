// Función para agregar productos al carrito
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Función para cargar el carrito desde LocalStorage
  function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Mostrar productos en el carrito
    cart.forEach(product => {
      console.log(product);
      // Aquí agregar el código para mostrar los productos en la interfaz
    });
  }
  
  // Llamada para cargar el carrito cuando se recarga la página
  window.onload = loadCart;
  