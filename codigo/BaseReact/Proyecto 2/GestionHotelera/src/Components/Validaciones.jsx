/*
export function validarNull(texto)
{
    if (texto === '' || texto === null || texto === undefined) {
        return {
            esValido: false
        }
    }
}
*/

export function validarNull(texto, nombreCampo = 'Campo') {
  if (texto === '' || texto === null || texto === undefined) {
    return {
      esValido: false,
      mensaje: `${nombreCampo} no puede estar vacío.`
    };
  }
  return { esValido: true, mensaje: '' };
}

export function validarInt(valor, nombreCampo) {

  if (isNaN(texto)) {
    return {
      boolVali: false
    }
  }
  const numero = Number(valor);
  if (!Number.isInteger(numero)) {
    return {
      boolVali: false,
      mensaje: `${nombreCampo} debe ser un número entero.`
    };
  }

  return { esValido: true, mensaje: '', numero };
}


/*
export function validarInt(valor) {
  // Si está vacío
  if (valor === '' || valor === null || valor === undefined) {
    return {
      esValido: false,
      mensaje: 'El campo no puede estar vacío',
      numero: null
    };
  }

  // Convertir a número
  ;

  // Verificar si la conversión fue válida
  if (isNaN(numero)) {
    return {
      esValido: false,
      mensaje: 'Debe ser un número entero válido',
      numero: null
    };
  }

  // Verificar si es un número entero (sin decimales)
  if (numero.toString() !== valor.trim()) {
    return {
      esValido: false,
      mensaje: 'Debe ser un número entero sin decimales',
      numero: null
    };
  }

  return {
    esValido: true,
    mensaje: 'Válido',
    numero: numero
  };
}

*/
