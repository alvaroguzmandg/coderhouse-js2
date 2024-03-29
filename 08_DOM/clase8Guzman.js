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

    //Validación de stock a la hora de elegir el producto
    validarStockProducto() {
        if (this.stock > 0) {
            return true
        } else {
            return false
        }
    }

    //Resta de stock disponible en caso de agregar al carrito
    restarStock() {
        this.stock = this.stock - 1
    }

    // Suma de stock en caso de entrar más productos
    sumarStock() {
        this.stock = this.stock + 1
    }
}


//Variables que genera el contenedor de productos
let contenidoProductos = document.getElementsByClassName("contenedorProductos");

// DECLARACIÓN DE ARRAYS

//Array con los productos comprados
let carroDeCompras = [];


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

//Función que actualiza el catálogo de productos
function actualizarCatalogoDisponible() {
    catalogoDisponible = listadoProductos.filter((cantidad) => cantidad.stock > 0)
    actualizarBloqueProductos()
    mostrarProductos()
}


// Función para agregar productos al carro de compras y que actualiza el catalogo de productos con su stock correspondiente
function agregarAlCarro() {
    let codProductoVendido = marcaBuscada.charAt(0) + modeloBuscado.charAt(0) + colorBuscado.charAt(0) + talleBuscado;
    carroDeCompras.push(listadoProductos.find(listadoProductos => listadoProductos.codProducto === codProductoVendido));
    //Se Actualiza el stock del listado de productos
    actualizarCatalogoDisponible()
    mostrarSinStock();
}

// Función que valida el stock del producto, lo actualiza
function validacionStock() {
    for (let i = 0; listadoProductos.length > i; i++) {
        if ((listadoProductos[i].marca == marcaBuscada) && (listadoProductos[i].modelo == modeloBuscado) && (listadoProductos[i].talle == talleBuscado)) {
            if ((listadoProductos[i].validarStockProducto())) {
                listadoProductos[i].restarStock();
                colorBuscado = listadoProductos[i].color
                agregarAlCarro();
            } else {
                alert("Lo sentimos, el producto no tiene stock")
            }
        }
    }
}

//Función para mostrar productos sin stock
function mostrarSinStock() {
    for (let producto of listadoProductos) {
        if (producto.stock == 0) {
            console.log(`¡Ese fue el último! Ahora el producto ${producto.marca} ${producto.modelo} en el talle ${producto.talle} se ha agotado`)
        }
    }
}

// Funciones del proceso de compra
//Función para validar la marca ingresada
function validarMarcaIngresada(marcaIngresada) {
    while ((marcaIngresada != "Adidas") && (marcaIngresada != "Nike") && (marcaIngresada != "Puma")) {
        marcaIngresada = prompt("Lo sentimos, solo disponemos de Adidas, Nike y Puma. \nDebido a nuestras actuales limitaciones técnicas, te pedimos que escribas exactamente el nombre, respetando mayúsculas y minúsculas.")
    }
    return marcaBuscada = marcaIngresada
}

//Función para buscar modelo de zapatillas
function buscarModelo(marcaBuscada) {
    if (marcaBuscada == "Adidas") {
        modeloBuscado = 0;
        while ((modeloBuscado != 1) && (modeloBuscado != 2)) {
            modeloBuscado = (parseFloat(prompt("Ingresa el número que corresponda al modelo buscado que estás buscando.\nRecuerda que solo disponemos del talle 40 al 42 momentaneamente. \n1- Ultra Boost 21 \n2- Boston 10")))
        }
        switch (modeloBuscado) {
            case 1:
                modeloBuscado = "Ultra Boost 21"
                break;
            case 2:
                modeloBuscado = "Boston 10"
        }
    } else if (marcaBuscada == "Nike") {
        modeloBuscado = 0;
        while (modeloBuscado != 1) {
            modeloBuscado = (parseFloat(prompt("Ingresa el número que corresponda al modelo buscado que estás buscando \n 1- Pegasus 38")))
        }
        switch (modeloBuscado) {
            case 1:
                modeloBuscado = "Pegasus 38"
        }
    } else if (marcaBuscada == "Puma") {
        modeloBuscado = 0;
        while (modeloBuscado != 1) {
            modeloBuscado = (parseFloat(prompt("Ingresa el número que corresponda al modelo buscado que estás buscando \n 1- Deviate Nitro")))
        }
        switch (modeloBuscado) {
            case 1:
                modeloBuscado = "Deviate Nitro"
        }
    }
}

//Función para buscar talle
function buscarTalle(talleIngresado) {
    while ((talleIngresado < 40) || (talleIngresado > 42)) {
        talleIngresado = parseFloat(prompt("¿Qué talle estás buscando?\nRecuerda que solo disponemos del talle 40 al 42 momentaneamente"))
    }
    return talleBuscado = talleIngresado
}

//Función par apreguntar si se quiere seguir comprando
function seguirComprando() {
    let respuesta = prompt("¿Quieres seguir comprando?")
    if (respuesta == "si") {
        procesoCompra()
    } else {
        alert("¡Vuelva pronto!")
    }
}

//Función que efectua el proceso de compra
function procesoCompra() {
    // Elección y validación de marca
    validarMarcaIngresada(prompt(`Hola ${nombreUsuario} \nQué marca estás buscando?`));

    // Elección de modelo
    buscarModelo(marcaBuscada);

    //Elección de talle
    buscarTalle(parseFloat(prompt(`¿Qué talle estás buscando ${nombreUsuario}?`)));

    //Validación y actualización del stock. Si hay stock, agrega el producto al carro de compras
    validacionStock();
    actualizarContadorCarro();

    //Mostramos datos por consola
    console.log(`${nombreUsuario} compró unas zapatillas ${marcaBuscada} ${modeloBuscado} en el talle ${talleBuscado} color ${colorBuscado}`);
    console.log(`Este es el carro de compras de ${nombreUsuario}:`);
    console.table(carroDeCompras);

    //Pregunta al usuario si quiere seguir comprando
    seguirComprando();
    mostrarListado();
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
            <span class="productoTalle">Stock ${catalogoDisponible.stock}</span>
        </span>
        <!-- <span class="productoComprar btRun-med">COMPRAR</span>-->
        `;

        contenidoProductos[0].append(divProducto);

    })
}

//Función para actualizar el número de productos en el carrito
function actualizarContadorCarro() {
    divCarro.innerHTML = `Productos en el carrito: ${carroDeCompras.length}`;
}

//Función que genera el contenido del encabezado
function infoEncabezado() {

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

}

//Función que muestra en la página el lisatdo de productos comprados
function mostrarListado() {
    let listadoDeCompras = document.getElementsByClassName("listadoDeCompras");
    let productoComprado = document.createElement('div')

    document.getElementById("tituloCarrito").style.display = "block";
    carroDeCompras.forEach((carroDeCompras) => {
        productoComprado.innerHTML = `<span>${carroDeCompras.marca} ${carroDeCompras.modelo} - Talle ${carroDeCompras.talle}</span> `
        listadoDeCompras[0].append(productoComprado)
    })



}
//Función para borrar el bloque de productos y poder actualizarlo
function actualizarBloqueProductos() {
    let bloqueProducto = document.querySelectorAll(".bloqueProducto");
    for (let i = 0; bloqueProducto.length > i; i++) {
        bloqueProducto[i].remove();
    }

}
mostrarProductos()






// Botón que inicia el proceso de compra
let boton = document.getElementById("btnComprar")
boton.addEventListener("click", procesoCompra);

// PROCESO DE COMPRA
let nombreUsuario = prompt("Bienvenido a la Tienda Online de RunClub \n¿Cuál es tu nombre?");
infoEncabezado()