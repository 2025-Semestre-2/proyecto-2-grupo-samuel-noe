
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function EliminarHabitacion(){

  const [idTipoHab, setIdTipoHab] = useState('')
  const [numHab, setNumHab] = useState('')
  const [estado, setEstado] = useState('')

  return (
    <>
      <h1>Eliminar Habitación</h1>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>ID Tipo Habitación: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={idTipoHab}
            onChange={setIdTipoHab}
        />
        </div>

        <div className="form-group">
        <label>Número de Habitación: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={numHab}
            onChange={setNumHab}
        />
        </div>

        <div className="form-group">
        <label>Estado: </label>
        <TextboxBlock
            type="text"
            placeholder=""  
            value={estado}
            onChange={setEstado}
        />
        </div>
        
        <ButtonSection1/>

      </div>
    </>
  )
}