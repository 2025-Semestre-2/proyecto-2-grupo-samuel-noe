
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function ModificarFotoHab(){

  const [idFotoHab, setIdFotoHab] = useState('')
  const [idTipoHab, setIdTipoHab] = useState('')
  const [url, setUrl] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarFotoHab = () => {
    setIdFotoHab('')
    setIdTipoHab('')
    setUrl('')
    setValidado(false)
  }

  const validacionesFotoHab = () => {
  
    const idTipoHabValido = validarNull(idTipoHab, 'Identificación Tipo Habitación');
    if (!idTipoHabValido.esValido) {
        alert(idTipoHabValido.mensaje);
        return;
    }
    const urlValido = validarNull(url, 'URL de la Foto');
    if (!urlValido.esValido) {
        alert(urlValido.mensaje);
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
    LimpiarFotoHab()
  }

  const verificarExistenciaFotoHab = async () => {
    if (!idFotoHab) {
      alert('Ingresa un ID de Foto de Habitación');
      return;
    }
    try {
    //codigo
    } 
    catch (e) {
      alert('Foto de Habitación no encontrada: ' + e.message);
      console.error(e);
    }
  }

  return (
    <>
      <h1>Modificar Foto de Habitación</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>   

        <div className="form-group">
        <label>ID de Foto de Habitación: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idFotoHab}
          onChange={setIdFotoHab}
        />
        </div>
        <button onClick={verificarExistenciaFotoHab}>Buscar</button>
   
      </div>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
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
        <label>URL de la Foto: </label>
        <Textbox    
            type="text"
            placeholder=""
            value={url}
            onChange={setUrl}
        />
        </div>
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={() => {
            validacionesFotoHab()
            if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button onClick={LimpiarFotoHab}>Cancelar</button>
        </div>

      </div>
    </>
  )
}