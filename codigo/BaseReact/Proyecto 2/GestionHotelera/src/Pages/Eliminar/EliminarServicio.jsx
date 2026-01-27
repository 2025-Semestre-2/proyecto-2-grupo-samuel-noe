
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function EliminarServicio(){

  const [idHospedaje, setIdHospedaje] = useState('')
  const [nombre, setNombre] = useState('')

  return (
    <>
      <h1>Eliminar Servicio</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Identificación Hospedaje: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={idHospedaje}
            onChange={setIdHospedaje}
        />
        </div>

        <div className="form-group">
        <label>Nombre del Servicio: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
        />
        </div>
        
        <ButtonSection1/>

      </div>
    </>
  )
}