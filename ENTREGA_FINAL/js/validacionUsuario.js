// Validación de la existencia del usuario
//Si no existe, envío al usuario a la página de registro
nombreUsuario = localStorage.getItem("usuario")
localStorage.getItem("usuario") == null && window.location.replace("index.html");