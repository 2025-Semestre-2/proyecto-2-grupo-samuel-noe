
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function InsertarTipoHabitacion(){

  const [idHotel, setIdHotel] = useState('')
  const [nombre, setNombre] = useState('')
  const [desc, setDesc] = useState('')
  const [tipoCama, setTipoCama] = useState('')
  const [precioNoche, setPrecioNoche] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarTipoHabitacion = () => {
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

  return (
    <>
      <h1>Insertar Tipo Habitación</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>ID del Hotel: </label>
        <Textbox
            type="text"
            placeholder=""
            value={idHotel}
            onChange={setIdHotel}
        />
        </div>

        <div className="form-group">
        <label>Nombre: </label>
        <Textbox
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
        />
        </div>

        <div className="form-group">
        <label>Descripción: </label>
        <Textbox
            type="text"
            placeholder=""
            value={desc}
            onChange={setDesc}
        />
        </div>

        <div className="form-group">
        <label>Tipo de Cama: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={tipoCama}
            onChange={setTipoCama}
        />
        </div>

        <div className="form-group">
        <label>Precio por noche: </label>
        <Textbox
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