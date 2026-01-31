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

/*
 * Archivo: Validaciones.jsx
 * Descripción: Funciones reutilizables para validar campos de formularios.
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

export function validarInt(valor, nombreCampo = 'Campo') {
  // 1. Validar si está vacío primero
  if (valor === '' || valor === null || valor === undefined) {
    return {
        esValido: false,
        mensaje: `${nombreCampo} es requerido.`
    };
  }

  // 2. Validar si es un número
  // isNaN funciona, pero Number(valor) es más estricto
  const numero = Number(valor);

  if (isNaN(numero)) {
    return {
      esValido: false, // Corregido: antes decía boolVali
      mensaje: `${nombreCampo} debe ser un número válido.`
    };
  }

  // 3. Validar si es entero
  if (!Number.isInteger(numero)) {
    return {
      esValido: false,
      mensaje: `${nombreCampo} debe ser un número entero (sin decimales).`
    };
  }

  // Todo correcto
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
