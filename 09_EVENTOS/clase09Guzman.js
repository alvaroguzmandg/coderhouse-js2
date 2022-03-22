class ListadoProductos {
    constructor(marca, modelo, talles, stock, color) {
        this.marca = marca;
        this.modelo = modelo;
        this.talle = talles;
        this.stock = stock;
        this.color = color;
    }

    //Asignación de código de producto
    asignarCodigo() {
        let letraMarca = this.marca.charAt(0)
        let letraModelo = this.modelo.charAt(0)
        let letraColor = this.color.charAt(0);
        let letraTalle = this.talle;
        this.codProducto = letraMarca + letraModelo + letraColor + letraTalle;
    }

    //Resta de stock disponible en caso de agregar al carrito
    restarStock() {
        this.stock = this.stock - 1
    }

}


//Variables que genera el contenedor de productos
let contenidoProductos = document.getElementsByClassName("contenedorProductos");

// DECLARACIÓN DE ARRAYS

//Array con los productos comprados
let carroDeCompras = [];
let carritoCompras = [];


//Array de modelos de zapatillas existentes
let listadoProductos = []
listadoProductos.push(new ListadoProductos("Adidas", "Ultra Boost 21", "40", 1, "Blanco"));
listadoProductos.push(new ListadoProductos("Adidas", "Ultra Boost 21", "41", 3, "Blanco"));
listadoProductos.push(new ListadoProductos("Adidas", "Ultra Boost 21", "42", 4, "Blanco"));
listadoProductos.push(new ListadoProductos("Adidas", "Boston 10", "40", 2, "Azul"));
listadoProductos.push(new ListadoProductos("Adidas", "Boston 10", "41", 1, "Azul"));
listadoProductos.push(new ListadoProductos("Adidas", "Boston 10", "42", 3, "Azul"));
listadoProductos.push(new ListadoProductos("Nike", "Pegasus 38", "40", 1, "Verde"));
listadoProductos.push(new ListadoProductos("Nike", "Pegasus 38", "41", 3, "Verde"));
listadoProductos.push(new ListadoProductos("Nike", "Pegasus 38", "42", 2, "Verde"));
listadoProductos.push(new ListadoProductos("Puma", "Deviate Nitro", "40", 5, "Naranja"));
listadoProductos.push(new ListadoProductos("Puma", "Deviate Nitro", "41", 2, "Naranja"));
listadoProductos.push(new ListadoProductos("Puma", "Deviate Nitro", "42", 1, "Naranja"));

//Función que Asigna código a los productos listados en el array de modelos publicados
asignarCodigoProductos();


//Array de Nuestro Catálogo Disponible de zapatillas que será mostrado en el sitio
let catalogoDisponible = listadoProductos.filter((cantidad) => cantidad.stock > 0)



// DECLARACIÓN DE FUNCIONES

//Función para asignar Codigo de producto
function asignarCodigoProductos() {
    for (let producto of listadoProductos) {
        producto.asignarCodigo()
    }
}




// Funciones del proceso de compra
//Función para actualizar el número de productos en el carrito
function actualizarContadorCarro() {
    divCarro.innerHTML = `Productos en el carrito: ${carritoCompras.length}`;
}

//Función para mostrar los productos disponibles en el sitio
function mostrarProductos() {

    catalogoDisponible.forEach((catalogoDisponible) => {
        let divProducto = document.createElement('div');
        divProducto.classList.add("bloqueProducto");
        divProducto.innerHTML = `
        <span class="productoFoto"><img src="images/${catalogoDisponible.marca.charAt(0)}${catalogoDisponible.modelo.charAt(0)}${catalogoDisponible.color.charAt(0)}.png"></span>
        <span class="productoMarca">${catalogoDisponible.marca} ${catalogoDisponible.modelo} </span>
        <span class="productoEspecificaciones">
            <span class="productoTalle">Talle ${catalogoDisponible.talle}</span>
            <span class="productoColor">Color: ${catalogoDisponible.color}</span>
            <!--<span class="productoTalle">Stock ${catalogoDisponible.stock}</span>-->
        </span>
        <button id="${catalogoDisponible.codProducto}" class="btnAgregar ${listadoProductos.codProducto}">AGREGAR</button>
        <!-- <span class="productoComprar btRun-med">COMPRAR</span>-->
        `;

        contenidoProductos[0].append(divProducto);

        let btnAgregar = document.getElementById(`${catalogoDisponible.codProducto}`);
        btnAgregar.addEventListener("click", () => {
            carritoCompras.push(catalogoDisponible);
            mostrarListado();
            actualizarContadorCarro();
            console.log(`${catalogoDisponible.marca} ${catalogoDisponible.modelo} fue agregado al carrito`)
        })

    })
}


//Función que muestra en la página el lisatdo de productos comprados
function mostrarListado() {
    let listadoDeCompras = document.getElementsByClassName("listadoDeCompras");
    let productoComprado = document.createElement('div')

    document.getElementById("tituloCarrito").style.display = "block";
    // for(let i=0; i < carritoCompras.length; i++)
    carritoCompras.forEach((carritoCompras) => {
        productoComprado.innerHTML = `<span>${carritoCompras.marca} ${carritoCompras.modelo} - Talle ${carritoCompras.talle}</span> `
        listadoDeCompras[0].append(productoComprado)
    })




}


let ingresar = document.getElementById("ingresar")


//Función que genera el contenido del encabezado
function infoEncabezado(nombreUsuario) {

    let contenedor = document.getElementsByClassName("headerUsuario__contenido")

    let contenidoEncabezado = document.createElement('div');
    contenedor[0].append(contenidoEncabezado)
    contenidoEncabezado.classList.add("datosUsuario");

    spanNombre = document.createElement('span');
    spanNombre.classList.add("nombreUsuario")
    spanNombre.innerHTML = `¡Hola ${nombreUsuario}!`;


    divCarro = document.createElement('span');
    divCarro.classList.add("datosCarro")
    actualizarContadorCarro();
    contenedor[0].append(divCarro)

    contenidoEncabezado.append(spanNombre)
    document.getElementById("ingresoNombre").style.display = "none"

}


ingresar.addEventListener("click", () => {
    let obtenerNombre = document.getElementById("name");
    let nombreUsuario = obtenerNombre.value;
    infoEncabezado(nombreUsuario)
    mostrarProductos()
})

// let nombreUsuario = prompt("Bienvenido a la Tienda Online de RunClub \n¿Cuál es tu nombre?");