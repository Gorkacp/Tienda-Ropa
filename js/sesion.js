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
  
    // Verificar si estamos en el formulario de login o registro
    if (e.target.id === 'login-form') {
      // Aquí procesas el login
      // Por ejemplo, enviar los datos al servidor o realizar validaciones
    }
  
    if (e.target.id === 'register-form') {
      const email = document.getElementById('email').value;
      // Aquí procesas el registro
      // Por ejemplo, enviar los datos al servidor o realizar validaciones
    }
  
    // Cerrar el modal después de enviar
    document.getElementById('auth-modal').style.display = 'none';
  });
  