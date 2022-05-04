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



//Función para actualizar el icono y el número de productos en el carrito
function actualizarContadorCarro() {
    cantidad = 0;
    for (let i = 0; i < carroDeCompras.length; i++) {
        let suma = carroDeCompras[i].cantidad
        cantidad = cantidad + suma
    }
    let carritoVacio = () => {
        divContenidoCarrito.innerHTML = `<img class="iconoCarrito" src="images/carritoVacio.svg"> <span class="cantidadCarrito">${cantidad}</span>`;
    }
    let carritoCargado = () => {
        divContenidoCarrito.innerHTML = `<img class="iconoCarrito" src="images/carritoCargado.svg"> <span class="cantidadCarrito">${cantidad}</span>`;
    }
    carroDeCompras.length == 0 ? carritoVacio() : carritoCargado()
}