
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function EliminarFotoHab(){

  const [idTipoHab, setIdTipoHab] = useState('')
  const [url, setUrl] = useState('')

  return (
    <>
      <h1>Eliminar Foto de Habitación</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Identificación Tipo Habitación: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={idTipoHab}
            onChange={setIdTipoHab}
        />
        </div>

        <div className="form-group">
        <label>URL de la Foto: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={url}
            onChange={setUrl}
        />
        </div>
        
        <ButtonSection1/>

      </div>
    </>
  )
}