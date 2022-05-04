if (localStorage.getItem("usuario") == null) {
    document.getElementById("formularioInicio").style.display = "none"
    let parrafo = document.createElement("h3");
    parrafo.innerHTML = `Registrate para ingresar`
    document.getElementById("tituloRegistro").appendChild(parrafo);
    //Aculta boton crear usuario
    boton = document.getElementById("btnCrearUsuario").style.display = "none"
} else {
    let textoTitulo = document.createElement("h3");
    usuario = localStorage.getItem("usuario");
    let parrafo = document.createElement("h2");
    parrafo.innerHTML = `Iniciar sesion`
    document.getElementById("formularioRegistro").style.display = "none";

    //Botón para crear Usuario
    let btnCrearUsuario = document.getElementById("btnCrearUsuario")
    btnCrearUsuario.onclick = () => {
        crearSesion();
    }
}



//REGISTRARSE
let formularioRegistro = document.getElementById("formularioRegistro");
formularioRegistro.addEventListener("submit", registrarse);

// Función que genera el registro
function registrarse(event) {
    event.preventDefault();
    let elemento = event.target;
    console.log(elemento.children)
    email = elemento.children[1].value;
    usuario = elemento.children[2].value;
    pass = elemento.children[3].value;
    localStorage.setItem("email", email);
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("contraseña", pass);
    localStorage.setItem("log", "true");
    window.location.replace("tienda.html");
}

//Función de cerrar sesión
function crearSesion() {
    localStorage.clear();
    location.reload();
}

let formularioInicio = document.getElementById("formularioInicio");
formularioInicio.addEventListener("submit", loguearse);


//VALIDACIÓN DE CONTRASEÑA
function loguearse(e) {
    e.preventDefault();
    let elemento = e.target;
    usuarioIngresado = elemento.children[1].value;
    passIngresada = elemento.children[2].value;
    nombre = localStorage.getItem("usuario")
    pass = localStorage.getItem("contraseña")
    if ((usuarioIngresado == nombre) && (passIngresada == pass)) {
        localStorage.setItem('log', "true");
        window.location.replace("tienda.html");
    } else {
        let errorPass = document.createElement("span");
        errorPass.innerHTML = `USUARIO O CONTRASEÑA INCORRECTO`
        errorPass.classList.add("errorPass");
        document.getElementById("formularioInicio").appendChild(errorPass);
    }
}