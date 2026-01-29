
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function InsertarServicio(){

  const [idHospedaje, setIdHospedaje] = useState('')
  const [idServicio, setIdServicio] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarServicio = () => {
      setIdHospedaje('')
      setIdServicio('')
      setValidado(false)
  }

  const validacionesServicio = () => {
  
    const hospedajeValido = validarNull(idHospedaje, 'Identificación Hospedaje');
    if (!hospedajeValido.esValido) {
        alert(hospedajeValido.mensaje);
        return;
    }
    const servicioValido = validarNull(idServicio, 'Identificación Servicio');
    if (!servicioValido.esValido) {
        alert(servicioValido.mensaje);
        return;
    }

    const hospedajeValido2 = validarInt(idHospedaje, 'Identificación Hospedaje');
    if (!hospedajeValido2.esValido) {
        alert(hospedajeValido2.mensaje);
        return;
    }
    const servicioValido2 = validarInt(idServicio, 'Identificación Servicio');
    if (!servicioValido2.esValido) {
        alert(servicioValido2.mensaje);
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
      <h1>Insertar Servicio Hotel</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Identificación Hospedaje: </label>
        <Textbox
            type="text"
            placeholder=""
            value={idHospedaje}
            onChange={setIdHospedaje}
        />
        </div>

        <div className="form-group">
        <label>Identificación Servicio: </label>
        <Textbox
            type="text"
            placeholder=""
            value={idServicio}
            onChange={setIdServicio}
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