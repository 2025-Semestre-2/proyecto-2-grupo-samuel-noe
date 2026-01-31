export function validarNull(texto, nombreCampo = 'Campo') {
  if (texto === '' || texto === null || texto === undefined) {
    return { esValido: false, mensaje: `${nombreCampo} es requerido.` };
  }
  return { esValido: true, mensaje: '' };
}

export function validarInt(valor, nombreCampo = 'Campo') {
  if (valor === '' || valor === null || valor === undefined) {
    return { esValido: false, mensaje: `${nombreCampo} es requerido.` };
  }
  const numero = Number(valor);
  if (isNaN(numero) || !Number.isInteger(numero)) {
    return { esValido: false, mensaje: `${nombreCampo} debe ser un número entero.` };
  }
  return { esValido: true, mensaje: '' };
}

export function validarCorreo(correo) {
  // Regex simple que cumple con la restricción SQL LIKE '%_@_%._%'
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(correo)) {
    return { esValido: false, mensaje: 'El correo no tiene un formato válido (ej: usuario@dominio.com).' };
  }
  return { esValido: true, mensaje: '' };
}

export function validarUrl(url) {
  if (!url) return { esValido: true, mensaje: '' }; // Es opcional
  if (!url.includes('.')) {
    return { esValido: false, mensaje: 'La URL debe contener al menos un punto (ej: sitio.com).' };
  }
  return { esValido: true, mensaje: '' };
}