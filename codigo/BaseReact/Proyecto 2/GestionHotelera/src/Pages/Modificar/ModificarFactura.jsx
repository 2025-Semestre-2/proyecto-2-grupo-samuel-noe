
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function ModificarFactura(){

  const [idReserva, setIdReserva] = useState('')
  const [fechaEmision, setFechaEmision] = useState('')
  const [metodoPago, setMetodoPago] = useState('')
  const [cantNoches, setCantNoches] = useState('')
  const [importeTotal, setImporteTotal] = useState('')

  return (
    <>
      <h1>Modificar Factura</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>ID Reserva: </label>
        <Textbox
            type="text"
            placeholder=""
            value={idReserva}
            onChange={setIdReserva}
        />
        </div>

        <div className="form-group">
        <label>Fecha Emisión: </label>
        <Textbox
            type="text"
            placeholder=""
            value={fechaEmision}
            onChange={setFechaEmision}
        />
        </div>

        <div className="form-group">
        <label>Método de Pago: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={metodoPago}
            onChange={setMetodoPago}
        />
        </div>

        <div className="form-group">
        <label>Cantidad de Noches: </label>
        <Textbox
            type="text"
            placeholder=""
            value={cantNoches}
            onChange={setCantNoches}
        />
        </div>

        <div className="form-group">
        <label>Importe Total: </label>
        <Textbox
            type="text"
            placeholder=""
            value={importeTotal}
            onChange={setImporteTotal}
        />
        </div>
        
        <ButtonSection1/>

      </div>
    </>
  )
}