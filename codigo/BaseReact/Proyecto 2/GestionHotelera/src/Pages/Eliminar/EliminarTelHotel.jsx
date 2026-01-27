
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function EliminarTelHotel(){

  const [idHospedaje, setIdHospedaje] = useState('')
  const [telefono, setTelefono] = useState('')
  const [codPais, setCodPais] = useState('')

  return (
    <>
      <h1>Eliminar Teléfono de Hotel</h1>

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
        <label>Teléfono del Hotel: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={telefono}
            onChange={setTelefono}
        />
        </div>

        <div className="form-group">
        <label>Código País: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={codPais}
            onChange={setCodPais}
        />
        </div> 
        
        <ButtonSection1/>

      </div>
    </>
  )
}