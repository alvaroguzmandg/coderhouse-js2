//Creación de Array con carrito Almacenado
let carroDeComprasAlmacenado = JSON.parse(localStorage.getItem('carritoAlmacenado'))

//Versión con operador lógico OR de la declaración del array del carrito
carroDeCompras = carroDeComprasAlmacenado || []

//validamos que el carrito no esté vacío
carroDeCompras.length == 0 && window.location.replace("tienda.html");


/*------------------------------- DATOS USUARIO -------------------------------*/
const datosUsuario = []

function cargarDatosUsuario() {
    datosUsuario.nombre = localStorage.getItem("nombre")
    datosUsuario.correo = localStorage.getItem("email")
    datosUsuario.apellido = localStorage.getItem("dni")
    datosUsuario.dni = localStorage.getItem("dni")
    datosUsuario.local = localStorage.getItem("local")
    datosUsuario.telefono = localStorage.getItem("telefono")
    datosUsuario.formaPago = localStorage.getItem("formaPago")

}

cargarDatosUsuario()


/*------------------------------- FORMULARIO -------------------------------*/
//Función para elegir el método de envío
function metodoEnvio() {
    let boton = document.getElementById("retiro")
    let boton2 = document.getElementById("envio")
    boton.classList.add("selectorActive")
    let metodoEnvio = "Retiro en Tienda";
    localStorage.setItem("metodoEnvio", metodoEnvio);

    let box = document.getElementById("metodoEnvio")
    let legal = document.getElementById("legalEnvio")
    legal.classList.add("legalCheckout")
    legal.innerHTML = 'POR MOMENTOS SÓLO CONTAMOS CON RETIRO EN TIENDA'
    box.append(legal)
}

//Función para elegir pago en efectivo
function pagoEfectivo() {
    let boton = document.getElementById("opcion1")
    let boton2 = document.getElementById("opcion2")
    boton.classList.add("selectorActive")
    boton2.classList.remove("selectorActive");
    let formaPago = "Efectivo";
    localStorage.setItem("formaPago", formaPago);
    // legal = document.getElementsByClassName("legalCheckout")
    // legal[1].style.display = 'block';

    let box = document.getElementById("metodoPago");
    let legal = document.getElementById("legalPago");
    legal.classList.add("legalCheckout");
    legal.innerHTML = '';
    legal.innerHTML = '¡ABONARÁS AL RETIRAR TU COMPRA!'
}

//Función para elegir pago con tarjeta
function pagoTarjeta() {
    let boton = document.getElementById("opcion1")
    let boton2 = document.getElementById("opcion2")
    boton2.classList.add("selectorActive")
    boton.classList.remove("selectorActive");
    let formaPago = "Tarjeta de Crédito"
    localStorage.setItem("formaPago", formaPago);

    let box = document.getElementById("metodoPago")
    let legal = document.getElementById("legalPago")
    legal.classList.add("legalCheckout")
    legal.innerHTML = '¡ABONARÁS AL RETIRAR TU COMPRA!'
    box.appendChild(legal)
}



function finalizarCompra() {
    let local = document.getElementById("local").value
    let alertaLocal = () => {
        Swal.fire({
            title: '¡Atención!',
            text: 'Por favor elegí un método de envío',
            icon: 'question',
            confirmButtonText: '¡Elegir!',
            color: '#FF5000',
            background: '#FF5500',
            backdrop: 'rgba(0, 0, 0, 0.8)',
            // ANIMACIÓN
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },

        })

    }
    if (local == 0) {
        alertaLocal()
    } else {


        switch (local) {
            case '0':
                local = "Local no seleccionado"
                break
            case "1":
                local = "Alto Palermo"
                break
            case "2":
                local = "Abasto"
                break
            case "3":
                local = "Dot Buenos Aires"
            default:
        }

        let email = document.getElementById("email").value
        let nombre = document.getElementById("nombre").value
        let dni = document.getElementById("dni").value
        let telefono = document.getElementById("telefono").value
        let formaEnvio = localStorage.getItem("metodoEnvio")
        let formaPago = localStorage.getItem("formaPago")

        if (email != undefined && nombre != undefined && dni != undefined && telefono != undefined && formaEnvio != undefined && formaPago != undefined && carroDeCompras.length > 0) {
            localStorage.setItem("email", email);
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("dni", dni);
            localStorage.setItem("telefono", telefono);
            localStorage.setItem("local", local);

            //Mostramos página de confirmación
            mostrarCheckout();

            // Vaciamos el carrito
            carroDeCompras = []
            localStorage.setItem("carritoAlmacenado", JSON.stringify(carroDeCompras));
        } else {
            Swal.fire({
                title: '¡Atención!',
                text: 'Por favor revisá los datos ingresados',
                icon: 'question',
                confirmButtonText: '¡Elegir!',
                color: '#FF5000',
                background: '#FF5500',
                backdrop: 'rgba(0, 0, 0, 0.8)',
                // ANIMACIÓN
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },

            })
        }
    }
}

function mostrarCheckout() {
    let checkout = document.getElementById("contenedorTienda");
    let titulo = document.getElementById("tituloCheckout");
    titulo.innerHTML = 'RESUMEN DE <span class="destacadoClub">TU COMPRA';
    checkout.innerHTML = '';


    let datosCompra = document.createElement("div")
    datosCompra.classList.add("datosCompra")

    let contenedorProductos = document.createElement("div")
    contenedorProductos.classList.add("contenidoCompra")

    contenedorProductos.innerHTML = " "

    htmlString = `
    <span class="">LISTADO DE PRODUCTOS</span>`
    datosCompra.innerHTML = `
    Nombre: ${datosUsuario.nombre}<br>
    Correo Electrónico: ${datosUsuario.correo}<br>
    Teléfono: ${datosUsuario.telefono}<br>
    Método de Envío: ${datosUsuario.formaEnvio}<br>
    Método de pago:  ${datosUsuario.formaPago}<br>
    Total: $<br>
    Listado de compras:`

    for (let index = 0; index < carroDeCompras.length; index++) {

        let marca = carroDeCompras[index].marca;
        let modelo = carroDeCompras[index].modelo;
        let talle = carroDeCompras[index].talle;
        let precio = carroDeCompras[index].precio;
        let imagen = carroDeCompras[index].imagen;
        let id = carroDeCompras[index].id;
        let cantidad = carroDeCompras[index].cantidad;
        // let codProducto = carroDeCompras[index].codProducto

        // String HTML de la vista del producto en el carrito
        htmlString += `<li id="productoAgregado${id}">
                <span class="carrito__productoTexto">
                    <span class="carrito__productoImagen"><img src="images/${imagen}.png"></span>
                    <span class="carrito__productoTexto--titulo">${marca} ${modelo}
                    <br>
                    <span class="carrito__productoTexto--titulo">$${precio}
                    <br>
                    <span class="carrito__productoTexto--titulo">Cantidad: ${cantidad}
                    <br>
                    <span class="carrito__productoTexto--titulo">Talle: ${talle}
                    <br>
                </span>
                
                </li>
                `

    }
    contenedorProductos.innerHTML = htmlString
    checkout.appendChild(datosCompra)
    datosCompra.appendChild(contenedorProductos)
        // datosUsuario.nombre = localStorage.getItem("nombre")
        // datosUsuario.correo = localStorage.getItem("email")
        // datosUsuario.apellido = localStorage.getItem("dni")
        // datosUsuario.dni = localStorage.getItem("dni")
        // datosUsuario.local = localStorage.getItem("local")
        // datosUsuario.telefono = localStorage.getItem("telefono")
        // datosUsuario.formaPago = localStorage.getItem("formaPago")

}