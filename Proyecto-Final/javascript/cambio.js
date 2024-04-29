const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Mostrar el formulario de inicio de sesión y ocultar el de registro
loginLink.addEventListener('click', function(event) {
  event.preventDefault();
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
  loginLink.classList.add('active');
  registerLink.classList.remove('active');
});

// Mostrar el formulario de registro y ocultar el de inicio de sesión
registerLink.addEventListener('click', function(event) {
  event.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
  registerLink.classList.add('active');
  loginLink.classList.remove('active');
});
