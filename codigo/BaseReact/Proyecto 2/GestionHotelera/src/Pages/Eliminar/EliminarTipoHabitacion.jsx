
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function EliminarTipoHabitacion(){

  const [idHotel, setIdHotel] = useState('')
  const [nombre, setNombre] = useState('')
  const [desc, setDesc] = useState('')
  const [tipoCama, setTipoCama] = useState('')
  const [precioNoche, setPrecioNoche] = useState('')

  return (
    <>
      <h1>Eliminar Tipo Habitación</h1>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>ID del Hotel: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={idHotel}
            onChange={setIdHotel}
        />
        </div>

        <div className="form-group">
        <label>Nombre: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
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

        <div className="form-group">
        <label>Tipo de Cama: </label>
        <TextboxBlock
            type="text"
            placeholder=""  
            value={tipoCama}
            onChange={setTipoCama}
        />
        </div>

        <div className="form-group">
        <label>Precio por noche: </label>
        <TextboxBlock
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