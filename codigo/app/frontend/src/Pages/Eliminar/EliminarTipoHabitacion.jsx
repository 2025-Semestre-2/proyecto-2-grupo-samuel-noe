
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function EliminarTipoHabitacion(){

  const [idTipoHab, setIdTipoHab] = useState('')
  const [idHotel, setIdHotel] = useState('')
  const [nombre, setNombre] = useState('')
  const [desc, setDesc] = useState('')
  const [tipoCama, setTipoCama] = useState('')
  const [precioNoche, setPrecioNoche] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarTipoHabitacion = () => {
    setIdTipoHab('')
    setIdHotel('')
    setNombre('')
    setDesc('')
    setTipoCama('')
    setPrecioNoche('')
    setValidado(false)
  }

  const validacionesTipoHabitacion = () => {
  
    const hospedajeValido = validarNull(idHotel, 'Identificación Hotel');
    if (!hospedajeValido.esValido) {
      alert(hospedajeValido.mensaje);
      return;
    }
    const nombreValido = validarNull(nombre, 'Nombre');
    if (!nombreValido.esValido) {
      alert(nombreValido.mensaje);
      return;
    }

    const camaValida = validarInt(tipoCama, 'Tipo de Cama');
    if (!camaValida.esValido) {
      alert(camaValida.mensaje);
      return;
    }

    const precioValido = validarInt(precioNoche, 'Precio por noche');
    if (!precioValido.esValido) {
      alert(precioValido.mensaje);
      return;
    }
    //validacion para decimal?

    setValidado(true);
  }

  const mandarRequest = async () => {
    //codigo
    LimpiarTipoHabitacion()
  }

  const verificarExistenciaTipoHab = async () => {
    if (!idTipoHab) {
      alert('Ingresa un ID de Tipo de Habitación');
      return;
    }
    try {
      //codigo
    } 
    catch (e) {
      alert('Tipo de Habitación no encontrado: ' + e.message);
      console.error(e);
    }
  }

  return (
    <>
      <h1>Eliminar Tipo Habitación</h1>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>   

        <div className="form-group">
        <label>ID de Tipo de Habitación: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idTipoHab}
          onChange={setIdTipoHab}
        />
        </div>
        <button onClick={verificarExistenciaTipoHab}>Buscar</button>
   
      </div>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>ID del Hotel: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={idHotel}
            onChange={setIdHotel}
        />
        </div>

        <div className="form-group">
        <label>Nombre: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
        />
        </div>

        <div className="form-group">
        <label>Descripción: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={desc}
            onChange={setDesc}
        />
        </div>

        <div className="form-group">
        <label>Tipo de Cama: </label>
        <TextboxBlock
            type="text"
            placeholder=""  
            value={tipoCama}
            onChange={setTipoCama}
        />
        </div>

        <div className="form-group">
        <label>Precio por noche: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={precioNoche}
            onChange={setPrecioNoche}
        />
        </div>
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={() => {
            validacionesTipoHabitacion()
            if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button onClick={LimpiarTipoHabitacion}>Cancelar</button>
        </div>

      </div>
    </>
  )
}