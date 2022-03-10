//Constructor de carreras
class Carrera {
    constructor(nombre, costo) {
        this.nombre = nombre;
        this.costo = costo;
        this.inscriptos = 0;
    }

    //Métodos

    // Suma de corredores inscriptos
    sumarInscripto() {
        this.inscriptos = this.inscriptos + 1;
        console.log("Hay " + this.inscriptos + " corredor inscripto/s en " + this.nombre);
    }
}


// Listado de Carreras
const buenosAires42k = new Carrera("42k de Buenos Aires", 3000);
const buenosAires21k = new Carrera("21k de Buenos Aires", 1500);
const buenosAires10k = new Carrera("10k de Buenos Aires", 1000);


//Constructor de corredores
class Corredores {
    constructor(nombre, apellido, edad, carrera) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.carrera = carrera;
        this.cuotas = false;
        this.costoInscripcion = false;
        this.estadoInscripcion = false;
        this.costoCuota = false;
    }

    // Selección de carrera
    elegirCarrera() {
        let carrera = false;
        do {
            carrera = parseFloat(prompt("Elije la carrera que deseas inscribirte \n1. 42k de Buenos Aires \n2. 21k de Buenos Aires \n3. 10k de Buenos Aires"));
        }
        while ((carrera != 1) && (carrera != 2) && (carrera != 3))
        return this.carrera = carrera;
    }

    //Asignación de carrera según la elección
    asignarCarrera() {
        switch (this.carrera) {
            case 1:
                this.carrera = "42k de Buenos Aires";
                break;
            case 2:
                this.carrera = "21k de Buenos Aires";
                break;
            case 3:
                this.carrera = "10k de Buenos Aires";
                break;
        }
    }

    //Calculo de costo de inscripción según la elección
    calcularCostoInscripcion() {
        if (this.carrera == 1) {
            alert(`Tu monto a pagar es de ${buenosAires42k.costo}`)
            return this.costoInscripcion = buenosAires42k.costo;
        }
        if (this.carrera == 2) {
            alert(`Tu monto a pagar es de ${buenosAires21k.costo}`)
            return this.costoInscripcion = buenosAires21k.costo;
        }
        if (this.carrera == 3) {
            alert(`Tu monto a pagar es de ${buenosAires10k.costo}`)
            return this.costoInscripcion = buenosAires10k.costo;
        }
    }

    //Calculo de cuotas y cambio de estado de inscripción
    pagarInscripcion() {
        this.cuotas = parseFloat(prompt("Ingrese el número de cuotas a pagar"))
        this.costoCuota = this.costoInscripcion / this.cuotas;
        alert(`Pagarás ${this.cuotas} cuotas de ${this.costoCuota}`)
        return this.estadoInscripcion = true
    }
}


//FUNCIÓN QUE INICIA EL REGISTRO DE INSCRIPCIÓN Y CONSULTA SI QUIERE REGISTRAR MÁS CORREDORES
function iniciarRegistro(registro) {
    while (registro === 1) {
        registroCorredor();
        registro = parseFloat(prompt("¿Quieres registrar otro corredor? \n1. Si \n2. No"))
    }
    alert("¡Gracias!")
}

//FUNCIÓN QUE REGISTRA AL CORREDOR CON PREVIA VALIDACIÓN DE EDAD
function registroCorredor() {
    let edadCorredor = parseFloat(prompt("Por Favor ingresa tu edad"))
    if (validarEdad(edadCorredor)) {
        corredoresInscriptos.push(new Corredores(prompt("Ingrese el nombre del corredor"), prompt("Ingrese apellido del corredor"), edadCorredor));
        alert("¡Gracias por tu registro!")
    } else {
        alert("¡Lo sentimos, la carrera solo es para mayores de 18 años!")
    }
}

//FUNCIÓN PARA VALIDAR EDAD
function validarEdad(edadCorredor) {
    if (edadCorredor >= 18) {
        return true
    } else {
        return false
    }
}

//FUNCIÓN QUE MUESTRA CORREDORES POR CONSOLA
function mostrarCorredores() {
    for (let i = 0; i < corredoresInscriptos.length; i++) {
        alert(`${corredoresInscriptos[i].nombre} ${corredoresInscriptos[i].apellido} a continuación, procederás al proceso de inscripción`)
        corredoresInscriptos[i].elegirCarrera()
        corredoresInscriptos[i].calcularCostoInscripcion()
        corredoresInscriptos[i].pagarInscripcion();
        if (corredoresInscriptos[i].carrera == 1) {
            buenosAires42k.sumarInscripto()
        } else if (corredoresInscriptos[i].carrera == 2) {
            buenosAires21k.sumarInscripto()
        } else if (corredoresInscriptos[i].carrera == 3) {
            buenosAires10k.sumarInscripto()
        }
        corredoresInscriptos[i].asignarCarrera();
        console.log(`${corredoresInscriptos[i].nombre} ${corredoresInscriptos[i].apellido} está inscripto en ${corredoresInscriptos[i].carrera}`)
    }
}


let corredoresInscriptos = []
iniciarRegistro(parseFloat(prompt("Bienvenido ¿Quieres registrar un corredor? \n1. Si \n2. No")));
mostrarCorredores();