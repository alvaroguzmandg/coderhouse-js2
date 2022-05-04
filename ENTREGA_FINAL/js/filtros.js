/* --------------------------------- Filtros -------------------------------- */

//Función Orden alfabetico
function ordenarAlfabetico(x, y) {
    if (x.marca < y.marca) { return -1; }
    if (x.marca > y.marca) { return 1; }
    return 0;
}
// Filtro de Orden Alfabético
let productosAZ = () => listadoProductos.sort(ordenarAlfabetico);

//Funciones de Orden por precio
//Menor a mayor precio
function ordenPrecioMenorMayor(x, y) {
    if (x.precio < y.precio) { return -1; }
    if (x.precio > y.precio) { return 1; }
    return 0;
}
//Mayor a menor precio
function ordenPrecioMayorMenor(x, y) {
    if (x.precio > y.precio) { return -1; }
    if (x.precio < y.precio) { return 1; }
    return 0;
}
// Filtros de precios
let productosPrecioMenorMayor = () => listadoProductos.sort(ordenPrecioMenorMayor);
let productosPrecioMayorMenor = () => listadoProductos.sort(ordenPrecioMayorMenor);


//Filtros de Categoria
const categoriaHombre = () => listadoProductos.filter(listadoProductos => listadoProductos.categoria === "Hombre");
const categoriaMujer = () => listadoProductos.filter(listadoProductos => listadoProductos.categoria === "Mujer");

//Filtros de Marca
const productosAdidas = () => listadoProductos.filter(listadoProductos => listadoProductos.marca === "Adidas");
const productosAsics = () => listadoProductos.filter(listadoProductos => listadoProductos.marca === "Asics");
const productosNewBalance = () => listadoProductos.filter(listadoProductos => listadoProductos.marca === "New Balance");
const productosNike = () => listadoProductos.filter(listadoProductos => listadoProductos.marca === "Nike");
const productosSaucony = () => listadoProductos.filter(listadoProductos => listadoProductos.marca === "Saucony");