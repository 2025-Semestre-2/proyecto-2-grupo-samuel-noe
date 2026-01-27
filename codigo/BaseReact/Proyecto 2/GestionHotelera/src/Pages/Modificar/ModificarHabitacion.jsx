
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function ModificarHabitacion(){

  const [idTipoHab, setIdTipoHab] = useState('')
  const [numHab, setNumHab] = useState('')
  const [estado, setEstado] = useState('')

  return (
    <>
      <h1>Modificar Habitación</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>ID Tipo Habitación: </label>
        <Textbox
            type="text"
            placeholder=""
            value={idTipoHab}
            onChange={setIdTipoHab}
        />
        </div>

        <div className="form-group">
        <label>Número de Habitación: </label>
        <Textbox
            type="text"
            placeholder=""
            value={numHab}
            onChange={setNumHab}
        />
        </div>

        <div className="form-group">
        <label>Estado: </label>
        <Textbox
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