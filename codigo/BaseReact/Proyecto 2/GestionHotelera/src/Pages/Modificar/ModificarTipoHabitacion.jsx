
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function ModificarTipoHabitacion(){

  const [idHotel, setIdHotel] = useState('')
  const [nombre, setNombre] = useState('')
  const [desc, setDesc] = useState('')
  const [tipoCama, setTipoCama] = useState('')
  const [precioNoche, setPrecioNoche] = useState('')

  return (
    <>
      <h1>Modificar Tipo Habitación</h1>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>ID del Hotel: </label>
        <Textbox
            type="text"
            placeholder=""
            value={idHotel}
            onChange={setIdHotel}
        />
        </div>

        <div className="form-group">
        <label>Nombre: </label>
        <Textbox
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
        />
        </div>

        <div className="form-group">
        <label>Descripción: </label>
        <Textbox
            type="text"
            placeholder=""
            value={desc}
            onChange={setDesc}
        />
        </div>

        <div className="form-group">
        <label>Tipo de Cama: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={tipoCama}
            onChange={setTipoCama}
        />
        </div>

        <div className="form-group">
        <label>Precio por noche: </label>
        <Textbox
            type="text"
            placeholder=""
            value={precioNoche}
            onChange={setPrecioNoche}
        />
        </div>
        
        <ButtonSection1/>

      </div>
    </>
  )
}