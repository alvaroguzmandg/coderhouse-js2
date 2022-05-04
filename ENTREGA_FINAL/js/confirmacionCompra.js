/* -------------------- FUNCIONES CONFIRMACIÓN DE COMPRA -------------------- */

//Función del botón para volver a la tienda
function crearBotonVolver() {
    let botonVolver = document.createElement("div");
    botonVolver.innerHTML = `
        <div class="btRunDestacado-large" id="botonVolver" onclick="volverSitio()">volver a la tienda</div>
        <span class="legalVolverSitio">SERÁS REDIRECCIONADO A LA TIENDA EN 120 SEGUNDOS</span>
    `

    let main = document.getElementsByTagName("main")
    main[0].append(botonVolver)

    //Time Out para volver al sitio
    //Seteado en 120 segundos
    setTimeout(volverSitio, 120000)
}

//Función de volver al sitio
function volverSitio() {
    window.location.replace("tienda.html");
}


// Función que muestra el resumen de la compra
function mostrarCheckout() {
    let checkout = document.getElementById("contenedorTienda");
    let titulo = document.getElementById("tituloCheckout");
    titulo.innerHTML = 'RESUMEN DE <span class="destacadoClub">TU COMPRA';

    let precioCompra = localStorage.getItem('Precio Carrito')

    //Función que genera número aleatorio para el número de compra
    function numeroDeCompra(minimo, maximo) {
        return Math.round(Math.random() * (maximo - minimo) + minimo);
    }

    //Información de número de compra
    let numeroCompra = numeroDeCompra(0, 200)
    let numeroCompraContenedor = document.createElement("div")
    numeroCompraContenedor.classList.add("numeroCompra");
    numeroCompraContenedor.innerHTML = `<h2>CÓDIGO DE RETIRO: <span class="destacadoClub">#${numeroCompra}</span></h2>`
    checkout.innerHTML = ``;
    titulo.append(numeroCompraContenedor)

    //Creación de bloque de datos de compra
    let datosCompra = document.createElement("div")
    datosCompra.classList.add("datosDeCompra")
    datosCompra.classList.add("bloqueContenido--lg");

    //Creación de bloque de listado de compra
    let contenedorProductos = document.createElement("div")
    contenedorProductos.classList.add("listadoProductosComprados")
    contenedorProductos.innerHTML = ""
    htmlString = ``

    //Se cargan los datos del usuario
    datosUsuario = []
    cargarDatosUsuario()

    //Bloque que muestra los datos del usuario
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
                <span class="tituloDato precio">Total: <span class="textoDato precio">$${precioCompra}</span>
            </span>
        </div>
    `
    htmlString = `<span class="tituloProductos">Productos comprados</span>`;

    //Se recorre el carro de compras y se crea un bloque por cada producto comprado

    for (let index = 0; index < carroDeCompras.length; index++) {

        let marca = carroDeCompras[index].marca;
        let modelo = carroDeCompras[index].modelo;
        let talle = carroDeCompras[index].talle;
        let imagen = carroDeCompras[index].imagen;
        let cantidad = carroDeCompras[index].cantidad;
        // let codProducto = carroDeCompras[index].codProducto
        // String HTML de la vista del producto en el carrito
        htmlString += `
            <li class="productosComprados">
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

    //Se cargan los productos y los datos de compra
    contenedorProductos.innerHTML = htmlString;
    checkout.appendChild(datosCompra);
    datosCompra.appendChild(contenedorProductos);

    //Se crea el botón de volver al sitio
    crearBotonVolver()
}