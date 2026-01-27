
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function EliminarReservacion(){

  const [idCliente, setIdCliente] = useState('')
  const [idHab, setIdHab] = useState('')
  const [fechaIngreso, setFechaIngreso] = useState('')
  const [fechaSalida, setFechaSalida] = useState('')
  const [cantPersonas, setCantPersonas] = useState('')
  const [vehiculo, setVehiculo] = useState('')

  return (
    <>
      <h1>Eliminar Reservación</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>ID del Cliente: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={idCliente}
            onChange={setIdCliente}
        />
        </div>

        <div className="form-group">
        <label>ID de la Habitación: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={idHab}
            onChange={setIdHab}
        />
        </div>

        <div className="form-group">
        <label>Fecha Ingreso: </label>
        <TextboxBlock
            type="text"
            placeholder=""  
            value={fechaIngreso}
            onChange={setFechaIngreso}
        />
        </div>

        <div className="form-group">
        <label>Fecha Salida: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={fechaSalida}
            onChange={setFechaSalida}
        />
        </div>

        <div className="form-group">
        <label>Cantidad de Personas: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={cantPersonas}
            onChange={setCantPersonas}
        />
        </div>

        <div className="form-group">
        <label>Posee Vehículo: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={vehiculo}
            onChange={setVehiculo}
        />
        </div>

        <ButtonSection1/>

      </div>
    </>
  )
}