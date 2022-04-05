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

//Array de modelos de zapatillas existentes
let listadoProductos = []
listadoProductos.push(new ListadoProductos(1, "Adidas", "Ultra Boost 21", [36, 37], "Blanco", "Mujer", 34.999));
listadoProductos.push(new ListadoProductos(2, "Adidas", "Boston 10", [38, 39], "Azul", "Hombre", 42.195));
listadoProductos.push(new ListadoProductos(3, "Nike", "Pegasus 38", [40, 41, 42], "Verde", "Hombre", 26.499));
listadoProductos.push(new ListadoProductos(4, "Puma", "Deviate Nitro", [43, 44, 45], "Naranja", "Hombre", 28.599));
listadoProductos.push(new ListadoProductos(5, "Saucony", "Endorphin", [37, 38, 39], "Azul", "Mujer", 22.199));
listadoProductos.push(new ListadoProductos(6, "Saucony", "Ride 14", [40, 42, 43], "Verde", "Hombre", 19.899));
listadoProductos.push(new ListadoProductos(7, "Saucony", "Speed", [39, 42, 43], "Blancas", "Hombre", 31.199));
listadoProductos.push(new ListadoProductos(8, "New Balance", "Fresh Foam", [40, 42, 43], "Celeste", "Hombre", 29.480));
listadoProductos.push(new ListadoProductos(9, "Nike", "Tempo Next%", [40, 42, 43], "Blancas", "Hombre", 52.140));
listadoProductos.push(new ListadoProductos(10, "Adidas", "SL 20", [35, 36, 38], "Rosa", "Hombre", 21.420));
listadoProductos.push(new ListadoProductos(11, "Nike", "Joyride", [39, 40, 41], "Blancas", "Mujer", 33.140));
listadoProductos.push(new ListadoProductos(12, "Nike", "React Infinity", [40, 42, 43], "Azul", "Hombre", 32.180));
listadoProductos.push(new ListadoProductos(13, "Asics", "Nimbus 22", [41, 43, 44], "Gris", "Hombre", 27.399));
listadoProductos.push(new ListadoProductos(14, "Asics", "Tri Noosa", [40, 42, 43], "Verde", "Hombre", 21.410));


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
    //Revisa productos Almacenados en LocalStorage y las carga al Carrito
    if (localStorage.getItem('carritoAlmacenado') != null) {
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
            let id = carroDeCompras[index].id

            // Estas variables serán utilizadas en próximas actualizaciones
            let cantidad = carroDeCompras[index].cantidad
            let codProducto = carroDeCompras[index].codProducto

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
            contenedor.innerHTML = htmlString + `</span><span id="vaciarCarrito">Vaciar Carrito</span>`
            const botonVaciar = document.getElementById("vaciarCarrito");
            botonVaciar.addEventListener("click", vaciarCarrito)
        }




        //Función para actualizar contador del carrito
        actualizarContadorCarro();
    }
}

//Función para vaciar el carrito
function vaciarCarrito() {
    carroDeCompras.length = 0;
    localStorage.setItem("carritoAlmacenado", JSON.stringify(carroDeCompras));
    listadoCarrito()
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
    listadoCarrito()
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

//Función para asignar Codigo de producto
function asignarCodigoProductos() {
    for (let producto of listadoProductos) {
        producto.asignarCodigo()
    }
}

//Función que Asigna código a los productos listados en el array de modelos publicados
asignarCodigoProductos();



//Función para mostrar los productos disponibles en el sitio
function mostrarProductos() {

    listadoProductos.forEach((listadoProductos) => {

        let divProducto = document.createElement('div');
        divProducto.classList.add("bloqueProducto");

        htmlString = `<span class="productoFoto"><img src="images/${listadoProductos.marca.charAt(0)}${listadoProductos.modelo.charAt(0)}${listadoProductos.color.charAt(0)}.png"></span>
        <span class="productoMarca">${listadoProductos.marca} ${listadoProductos.modelo} </span>
        <span class="productoDescripcion">Categoria: ${listadoProductos.categoria} / Color: ${listadoProductos.color} </span>
        <span class="productoDescripcion">Precio $${listadoProductos.precio}</span>
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
            <button id="btnCompra-${listadoProductos.id}" class="btnAgregar">AGREGAR</button>
            </span>
            `
        htmlString += "</ul>"
        divProducto.innerHTML = htmlString
        contenidoProductos[0].append(divProducto);



    })
}


//Función para Agregar productos al carrito
function agregarAlCarrito() {

    listadoProductos.forEach((listadoProductos) => {

        let btnAgregar = document.getElementById(`btnCompra-${listadoProductos.id}`);
        btnAgregar.addEventListener("click", () => {
            let talleCompra = document.getElementById(`talles-${listadoProductos.codProducto}`).value;
            const { id, marca, modelo, color, codProducto, precio } = listadoProductos
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

                    // CIERRE AUTOMÁTICO
                    // timer: 1000,
                    // timerProgressBar: true,
                    // didOpen: () => {
                    //     Swal.showLoading()
                    //     const b = Swal.getHtmlContainer().querySelector('b')
                    //     timerInterval = setInterval(() => {
                    //         b.textContent = Swal.getTimerLeft()
                    //     }, 100)
                    // },
                    // willClose: () => {
                    //     clearInterval(timerInterval)
                    // },

                }).then((result) => {})
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
            }

        })
    })

}


infoEncabezado(nombreUsuario)
mostrarProductos()
agregarAlCarrito()
listadoCarrito()



//CREAR SESIÓN
let btnCerrarSesion = document.getElementById("btnCerrarUsuario")
btnCerrarSesion.onclick = () => {
    cerrarSesion();
}