// Función para guardar el carrito en localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para obtener el carrito de localStorage
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : []; // Si no hay carrito, devuelve un arreglo vacío
}

// Función para mostrar el carrito
function showCart() {
  const cart = getCart();
  console.log('Carrito actual:', cart);
}

// Función para agregar un artículo al carrito
function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
}

// Mostrar el modal con los botones de login y registro
document.getElementById('account-btn').addEventListener('click', function() {
// Mostrar el modal
document.getElementById('auth-modal').style.display = 'flex';

// Mostrar los botones de login y registro
document.getElementById('auth-form-container').innerHTML = `
  <button id="login-btn">Iniciar sesión</button>
  <button id="register-btn">Registrarse</button>
`;
});

// Cargar el formulario de inicio de sesión o registro al hacer clic
document.getElementById('auth-form-container').addEventListener('click', function(e) {
if (e.target.id === 'login-btn') {
  // Cargar el formulario de inicio de sesión
  document.getElementById('auth-form-container').innerHTML = `
    <h3>Iniciar sesión</h3>
    <form id="login-form">
      <input type="text" id="username" placeholder="Nombre de usuario" required>
      <input type="password" id="password" placeholder="Contraseña" required>
      <button type="submit">Iniciar sesión</button>
    </form>
  `;
}

if (e.target.id === 'register-btn') {
  // Cargar el formulario de registro
  document.getElementById('auth-form-container').innerHTML = `
    <h3>Registrarse</h3>
    <form id="register-form">
      <input type="text" id="username" placeholder="Nombre de usuario" required>
      <input type="email" id="email" placeholder="Correo electrónico" required>
      <input type="password" id="password" placeholder="Contraseña" required>
      <button type="submit">Registrarse</button>
    </form>
  `;
}
});

// Cerrar el modal al hacer clic en la "X"
document.getElementById('close-btn').addEventListener('click', function() {
document.getElementById('auth-modal').style.display = 'none';
});

// Procesar los formularios sin recargar la página
document.getElementById('auth-form-container').addEventListener('submit', function(e) {
e.preventDefault(); // Evitar el comportamiento por defecto de enviar el formulario

const username = document.getElementById('username').value;
const password = document.getElementById('password').value;
const email = document.getElementById('email') ? document.getElementById('email').value : null;

// Verificar si estamos en el formulario de login o registro
if (e.target.id === 'login-form') {
  // Procesar el login
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Inicio de sesión exitoso');
      localStorage.setItem('username', username);  // Guardar usuario en la sesión
      // Aquí puedes redirigir o permitir que el usuario realice compras
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  })
  .catch(error => console.error('Error en login:', error));
}

if (e.target.id === 'register-form') {
  // Procesar el registro
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Registro exitoso');
      document.getElementById('auth-modal').style.display = 'none';
    } else {
      alert('Error en el registro');
    }
  })
  .catch(error => console.error('Error en registro:', error));
}

// Cerrar el modal después de enviar
document.getElementById('auth-modal').style.display = 'none';
});

// Verificar si hay un usuario logueado
function checkUserSession() {
const username = localStorage.getItem('username');
if (username) {
  alert(`Bienvenido de nuevo, ${username}`);
  // También puedes cargar la cesta del usuario aquí
  showCart();
}
}

// Llamar a la función para verificar la sesión al cargar la página
checkUserSession();

// Ejemplo de agregar un artículo al carrito y guardar
addToCart({ id: 1, name: 'Artículo 1', price: 100 });
