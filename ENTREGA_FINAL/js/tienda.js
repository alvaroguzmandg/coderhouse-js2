//Función constructora de productos
class ListadoProductos {
    constructor(id, marca, modelo, talles, color, categoria, precio) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.talle = talles;
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

//función constructora del carro de compras
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


/* -------------------- Declaración del array del carrito ------------------- */

//Versión con operador ternario: Si la declaración del array con carrito Almacenado es nula, 
//declara el carro de compras vacío y sino, crea el array de carro de compras concatenando el array de productos almacenados en el carrito

// carroDeComprasAlmacenado === null ? carroDeCompras = [] : carroDeCompras = [].concat(carroDeComprasAlmacenado)

//Versión con operador lógico OR de la declaración del array del carrito
let carroDeCompras = carroDeComprasAlmacenado || []


//Variables que genera el contenedor de productos
let contenidoProductos = document.getElementsByClassName("contenedorProductos");


//Función para traer productos de /productos.json
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

    //Se muestran los productos por orden alfabético
    mostrarProductos(productosAZ())

    //Se agregan los productos del carro de compras al carrito y se muestran
    listadoCarrito(agregarAlCarrito(carroDeCompras))
}

//Se ejecuta la función que muestra la grilla de productos
definirProductos()

/* ------------------------ CONTENIDO DEL ENCABEZADO ------------------------ */
//Función que genera el contenido del encabezado
function infoEncabezado(nombreUsuario) {

    let contenidoEncabezado = document.getElementsByClassName("datosUsuario")

    //Creación bloque de nombre de usuario
    spanNombre = document.createElement('span');
    spanNombre.classList.add("nombreUsuario")
    spanNombre.innerHTML = `¡Hola ${nombreUsuario}!` + ` / <div id="btnCerrarUsuario">Cerrar Sesión</div>`;

    //Se agrega el nombre del usuario
    contenidoEncabezado[0].appendChild(spanNombre);


    //Creación del bloque de carrito
    divCarro = document.getElementsByClassName("datosCarro");
    divContenidoCarrito = document.createElement('span');
    divContenidoCarrito.classList.add("accesoCarrito")

    let contenidoCarrito = document.getElementsByClassName("contenedorCarrito")
    contenidoCarrito[0].appendChild(divContenidoCarrito)

    //Se actualiza el contador del carrito
    actualizarContadorCarro();
}
//Se muestra contenido del encabezado
infoEncabezado(nombreUsuario)

/* ------------------------ FIN CONTENIDO DEL ENCABEZADO ------------------------ */


/* -------------------- FUNCIONES DEL CARRITO DE COMPRAS -------------------- */
//Función para generar el precio total de la compra
function precioCarrito() {
    let precioAcumulado = 0;
    for (let i = 0; i < carroDeCompras.length; i++) {
        let precioProducto = carroDeCompras[i].precio * carroDeCompras[i].cantidad
        precioAcumulado += precioProducto
    }

    //Se agregan puntos al precio
    precioCarritoTotal = new Intl.NumberFormat('es-ES').format(precioAcumulado);
    localStorage.setItem("Precio Carrito", precioCarritoTotal);
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
            <span class="listadoCarrito--titulo">LISTADO DE COMPRA</span>
        `

        //Se genera un bloque de producto por cada producto agregado al carrito
        for (let index = 0; index < carroDeCompras.length; index++) {

            //Declaración de variables en función de los datos del producto
            let marca = carroDeCompras[index].marca;
            let modelo = carroDeCompras[index].modelo;
            let talle = carroDeCompras[index].talle;

            //Se agregan puntos al precio
            let precio = new Intl.NumberFormat('es-ES').format(carroDeCompras[index].precio);

            let imagen = carroDeCompras[index].imagen;
            let id = carroDeCompras[index].id;
            let cantidad = carroDeCompras[index].cantidad;

            // String HTML de la vista del producto en el carrito
            htmlString += `
                <li id="productoAgregado${id}">
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
                <span class="btRun-med" id="finalizarCompra" onclick="avanzarCheckout()">FINALIZAR COMPRA</span>
                <span id="vaciarCarrito">Vaciar Carrito</span></span>
            `

            //Función de vaciar carrito
            const botonVaciar = document.getElementById("vaciarCarrito");
            botonVaciar.addEventListener("click", vaciarCarrito)
        }

    }
}

//Función para ir al checkout
function avanzarCheckout() {
    carroDeCompras.length != 0 && window.location.replace("checkout.html");
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

    // Actualiza carrito almacenado en localstorage
    localStorage.setItem("carritoAlmacenado", JSON.stringify(carroDeCompras));
    //Actualiza carrito
    listadoCarrito();
    //Actualiza el monto del carrito
    precioCarrito()

    //Avisa que el producto fue eliminado
    Toastify({
        text: "¡Producto eliminado!",
        duration: 2000,
        style: {
            background: "red",
        },
    }).showToast();
}


//Función para actualizar el icono y el número de productos en el carrito
function actualizarContadorCarro() {
    cantidad = 0;

    //Actualiza el contador del carrito
    for (let i = 0; i < carroDeCompras.length; i++) {
        let suma = carroDeCompras[i].cantidad
        cantidad = cantidad + suma
    }

    //Muestra el icono de carrito vacío
    let carritoVacio = () => {
        divContenidoCarrito.innerHTML = `<img class="iconoCarrito" src="images/carritoVacio.svg"> <span class="cantidadCarrito">${cantidad}</span>`;
    }

    //Muestra el icono de carrito cargado
    let carritoCargado = () => {
        divContenidoCarrito.innerHTML = `<img class="iconoCarrito" src="images/carritoCargado.svg"> <span class="cantidadCarrito">${cantidad}</span>`;
    }

    //Revisa el estado del carrito y actualiza el icono
    carroDeCompras.length == 0 ? carritoVacio() : carritoCargado()
}


/* --------------- FIN DE LAS FUNCIONES DEL CARRITO DE COMPRAS -------------- */


/* --------------------------- GRILLA DE PRODUCTOS -------------------------- */
//Función para mostrar los productos disponibles en el sitio
function mostrarProductos(grillaProductos) {
    contenidoProductos[0].innerHTML = "";
    grillaProductos.forEach((grillaProductos) => {

        let divProducto = document.createElement('div');
        divProducto.classList.add("bloqueProducto");
        let precio = new Intl.NumberFormat('es-ES').format(`${grillaProductos.precio}`);
        htmlString = `<span class="productoFoto"><img src="images/${grillaProductos.marca.charAt(0)}${grillaProductos.modelo.charAt(0)}${grillaProductos.color.charAt(0)}.png"></span>
        <span class="productoMarca">${grillaProductos.marca} ${grillaProductos.modelo} </span>
        <span class="productoDescripcion">Categoria: ${grillaProductos.categoria} / Color: ${grillaProductos.color} </span>
        <span class="productoDescripcionprecio">Precio <span class="precioGrilla">$${precio}</span></span>
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

        htmlString += `
            </select>
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
        let talleElegido = "Elegí tu talle";
        btnAgregar.addEventListener("click", () => {
            const { id, marca, modelo, color, codProducto, precio } = agregarProductos
            let cantidad = 1;
            let talleCompra = document.getElementById(`talles-${agregarProductos.codProducto}`);
            let talleElegido = talleCompra.value
            let codCompra = codProducto + talleElegido
            let imagen = marca.charAt(0) + modelo.charAt(0) + color.charAt(0);
            let idComprado = id;

            //Verifica si el talle fue elegido
            //Si no fue elegido, tira una alerta y no deja avanzar
            //Si el talle está seleccionado, procede en agregar al carrito
            if (talleElegido == "Elegí tu talle") {
                //Alerta que no se eligió el talle
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
            } else {

                //Verifica si el producto ya está en el carrito
                const existe = carroDeCompras.some(carroDeCompras => carroDeCompras.codProducto === codCompra)

                //En caso de estar suma cantidad
                //En caso de no estar, lo suma como uno nuevo
                if (existe) {
                    const producto = carroDeCompras.map(carroDeCompras => {
                        if (carroDeCompras.codProducto === codCompra) {
                            carroDeCompras.cantidad++
                        }
                    })
                } else {
                    carroDeCompras.push(new CarroDeCompras(idComprado, marca, modelo, parseInt(talleElegido), color, cantidad, codCompra, imagen, precio));
                }

                // Almacen carrito en el localstorage
                localStorage.setItem("carritoAlmacenado", JSON.stringify(carroDeCompras));

                //Alerta de producto agregado al carrito
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

//FUNCIÓN DE CREAR SESIÓN
let btnCerrarSesion = document.getElementById("btnCerrarUsuario")
btnCerrarSesion.onclick = () => {
    window.location.replace("index.html");
}