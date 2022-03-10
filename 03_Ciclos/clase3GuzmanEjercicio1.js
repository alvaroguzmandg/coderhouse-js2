alert("¡Bienvenido al primer ejercicio del desafio!");
alert("Mi nombre es Álvaro y tengo 32 años");
let nombreTutor = prompt("¿Cuál es tu nombre?");
let edadTutor = parseInt(prompt(`Hola ${nombreTutor}, ¿cuántos años tenes?`));
resultado = 32 + edadTutor


let respuesta = prompt("¿Eres mi tutor?").toUpperCase();

if (respuesta == "SI") {
    alert(`¡Wow ${nombreTutor}! La suma de nuestras edades es ${resultado}`)
} else {
    console.log(`¡Vete ${nombreTutor}! ¡Tu no eres mi tutor!`)
    alert("¡No deberías estar viendo esto!")
}