//Creación de Array con carrito Almacenado
let carroDeComprasAlmacenado = JSON.parse(localStorage.getItem('carritoAlmacenado'))

//Declaración del array del carrito
carroDeCompras = carroDeComprasAlmacenado || []

//Validamos que el carrito no esté vacío
//Si está vacío se redirige al cliente a la tienda
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

function listadoDeCompra() {

    //Revisa productos Almacenados en LocalStorage y las carga al Carrito
    if (localStorage.getItem('carritoAlmacenado') != null) {
        precioCarritoTotal = localStorage.getItem("Precio Carrito");
        let listadoCheckout = document.getElementById("listadoCheckout")
        listadoCheckout.innerHTML = " "

        htmlString = `
        <span class="listadoCarrito">
        <span class="tituloCheckout listadoCarrito--titulo">LISTADO DE COMPRA</span>`

        //Recorremos el carro de compras y creamos un bloque de producto por cada uno que esté en el carrito
        for (let index = 0; index < carroDeCompras.length; index++) {

            let marca = carroDeCompras[index].marca;
            let modelo = carroDeCompras[index].modelo;
            let talle = carroDeCompras[index].talle;
            let precio = carroDeCompras[index].precio;
            let imagen = carroDeCompras[index].imagen;
            let id = carroDeCompras[index].id;
            let cantidad = carroDeCompras[index].cantidad;

            // String HTML de la vista del producto en el carrito
            htmlString += `
                <li class="productosComprados">
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

//Listamos el carro de compras
listadoDeCompra()


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


//Función que finaliza la compra
function finalizarCompra() {
    let local = document.getElementById("local").value

    //Función para revisar que esté seleccionado el método de envío
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

    //Se valida si el método de envío está seleccionado
    if (local == 0) {
        alertaLocal()
    } else {

        //Cambio de valor de sucursal seleccionada
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

        //Asignación de variables de datos ingresados
        let email = document.getElementById("email").value
        let nombre = document.getElementById("nombre").value
        let dni = document.getElementById("dni").value
        let telefono = document.getElementById("telefono").value
        let formaEnvio = localStorage.getItem("metodoEnvio")
        let formaPago = localStorage.getItem("formaPago")

        //Verificación de datos ingresados
        if (email != undefined && nombre != undefined && dni != undefined && telefono != undefined && formaEnvio != undefined && formaPago != undefined && carroDeCompras.length > 0) {

            //Guardar datos ingresados en el local storage
            localStorage.setItem("email", email);
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("dni", dni);
            localStorage.setItem("telefono", telefono);
            localStorage.setItem("local", local);

            //Mostramos página de confirmación
            mostrarCheckout();

            //Seteamos el listado de productos ya comprados
            let productosComprados = carroDeCompras
            localStorage.setItem("productosComprados", JSON.stringify(productosComprados));

            // Vaciamos el carrito
            carroDeCompras = []
            localStorage.setItem("carritoAlmacenado", JSON.stringify(carroDeCompras));
        } else {
            //Avisa que los datos no están completos
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