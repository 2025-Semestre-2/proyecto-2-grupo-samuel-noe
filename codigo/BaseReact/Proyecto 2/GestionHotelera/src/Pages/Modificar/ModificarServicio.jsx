
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function ModificarServicio(){

  const [nombre, setNombre] = useState('')
  const [desc, setDesc] = useState('')
  const [costo, setCosto] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarServicio = () => {
    setNombre('')
    setDesc('')
    setCosto('')
    setValidado(false)
  }

  const validacionesServicio = () => {
  
    const nombreValido = validarNull(nombre, 'Nombre del Servicio');
    if (!nombreValido.esValido) {
      alert(nombreValido.mensaje);
      return;
    }
    const descValido = validarNull(desc, 'Descripción');
    if (!descValido.esValido) {
      alert(descValido.mensaje);
      return;
    }
    const costoValido = validarNull(costo, 'Costo');
    if (!costoValido.esValido) {
      alert(costoValido.mensaje);
      return;
    }

    const costoValido2 = validarInt(costo, 'Costo');
    if (!costoValido2.esValido) {
      alert(costoValido2.mensaje);
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
      <h1>Modificar Servicio</h1>

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
        <label>Costo: </label>
        <Textbox
          type="text"
          placeholder=""
          value={costo}
          onChange={setCosto}
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