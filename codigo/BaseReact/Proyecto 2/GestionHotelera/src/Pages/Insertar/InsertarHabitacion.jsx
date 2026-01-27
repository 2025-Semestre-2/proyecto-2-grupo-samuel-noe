
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from "../../Components/Validaciones"

export function InsertarHabitacion(){

  const [idTipoHab, setIdTipoHab] = useState('')
  const [numHab, setNumHab] = useState('')
  const [estado, setEstado] = useState('')

  const handleAceptar = () => {
    const auxNull1 = validarNull(idTipoHab, 'ID Tipo Habitación')
    if (!auxNull1.boolVali) 
      return alert(auxNull1.mensaje)

    const auxInt = validarInt(numHab, 'Número de Habitación')
    if (!auxInt.boolVali) 
      return alert(auxInt.mensaje)

    const auxNull2 = validarNull(estado, 'Estado')
    if (!auxNull2.boolVali) 
      return alert(auxNull2.mensaje)

  }

  return (
    <>
      <h1>Insertar Habitacion</h1>

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
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={handleAceptar}>Aceptar</button>
          <button>Cancelar</button>
        </div>

      </div>
    </>
  )
}