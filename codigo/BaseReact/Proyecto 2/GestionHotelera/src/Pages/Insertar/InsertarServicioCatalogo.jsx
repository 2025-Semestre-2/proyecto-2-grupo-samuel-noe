
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function InsertarServicioCatalogo(){

  const [nombre, setNombre] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarServicio = () => {
    setNombre('')
    setValidado(false)
  }

  const validacionesServicio = () => {

    const nombreValido = validarNull(nombre, 'Nombre del Servicio');
    if (!nombreValido.esValido) {
      alert(nombreValido.mensaje);
      return;
    }

    setValidado(true);
  }

  const mandarRequest = async () => {
    //codigo
    LimpiarServicio()
  }

  return (
    <>
      <h1>Insertar Servicio Catálogo</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Nombre del Servicio: </label>
        <Textbox
          type="text"
          placeholder=""
          value={nombre}
          onChange={setNombre}
        />
        </div>
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={() => {
            validacionesServicio()
            if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button onClick={LimpiarServicio}>Cancelar</button>
        </div>

      </div>
    </>
  )
}