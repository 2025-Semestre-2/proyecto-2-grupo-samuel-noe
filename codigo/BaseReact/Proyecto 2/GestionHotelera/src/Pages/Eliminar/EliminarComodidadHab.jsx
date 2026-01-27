
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function EliminarComodidadHab(){

  const [idTipoHab, setIdTipoHab] = useState('')
  const [desc, setDesc] = useState('')

  return (
    <>
      <h1>Eliminar Comodidad de Habitación</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '10px',
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
        <label>Descripción: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={desc}
            onChange={setDesc}
        />
        </div>
        
        <ButtonSection1/>

      </div>
    </>
  )
}