
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function ModificarActividad(){

  const [idEmpRec, setIdEmpRec] = useState('')
  const [tipo, setTipo] = useState('')
  const [desc, setDesc] = useState('')
  const [precio, setPrecio] = useState('')

  return (
    <>
      <h1>Modificar Actividad</h1>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>ID Empresa Recreación: </label>
        <Textbox
            type="text"
            placeholder=""
            value={idEmpRec}
            onChange={setIdEmpRec}
        />
        </div>

        <div className="form-group">
        <label>Tipo de actividad: </label>
        <Textbox
            type="text"
            placeholder=""
            value={tipo}
            onChange={setTipo}
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
        <label>Precio: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={precio}
            onChange={setPrecio}
        />
        </div>

        <ButtonSection1/>

      </div>
    </>
  )
}