class ListadoProductos {
    constructor(id, marca, modelo, talles, color, categoria, precio) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.talle = talles;
        // this.stock = stock;
        this.color = color;
        this.categoria = categoria;
        this.precio = precio;
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

}

// DECLARACIÓN DE ARRAYS
class CarroDeCompras {
    constructor(id, marca, modelo, talles, color, cantidad, codProducto, imagen, precio) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.talle = talles;
        this.color = color;
        this.cantidad = cantidad;
        this.codProducto = codProducto;
        this.imagen = imagen;
        this.precio = precio;
    }
    sumarCantidad() {
        this.cantidad++
    }
}






//Creación de Array con carrito Almacenado
let carroDeComprasAlmacenado = JSON.parse(localStorage.getItem('carritoAlmacenado'))

//Versión con operador ternario: Si la declaración del array con carrito Almacenado es nula, 
//declara el carro de compras vacío y sino, crea el array de carro de compras concatenando el array de productos almacenados en el carrito
// carroDeComprasAlmacenado === null ? carroDeCompras = [] : carroDeCompras = [].concat(carroDeComprasAlmacenado)

//Versión con operador lógico OR de la declaración del array del carrito
carroDeCompras = carroDeComprasAlmacenado || []

//Variables que genera el contenedor de productos
let contenidoProductos = document.getElementsByClassName("contenedorProductos");




// DECLARACIÓN DE FUNCIONES


//Función para traer productos
const definirProductos = async() => {
    const resp = await fetch('productos.json')
    listadoProductos = await resp.json()

    listadoProductos.forEach(listadoProductos => {
        let letraMarca = listadoProductos.marca.charAt(0)
        let letraMarca2 = listadoProductos.marca.charAt(1)
        let letraModelo = listadoProductos.modelo.charAt(0)
        let letraColor = listadoProductos.color.charAt(0)
        let letraCategoria = listadoProductos.categoria.charAt(0)
        listadoProductos.codProducto = letraMarca + letraMarca2 + letraModelo + letraColor + letraCategoria;
    })

    mostrarProductos(listadoProductos)
    agregarAlCarrito(carroDeCompras)
    listadoCarrito()
}


definirProductos()



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

//Función de cerrar sesión
function cerrarSesion() {
    localStorage.clear();
    location.reload();
}


//Lista los productos en el carrito
function listadoCarrito() {
    //Función para actualizar contador del carrito
    actualizarContadorCarro();
    //Se Actualiza el monto del carrito
    precioCarrito();

    //Revisa productos Almacenados en LocalStorage y las carga al Carrito
    if (localStorage.getItem('carritoAlmacenado') != null) {
        precioCarritoTotal = localStorage.getItem("Precio Carrito");
        let contenedor = document.getElementById("productosEnCarrito");
        contenedor.innerHTML = " "

        htmlString = `
        <span class="listadoCarrito">
        <span class="listadoCarrito--titulo">LISTADO DE PRODUCTOS</span>`


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
                        <span onclick="quitarProducto(${id})" class="carrito__productoTexto--quitar">Eliminar</span></span>
                    </span>
                    
                    </li>
                    `
            contenedor.innerHTML = htmlString + `
            
            <span id="precioCarrito">Total: $${precioCarritoTotal}</span>
            <span class="btRun-med" id="finalizarCompra">FINALIZAR COMPRA</span>
            <span id="vaciarCarrito">Vaciar Carrito</span></span>
            `
            const botonVaciar = document.getElementById("vaciarCarrito");
            botonVaciar.addEventListener("click", vaciarCarrito)
        }

    }
}

//Función para vaciar el carrito
function vaciarCarrito() {
    carroDeCompras.length = 0;
    localStorage.setItem("carritoAlmacenado", JSON.stringify(carroDeCompras));
    listadoCarrito();
    //Se Actualiza el monto del carrito
    precioCarrito();
    Toastify({
        text: "¡Carrito eliminado!",
        duration: 4000,
        style: {
            with: "300px",
            background: "red",
        },
    }).showToast();
}

//Función para mostrar el carrito con mouseover
let botonCarrito = document.getElementById("carroDeCompras")
botonCarrito.onmouseover = () => {
    let contenedorCarrito = document.getElementById("productosEnCarrito")
    contenedorCarrito.style.display = "block";
}
botonCarrito.onmouseout = () => {
    let contenedorCarrito = document.getElementById("productosEnCarrito")
    contenedorCarrito.style.display = "none";
}


//Función para quitar productos del carrito
function quitarProducto(id) {;


    const item = carroDeCompras.find((prod) => prod.id === id)
    const indice = carroDeCompras.indexOf(item)
    carroDeCompras.splice(indice, 1)

    localStorage.setItem("carritoAlmacenado", JSON.stringify(carroDeCompras));
    listadoCarrito();
    //Se Actualiza el monto del carrito
    precioCarrito()

    Toastify({
        text: "¡Producto eliminado!",
        duration: 2000,
        style: {
            background: "red",
        },
    }).showToast();
}

//Función para actualizar el número de productos en el carrito
function actualizarContadorCarro() {
    cantidad = 0;
    for (let i = 0; i < carroDeCompras.length; i++) {
        let suma = carroDeCompras[i].cantidad
        cantidad = cantidad + suma
    }
    divContenidoCarrito.innerHTML = `Productos en el carrito: ${cantidad}`;
}


//Función para mostrar los productos disponibles en el sitio
function mostrarProductos(grillaProductos) {
    contenidoProductos[0].innerHTML = "";
    grillaProductos.forEach((grillaProductos) => {

        let divProducto = document.createElement('div');
        divProducto.classList.add("bloqueProducto");

        htmlString = `<span class="productoFoto"><img src="images/${grillaProductos.marca.charAt(0)}${grillaProductos.modelo.charAt(0)}${grillaProductos.color.charAt(0)}.png"></span>
        <span class="productoMarca">${grillaProductos.marca} ${grillaProductos.modelo} </span>
        <span class="productoDescripcion">Categoria: ${grillaProductos.categoria} / Color: ${grillaProductos.color} </span>
        <span class="productoDescripcion">Precio $${grillaProductos.precio}</span>
        <span class="productoEspecificaciones">
            <select id="talles-${grillaProductos.codProducto}" class="caja" value="Elegí tu talle">
            <option value="Elegí tu talle">Talle</option>`;

        let talleProducto = grillaProductos.talle
        for (let i = 0; i < talleProducto.length; i++) {
            let valor = `${grillaProductos.talle[i]}`

            let option1 = document.createElement("option");
            let select = document.getElementById("talles")

            option1.setAttribute("value", valor);
            let option1Texto = document.createTextNode("opcion 1");
            htmlString += `<option value="${valor}">${valor}</option>`
        }

        htmlString += `</select>
            <button id="btnCompra-${grillaProductos.id}" class="btnAgregar">AGREGAR</button>
            </span>
            `
        htmlString += "</ul>"
        divProducto.innerHTML = htmlString
        contenidoProductos[0].append(divProducto);



    })
    agregarAlCarrito(grillaProductos)
}


//Función para Agregar productos al carrito
function agregarAlCarrito(agregarProductos) {

    agregarProductos.forEach((agregarProductos) => {

        let btnAgregar = document.getElementById(`btnCompra-${agregarProductos.id}`);
        btnAgregar.addEventListener("click", () => {
            let talleCompra = document.getElementById(`talles-${agregarProductos.codProducto}`).value;
            const { id, marca, modelo, color, codProducto, precio } = agregarProductos
            let cantidad = 1;
            let codCompra = codProducto + talleCompra
            let imagen = marca.charAt(0) + modelo.charAt(0) + color.charAt(0);
            let idComprado = id;

            if (talleCompra == "Elegí tu talle") {
                // alert("Por favor, elegí un talle")
                Swal.fire({
                        title: '¡Atención!',
                        text: 'Por favor, elegí un talle',
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
                    // .then((result) => {})
            } else {

                const existe = carroDeCompras.some(carroDeCompras => carroDeCompras.codProducto === codCompra)

                if (existe) {
                    const producto = carroDeCompras.map(carroDeCompras => {
                        if (carroDeCompras.codProducto === codCompra) {
                            carroDeCompras.cantidad++
                        }
                    })
                } else {
                    carroDeCompras.push(new CarroDeCompras(idComprado, marca, modelo, parseInt(talleCompra), color, cantidad, codCompra, imagen, precio));
                }


                localStorage.setItem("carritoAlmacenado", JSON.stringify(carroDeCompras));

                Toastify({
                    text: "¡Producto agregado al carrito!",
                    duration: 3000,
                    gravity: "bottom",
                    style: {
                        background: "#FF5500",
                    }
                }).showToast();


                //Se actualizado el listado de productos en el carrito
                listadoCarrito();
                //Se Actualiza el contador del carrito
                actualizarContadorCarro();
                //Se Actualiza el monto del carrito
                precioCarrito()
            }

        })
    })

}


infoEncabezado(nombreUsuario)




//CREAR SESIÓN
let btnCerrarSesion = document.getElementById("btnCerrarUsuario")
btnCerrarSesion.onclick = () => {
    window.location.replace("index.html");
}


//PRECIO CARRITO
precioCarrito = () => {
    let precioAcumulado = 0;
    for (let i = 0; i < carroDeCompras.length; i++) {
        let precioProducto = carroDeCompras[i].precio * carroDeCompras[i].cantidad
        precioAcumulado += precioProducto
    }
    precioCarritoTotal = precioAcumulado
    localStorage.setItem("Precio Carrito", precioCarritoTotal);
}




/* --------------------------------- Filtros -------------------------------- */

//Función Orden alfabetico
function ordenarAlfabetico(x, y) {
    if (x.marca < y.marca) { return -1; }
    if (x.marca > y.marca) { return 1; }
    return 0;
}
let productosAZ = () => listadoProductos.sort(ordenarAlfabetico);


//Filtro categoria
const categoriaHombre = () => listadoProductos.filter(listadoProductos => listadoProductos.categoria === "Hombre");
const categoriaMujer = () => listadoProductos.filter(listadoProductos => listadoProductos.categoria === "Mujer");

//Filtro por marca

const productosAdidas = () => listadoProductos.filter(listadoProductos => listadoProductos.marca === "Adidas");
const productosNike = () => listadoProductos.filter(listadoProductos => listadoProductos.marca === "Nike");
const productosSaucony = () => listadoProductos.filter(listadoProductos => listadoProductos.marca === "Saucony");