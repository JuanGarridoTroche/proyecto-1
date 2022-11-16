import datosJson from '../bd/usuarios.json';
const nuevoRegistro = datosJson.parse(nuevoRegistro); 
  // `[
  //   {
  //   "usuario": "user 5",
  //   "intentos": 23,
  //   "tiempo": 124
  //   },
  //   {
  //     "usuario": "user 6",
  //     "intentos": 29,
  //     "tiempo": 174
  //   }
  // ]`;

  // const newReg = JSON.parse(nuevoRegistro);
  console.log(nuevoRegistro);
  console.log(newReg[1].intentos);

  

  const reg = {
    usuario: "user 10",
    intentos: 34,
    tiempo: 120
  }
  newReg.push(reg);
  console.log(newReg);
  console.log(JSON.stringify(newReg)); 




