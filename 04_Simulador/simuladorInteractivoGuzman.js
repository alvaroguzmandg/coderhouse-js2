//Constructora de carreras
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


// Constructor de Corredor
class Corredor {
    constructor(nombre, apellido, edad, carrera, codigoCarrera, corral) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.carrera = carrera;
        this.codigoCarrera = codigoCarrera;
        this.corral = corral;
        this.cuotas = false;
        this.costoInscripcion = false;
        this.estadoInscripcion = false;
        this.costoCuota = false;

    }


    //Métodos

    //Validación de Edad
    validarEdad() {
        if (this.edad < 18) {
            return false
        } else {
            return true
        }
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

    // Asignación de código de carrera
    asignacionCodigo() {
        switch (this.carrera) {
            case 1:
                this.codigoCarrera = "42" + this.corral;
                break;
            case 2:
                this.codigoCarrera = "21" + this.corral;
                break;
            case 3:
                this.codigoCarrera = "10" + this.corral;
                break;
        }
    }


    // Elección de Corral
    elegirCorral() {
        if (this.carrera = 1) {
            let ritmo = 0;
            do {
                ritmo = prompt("Elegí la letra de tu corral según tu objetivo \n CORRAL A - Menos de 3hs \n CORRAL B - Entre 3hs y 3hs15 \n CORRAL C - Más de 3hs15 y menos de 3hs30 \n CORRAL D - Más de 3hs30 y menos de 4hs \n CORRAL E - Más de 4hs").toUpperCase();
            }
            while ((ritmo != "A") && (ritmo != "B") && (ritmo != "C") && (ritmo != "D") && (ritmo != "E"))
            return this.corral = ritmo;
        } else if (this.carrera = 2) {
            let ritmo = 0;
            do {
                ritmo = prompt("Elegí la letra de tu corral según tu objetivo \n CORRAL A - Menos de 1h10' \n CORRAL B - Entre 1h10 y 1h15' \n CORRAL C - Entre 1h15' y 1h20' \n CORRAL D - Entre 1'20' y 1h30' \n CORRAL E - Entre 1h30 y 1h45 \n CORRAL F - Entre 1h45 y 2hs \n CORRAL G - Más de 2hs").toUpperCase();
            }
            while ((ritmo != "A") && (ritmo != "B") && (ritmo != "C") && (ritmo != "D") && (ritmo != "E") && (ritmo != "F") && (ritmo != "G"))
            return this.corral = ritmo;
        } else {
            let ritmo = 0;
            do {
                ritmo = prompt("Elegí la letra de tu corral según tu objetivo \n CORRAL A - Menos de 35' \n CORRAL B - Entre 35' y 40' \n CORRAL C - Entre 40' y 45' \n CORRAL D - Entre 45' y 50' \n CORRAL E - Entre 50' y 60' \n CORRAL F - Más de 60'").toUpperCase();
            }
            while ((ritmo != "A") && (ritmo != "B") && (ritmo != "C") && (ritmo != "D") && (ritmo != "E") && (ritmo != "F"))
            return this.corral = ritmo;
        }
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
        if (this.carrera = 1) {
            alert(`Tu monto a pagar es de ${buenosAires42k.costo}`)
            return this.costoInscripcion = buenosAires42k.costo;
        }
        if (this.carrera = 2) {
            alert(`Tu monto a pagar es de ${buenosAires21k.costo}`)
            return this.costoInscripcion = buenosAires21k.costo;
        }
        if (this.carrera = 3) {
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



alert("Bienvenido al formulario de inscripción");
let corredor = new Corredor(
    prompt("Ingrese su nombre"),
    prompt("Ingrese su apellido"),
    prompt("Ingrese su edad"),
);

if (corredor.validarEdad()) {
    corredor.elegirCarrera();
    corredor.elegirCorral();
    corredor.asignacionCodigo();
    alert("¡Gracias por inscribirte!")
    alert("A continuación, procederás al proceso de inscripción")
    corredor.calcularCostoInscripcion()
    corredor.pagarInscripcion();
    if (corredor.carrera == 1) {
        buenosAires42k.sumarInscripto()
    } else if (corredor.carrera == 2) {
        buenosAires21k.sumarInscripto()
    } else if (corredor.carrera == 3) {
        buenosAires10k.sumarInscripto()
    }
    corredor.asignarCarrera();
} else {
    alert("¡Lo sentimos, no puedes participar! \nLa carrera es para mayores de 18 años")
}



console.log(`El corredor ${corredor.nombre} ${corredor.apellido} se inscribió en los ${corredor.carrera} y abonará la inscripción en ${corredor.cuotas} cuotas de $${corredor.costoCuota}`);