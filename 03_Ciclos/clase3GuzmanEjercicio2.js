alert("Bienvenido al programa de seguridad de Jurassic Park");
alert("Acceso programa principal");
let usuario = prompt("Ingrese su usuario");
alert("Acceso seguridad principal");
let pass = prompt("Ingrese la contraseña");
if (pass == "POR FAVOR") {
    alert("Sistema de seguridad activado");

} else {
    alert("Acceso denegado");
    for (i = 1; i <= 100; i++) {
        console.log("¡NO DIJISTE LA PALABRA MÁGICA! ¡TIENES QUE SER AMABLE!");
    }
    let palabraMagica = "POR FAVOR"
    do {
        passIngresada = prompt("HA, HA, HA, NO HAS DICHO LA PALABRA MÁGICA");
    } while (passIngresada != palabraMagica);
    alert("Sistema de seguridad activado");
    console.log("Siempre hay que pedir 'por favor'!")
}

alert("¡ODIO ESA MANÍA DE LOS INFORMÁTICOS!")