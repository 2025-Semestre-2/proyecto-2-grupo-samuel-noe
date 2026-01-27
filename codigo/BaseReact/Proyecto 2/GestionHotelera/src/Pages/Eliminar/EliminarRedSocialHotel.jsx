
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function EliminarRedSocialHotel(){

  const [idHospedaje, setIdHospedaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [url, setUrl] = useState('')

  return (
    <>
      <h1>Eliminar Red Social de Hotel</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '10px',
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
        <label>Nombre de la Red Social: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
        />
        </div>

        <div className="form-group">
        <label>Enlace URL: </label>
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