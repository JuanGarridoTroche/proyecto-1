// import datosJson from '../bd/usuarios.json';
// import misDatosJson from "./datos.json";

// const datos = JSON.parse(misDatosJson);
// console.log(datos);

const misDatos = `{"cadena": "Juan", "numero": 35, "boolean": true,
"arreglo": ["item 1", 25, "contenido 1", "item 4"], "objeto": { "dato": "dato 1", "contacto": "micuenta@micuenta.com" }, "nulo": null}`;

// analizamos (parse) un string (es lo que vemos al ver un JSON) y lo pasamos a Objeto:
const miObjeto = JSON.parse(misDatos);
console.log(miObjeto.arreglo[2]);

//Lo volvemos a pasar a string para guardar como JSON:
const miString = JSON.stringify(miObjeto);
console.log(miString);

if (misDatos === miString) {
  console.log("Es igual que el original");
} else {
  console.log("Error");
}
