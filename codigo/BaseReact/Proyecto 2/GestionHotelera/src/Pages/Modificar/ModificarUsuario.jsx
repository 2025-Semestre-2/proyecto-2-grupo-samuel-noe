
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function ModificarUsuario(){

  const [usuario, setUsuario] = useState('')
  const [contra, setContra] = useState('')

  return (
    <>
      <h1>Modificar Usuario</h1>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Nombre de Usuario: </label>
        <Textbox
            type="text"
            placeholder=""
            value={usuario}
            onChange={setUsuario}
        />
        </div>

        <div className="form-group">
        <label>Contraseña: </label>
        <Textbox
            type="text"
            placeholder=""
            value={contra}
            onChange={setContra}
        />
        </div>

        <ButtonSection1/>

      </div>
    </>
  )
}