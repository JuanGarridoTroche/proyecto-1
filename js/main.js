"use strict";

// const emojis = ["😊", "❤️", "👌", "🥶", "☠️", "👾", "🐸", "🦀"];
const emojis = [0, 1, 2, 3];
const numeros = [0, 0, 1, 1, 2, 2, 3, 3];

// Returns a random number between min (inclusive) and max (inclusive)
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const arrayEmojis = [];
let pos = 0;
function crearArray() {
  do {
    const posicion = getRandom(0, numeros.length - 1);
    console.log(arrayEmojis);
    if (posicion > 3) {
      pos = posicion - 3;
      arrayEmojis.push(emojis[pos]);
    } else {
      arrayEmojis.push(emojis[posicion]);
    }
    console.log(numeros);
    numeros.splice(numeros[posicion], 1);
    console.log(numeros);
    console.log(numeros[posicion]);
  } while (numeros.length !== 0);
}
crearArray();

console.log(arrayEmojis);
