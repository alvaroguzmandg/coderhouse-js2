//Creación de Array con carrito Almacenado
let carroDeComprasAlmacenado = JSON.parse(localStorage.getItem('carritoAlmacenado'))

//Versión con operador lógico OR de la declaración del array del carrito
carroDeCompras = carroDeComprasAlmacenado || []

//validamos que el carrito no esté vacío
carroDeCompras.length == 0 && window.location.replace("tienda.html");


/*------------------------------- DATOS USUARIO -------------------------------*/
let datosUsuario = []

function cargarDatosUsuario() {
    datosUsuario.nombre = localStorage.getItem("nombre")
    datosUsuario.correo = localStorage.getItem("email")
    datosUsuario.apellido = localStorage.getItem("dni")
    datosUsuario.dni = localStorage.getItem("dni")
    datosUsuario.local = localStorage.getItem("local")
    datosUsuario.telefono = localStorage.getItem("telefono")
    datosUsuario.formaPago = localStorage.getItem("formaPago")
    datosUsuario.metodoEnvio = localStorage.getItem("metodoEnvio")
}

cargarDatosUsuario()

/*------------------------------- PRODUCTOS COMPRADOS -------------------------------*/

function listadoCarrito() {

    // precioCarrito();

    //Revisa productos Almacenados en LocalStorage y las carga al Carrito
    if (localStorage.getItem('carritoAlmacenado') != null) {
        precioCarritoTotal = localStorage.getItem("Precio Carrito");
        let listadoCheckout = document.getElementById("listadoCheckout")
        listadoCheckout.innerHTML = " "

        htmlString = `
        <span class="listadoCarrito">
        <span class="tituloCheckout listadoCarrito--titulo">LISTADO DE PRODUCTOS</span>`


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
            htmlString += `<li class="productosComprados">
            <span class="listadoProductosCheckout--bloque">
                <span class="listadoProductosCheckout imagen"><img src="images/${imagen}.png"></span>
                <span class="infoProducto">
                    <span class="listadoProductosCheckout titulo">${marca} ${modelo}</span>
                    <span class="listadoProductosCheckout talle">Talle: ${talle}</span>
                    <span class="listadoProductosCheckout cantidad">Cantidad: ${cantidad}</span>
                </span>
            </span>
            </li>
                    `
            listadoCheckout.innerHTML = htmlString + `
            
            <span id="precioCarrito">Total: $${precioCarritoTotal}</span>

            `

        }

    }
}

listadoCarrito()



















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
            let productosComprados = carroDeCompras
            localStorage.setItem("productosComprados", JSON.stringify(productosComprados));
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


    // let productosComprados = JSON.parse(localStorage.getItem('productosComprados'))
    let precioCompra = localStorage.getItem('Precio Carrito')


    function numeroDeCompra(minimo, maximo) {
        return Math.round(Math.random() * (maximo - minimo) + minimo);
    }
    let numeroCompra = numeroDeCompra(0, 200)
    let numeroCompraContenedor = document.createElement("div")
    numeroCompraContenedor.classList.add("numeroCompra");
    numeroCompraContenedor.innerHTML = `<h2>CÓDIGO DE RETIRO: <span class="destacadoClub">#${numeroCompra}</span></h2>`
    checkout.innerHTML = ``;
    titulo.append(numeroCompraContenedor)


    let datosCompra = document.createElement("div")
    datosCompra.classList.add("datosDeCompra")
    datosCompra.classList.add("bloqueContenido--lg");

    let contenedorProductos = document.createElement("div")
    contenedorProductos.classList.add("listadoProductosComprados")

    contenedorProductos.innerHTML = " "

    htmlString = ``

    datosUsuario = []
    cargarDatosUsuario()

    datosCompra.innerHTML = `
    <div class="informacionComprador">
    <span class="tituloProductos">Datos del comprador</span>
        <span class="tituloDato">Nombre:</span>
        <span class="textoDato">${datosUsuario.nombre}</span>
        <span class="tituloDato">Correo Electrónico:</span>
        <span class="textoDato">${datosUsuario.correo}</span>
        <span class="tituloDato">Teléfono: </span>
        <span class="textoDato">${datosUsuario.telefono}</span>
        <span class="tituloDato">Método de Envío:</span>
        <span class="textoDato">${datosUsuario.metodoEnvio}</span>
        <span class="tituloDato">Método de pago:</span>
        <span class="textoDato">${datosUsuario.formaPago}</span>
        <span class="tituloDato precio">Total: <span class="textoDato precio">$${precioCompra}</span></span>
        
    </div>`
    htmlString = `<span class="tituloProductos">Listado de productos comprados</span>`;
    for (let index = 0; index < carroDeCompras.length; index++) {

        let marca = carroDeCompras[index].marca;
        let modelo = carroDeCompras[index].modelo;
        let talle = carroDeCompras[index].talle;
        let imagen = carroDeCompras[index].imagen;
        let cantidad = carroDeCompras[index].cantidad;
        // let codProducto = carroDeCompras[index].codProducto
        // String HTML de la vista del producto en el carrito
        htmlString += `<li class="productosComprados">
                <span class="listadoProductosComprados--bloque">
                    <span class="productoComprado__producto imagen"><img src="images/${imagen}.png"></span>
                    <span class="infoProducto">
                        <span class="productoComprado__producto titulo">${marca} ${modelo}</span>
                        <span class="productoComprado__producto talle">Talle: ${talle}</span>
                        <span class="productoComprado__producto cantidad">Cantidad: ${cantidad}</span>
                    </span>
                </span>
                </li>
                `
    }
    contenedorProductos.innerHTML = htmlString;
    checkout.appendChild(datosCompra);
    datosCompra.appendChild(contenedorProductos);

    crearBotonVolver()
}

function crearBotonVolver() {
    let botonVolver = document.createElement("div");
    botonVolver.innerHTML = `<div class="btRunDestacado-large" id="botonVolver" onclick="volverSitio()">volver a la tienda</div>`;

    let main = document.getElementsByTagName("main")
    main[0].append(botonVolver)


}


function volverSitio() {
    window.location.replace("tienda.html");
}