
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function ModificarComodidadHab(){

  const [idTipoHab, setIdTipoHab] = useState('')
  const [desc, setDesc] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarComodidadHab = () => {
    setIdTipoHab('')
    setDesc('')
    setValidado(false)
  }

  const validacionesComodidadHab = () => {
  
    const idTipoHabValido = validarNull(idTipoHab, 'Identificación Tipo Habitación');
    if (!idTipoHabValido.esValido) {
      alert(idTipoHabValido.mensaje);
      return;
    }
    const descValido = validarNull(desc, 'Descripción');
    if (!descValido.esValido) {
      alert(descValido.mensaje);
      return;
    }

    const idTipoHabValido2 = validarInt(idTipoHab, 'Identificación Tipo Habitación');
    if (!idTipoHabValido2.esValido) {
      alert(idTipoHabValido2.mensaje);
      return;
    }

    setValidado(true);
  }

  const mandarRequest = async () => {
    //codigo
    LimpiarComodidadHab()
  }

  return (
    <>
      <h1>Modificar Comodidad de Habitación</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Identificación Tipo Habitación: </label>
        <Textbox
            type="text"
            placeholder=""
            value={idTipoHab}
            onChange={setIdTipoHab}
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
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={() => {
            validacionesComodidadHab()
            if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button onClick={LimpiarComodidadHab}>Cancelar</button>
        </div>

      </div>
    </>
  )
}