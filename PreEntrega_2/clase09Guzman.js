class ListadoProductos {
    constructor(marca, modelo, talles, color, categoria) {
        this.marca = marca;
        this.modelo = modelo;
        this.talle = talles;
        // this.stock = stock;
        this.color = color;
        this.categoria = categoria;
    }

    //Asignación de código de producto
    asignarCodigo() {
        let letraMarca = this.marca.charAt(0)
        let letraMarca2 = this.marca.charAt(1)
        let letraModelo = this.modelo.charAt(0)
        let letraColor = this.color.charAt(0)
        let letraCategoria = this.categoria.charAt(0)
        this.codProducto = letraMarca + letraMarca2 + letraModelo + letraColor + letraCategoria;
    }

    //Validación de stock a la hora de elegir el producto
    // validarStockProducto() {
    //     if (this.stock > 0) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    //Resta de stock disponible en caso de agregar al carrito
    // restarStock() {
    //     this.stock = this.stock - 1
    // }

    // // Suma de stock en caso de entrar más productos
    // sumarStock() {
    //     this.stock = this.stock + 1
    // }
}



// DECLARACIÓN DE ARRAYS
class CarroDeCompras {
    constructor(marca, modelo, talles, color, cantidad, codProducto, imagen) {
        this.marca = marca;
        this.modelo = modelo;
        this.talle = talles;
        this.color = color;
        this.cantidad = cantidad;
        this.codProducto = codProducto;
        this.imagen = imagen;
    }
}

//Array de modelos de zapatillas existentes
let listadoProductos = []
listadoProductos.push(new ListadoProductos("Adidas", "Ultra Boost 21", [36, 37], "Blanco", "Mujer"));
listadoProductos.push(new ListadoProductos("Adidas", "Boston 10", [38, 39], "Azul", "Hombre"));
listadoProductos.push(new ListadoProductos("Nike", "Pegasus 38", [40, 41, 42], "Verde", "Hombre"));
listadoProductos.push(new ListadoProductos("Puma", "Deviate Nitro", [43, 44, 45], "Naranja", "Hombre"));
listadoProductos.push(new ListadoProductos("Saucony", "Endorphin", [37, 38, 39], "Azul", "Mujer"));
listadoProductos.push(new ListadoProductos("Saucony", "Ride 14", [40, 42, 43], "Verde", "Hombre"));
listadoProductos.push(new ListadoProductos("Saucony", "Speed", [39, 42, 43], "Blancas", "Hombre"));
listadoProductos.push(new ListadoProductos("New Balance", "Fresh Foam", [40, 42, 43], "Celeste", "Hombre"));
listadoProductos.push(new ListadoProductos("Nike", "Tempo Next%", [40, 42, 43], "Blancas", "Hombre"));
listadoProductos.push(new ListadoProductos("Adidas", "SL 20", [35, 36, 38], "Rosa", "Hombre"));
listadoProductos.push(new ListadoProductos("Nike", "Joyride", [39, 40, 41], "Blancas", "Mujer"));
listadoProductos.push(new ListadoProductos("Nike", "React Infinity", [40, 42, 43], "Azul", "Hombre"));
listadoProductos.push(new ListadoProductos("Asics", "Nimbus 22", [41, 43, 44], "Gris", "Hombre"));
listadoProductos.push(new ListadoProductos("Asics", "Tri Noosa", [40, 42, 43], "Verde", "Hombre"));


let carroDeComprasAlmacenado = JSON.parse(localStorage.getItem('carritoAlmacenado'))

carroDeComprasAlmacenado === null ? carroDeCompras = [] : carroDeCompras = [].concat(carroDeComprasAlmacenado)


function listadoCarrito() {
    let posicion = 0;

    //Revisa carreras Almacenadas en LocalStorage y las carga al Carrito
    if (localStorage.getItem('carritoAlmacenado') != null) {
        let contenedor = document.getElementById("productosEnCarrito");
        contenedor.innerHTML = " "
        htmlString = `
        <span class="listadoCarrito">
        <span class="listadoCarrito--titulo">LISTADO DE PRODUCTOS</span>`
        for (let index = 0; index < carroDeCompras.length; index++) {

            let marca = carroDeCompras[index].marca
            let modelo = carroDeCompras[index].modelo
            let talle = carroDeCompras[index].talle
            let cantidad = carroDeCompras[index].cantidad
            let codProducto = carroDeCompras[index].codProducto
            let posicion = carroDeCompras.indexOf(carroDeCompras[index])
            let imagen = carroDeCompras[index].imagen

            htmlString += `<li id="productoAgregado${posicion}">
                    <span class="carrito__carreraTexto">
                        <span class="carrito__productoImagen"><img src="images/${imagen}.png"></span>
                        <span class="carrito__carreraTexto--titulo">${marca} ${modelo}
                        <br>
                        <span class="carrito__carreraTexto--titulo">Talle: ${talle}
                        <br>
                        <span id="${posicion}" class="carrito__carreraTexto--quitar">Eliminar</span></span>
                    </span>
                    
                    </li>
                    `

        }
        contenedor.innerHTML = htmlString + `</span>`

    }
    quitarProducto(posicion);
    actualizarContadorCarro();
}




function quitarProducto(posicion) {
    let borrarProducto = document.getElementsByClassName("carrito__carreraTexto--quitar");
    for (const boton of borrarProducto) {
        boton.onclick = () => {
            // let id = boton.getAttribute("id");
            carroDeCompras.splice(posicion, 1)
            document.getElementById(`productoAgregado${posicion}`).remove();
            // document.getElementById("productoAgregado").remove();
            localStorage.setItem("carritoAlmacenado", JSON.stringify(carroDeCompras));
            listadoCarrito()
        }
    }

}






//Variables que genera el contenedor de productos
let contenidoProductos = document.getElementsByClassName("contenedorProductos");






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



//Función para mostrar los productos disponibles en el sitio
function mostrarProductos() {

    listadoProductos.forEach((listadoProductos) => {

        let divProducto = document.createElement('div');
        divProducto.classList.add("bloqueProducto");

        htmlString = `<span class="productoFoto"><img src="images/${listadoProductos.marca.charAt(0)}${listadoProductos.modelo.charAt(0)}${listadoProductos.color.charAt(0)}.png"></span>
        <span class="productoMarca">${listadoProductos.marca} ${listadoProductos.modelo} </span>
        <span class="productoDescripcion">Categoria: ${listadoProductos.categoria} / Color: ${listadoProductos.color} </span>
        <span class="productoEspecificaciones">
            <select id="talles-${listadoProductos.codProducto}" class="caja" value="Elegí tu talle">
            <option value="Elegí tu talle">Talle</option>`;

        let talleProducto = listadoProductos.talle
        for (let i = 0; i < talleProducto.length; i++) {
            let valor = `${listadoProductos.talle[i]}`

            let option1 = document.createElement("option");
            let select = document.getElementById("talles")

            option1.setAttribute("value", valor);
            let option1Texto = document.createTextNode("opcion 1");
            htmlString += `<option value="${valor}">${valor}</option>`
        }

        htmlString += `</select>
            <button id="btnCompra-${listadoProductos.codProducto}" class="btnAgregar">AGREGAR</button>
            </span>
            `
        htmlString += "</ul>"
        divProducto.innerHTML = htmlString
        contenidoProductos[0].append(divProducto);



    })
}





function agregarAlCarrito() {
    listadoProductos.forEach((listadoProductos) => {

        let btnAgregar = document.getElementById(`btnCompra-${listadoProductos.codProducto}`);
        btnAgregar.addEventListener("click", () => {

            let talleCompra = document.getElementById(`talles-${listadoProductos.codProducto}`).value;

            if (talleCompra == "Elegí tu talle") {
                alert("Por favor, elegí un talle")
            } else {

                let cantidad = 1;
                let marcaCompra = listadoProductos.marca;
                let modeloCompra = listadoProductos.modelo;
                let colorCompra = listadoProductos.color;
                let codCompra = listadoProductos.codProducto + talleCompra
                let imagen = listadoProductos.marca.charAt(0) + listadoProductos.modelo.charAt(0) + listadoProductos.color.charAt(0);

                carroDeCompras.push(new CarroDeCompras(marcaCompra, modeloCompra, parseInt(talleCompra), colorCompra, cantidad, codCompra, imagen));
                console.log("producto agregado al carrito")
                localStorage.setItem("carritoAlmacenado", JSON.stringify(carroDeCompras));

                listadoCarrito();
                actualizarContadorCarro();
            }

        })
    })


}


//Función que genera el contenido del encabezado
function infoEncabezado(nombreUsuario) {

    let contenidoEncabezado = document.getElementsByClassName("datosUsuario")

    spanNombre = document.createElement('span');
    spanNombre.classList.add("nombreUsuario")
    spanNombre.innerHTML = `¡Hola ${nombreUsuario}!` + ` / <div id="btnCerrarUsuario">Cerrar Sesión</div>`;



    contenidoEncabezado[0].appendChild(spanNombre);


    divCarro = document.getElementsByClassName("datosCarro");

    divContenidoCarrito = document.createElement('span');
    divContenidoCarrito.classList.add("accesoCarrito")

    let contenidoCarrito = document.getElementsByClassName("contenedorCarrito")
    contenidoCarrito[0].appendChild(divContenidoCarrito)
    actualizarContadorCarro();
}

//Función para actualizar el número de productos en el carrito
function actualizarContadorCarro() {
    divContenidoCarrito.innerHTML = `Productos en el carrito: ${carroDeCompras.length}`;
}



infoEncabezado(nombreUsuario)
mostrarProductos()
agregarAlCarrito()
listadoCarrito()



let botonCarrito = document.getElementById("carroDeCompras")
botonCarrito.onmouseover = () => {
    let contenedorCarrito = document.getElementById("productosEnCarrito")
    contenedorCarrito.style.display = "block";
}
botonCarrito.onmouseout = () => {
    let contenedorCarrito = document.getElementById("productosEnCarrito")
    contenedorCarrito.style.display = "none";
}


//Función de cerrar sesión
function crearSesion() {
    localStorage.clear();
    location.reload();
}


//CREAR SESIÓN
let btnCrearUsuario = document.getElementById("btnCerrarUsuario")
btnCrearUsuario.onclick = () => {
    crearSesion();
}