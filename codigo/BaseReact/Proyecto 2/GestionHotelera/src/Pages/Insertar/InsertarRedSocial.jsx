
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarInt, validarNull } from '../../Components/Validaciones'
import axios from 'axios'

export function InsertarRedSocial(){

  const [nombre, setNombre] = useState('')
  const [url, setUrl] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarRedSocial = () => {
    setNombre('')
    setUrl('')
    setValidado(false)
  }

  const validacionesRedSocial = () => {
    const nombreValido = validarNull(nombre, 'Nombre Plataforma');
    if (!nombreValido.esValido) {
      alert(nombreValido.mensaje);
      return;
    }
    const urlValido = validarNull(url, 'URL');
    if (!urlValido.esValido) {
      alert(urlValido.mensaje);
      return;
    }

    setValidado(true);
  }

  const mandarRequest = async () => {
    // Código para enviar la solicitud
    LimpiarRedSocial();
  }

  return (
    <>
      <h1>Insertar Red Social</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Nombre Plataforma: </label>
        <Textbox
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
        />
        </div>

        <div className="form-group">
        <label>URL: </label>
        <Textbox
            type="text"
            placeholder=""
            value={url}
            onChange={setUrl}
        />
        </div>
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
            <button onClick={() => {
                validacionesRedSocial()
                if(validado){mandarRequest()}
            }}>Aceptar</button>
            <button onClick={LimpiarRedSocial}>Cancelar</button>
        </div>

      </div>
    </>
  )
}