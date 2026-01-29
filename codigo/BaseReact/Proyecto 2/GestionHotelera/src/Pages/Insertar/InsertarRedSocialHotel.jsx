
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarInt, validarNull } from '../../Components/Validaciones'
import axios from 'axios'

export function InsertarRedSocialHotel(){

  const [idHospedaje, setIdHospedaje] = useState('')
  const [idPlataforma, setIdPlataforma] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarRedSocialHotel = () => {
    setIdHospedaje('')
    setIdPlataforma('')
    setValidado(false)
  }

  const validacionesRedSocialHotel = () => {
    const idHospedajeValido = validarNull(idHospedaje, 'Identificación Hospedaje');
    if (!idHospedajeValido.esValido) {
      alert(idHospedajeValido.mensaje);
      return;
    }
    const idPlataformaValido = validarNull(idPlataforma, 'Identificación Red Social');
    if (!idPlataformaValido.esValido) {
      alert(idPlataformaValido.mensaje);
      return;
    }

    const idHospedajeValido2 = validarInt(idHospedaje, 'Identificación Hospedaje');
    if (!idHospedajeValido2.esValido) {
      alert(idHospedajeValido2.mensaje);
      return;
    }
    const idPlataformaValido2 = validarInt(idPlataforma, 'Identificación Red Social');
    if (!idPlataformaValido2.esValido) {
      alert(idPlataformaValido2.mensaje);
      return;
    }
    setValidado(true);
  }

  const mandarRequest = async () => {
    // Código para enviar la solicitud
    LimpiarRedSocialHotel();
  }

  return (
    <>
      <h1>Insertar Red Social de Hotel</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '10px',
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
        <label>Identificación Red Social: </label>
        <Textbox
            type="text"
            placeholder=""
            value={idPlataforma}
            onChange={setIdPlataforma}
        />
        </div>
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
            <button onClick={() => {
                validacionesRedSocialHotel()
                if(validado){mandarRequest()}
            }}>Aceptar</button>
            <button onClick={LimpiarRedSocialHotel}>Cancelar</button>
        </div>

      </div>
    </>
  )
}