"use strict";

const cartas = ["😊", "😊", "❤️", "❤️", "👌", "👌", "🥶", "🥶", "☠️", "☠️", "👾", "👾", "🐸", "🐸", "🦀", "🦀"];
// const shuffledArray = numeros.sort((a, b) => a > b ? 1: -1);

// Returns a random number between min (inclusive) and max (inclusive)
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function barajar() {
  return cartas.sort(() => 0.5 - Math.random()); 
}


console.log(barajar());
function bloquearCartas() {
  for( let i = 0; i <= 15; i++) {
    let cartaBloqueada = document.getElementById(i); 
    cartaBloqueada.innerHTML = cartas[i];
    cartaBloqueada.disabled = true;
  }

}