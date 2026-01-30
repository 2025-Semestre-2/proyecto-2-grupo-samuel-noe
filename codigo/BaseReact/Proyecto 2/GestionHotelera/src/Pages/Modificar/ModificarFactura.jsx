
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function ModificarFactura(){

  const [idFactura, setIdFactura] = useState('')
  const [idReserva, setIdReserva] = useState('')
  const [fechaEmision, setFechaEmision] = useState('')
  const [metodoPago, setMetodoPago] = useState('')
  const [cantNoches, setCantNoches] = useState('')
  const [importeTotal, setImporteTotal] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarFactura = () => {
    setIdFactura('')
    setIdReserva('')
    setFechaEmision('')
    setMetodoPago('')
    setCantNoches('')
    setImporteTotal('')
    setValidado(false)
  }

  const validacionesFactura = () => {
  
    const idReservaValido = validarNull(idReserva, 'ID Reserva');
    if (!idReservaValido.esValido) {
        alert(idReservaValido.mensaje);
        return;
    }
    const fechaValido = validarNull(fechaEmision, 'Fecha Emisión');
    if (!fechaValido.esValido) {
        alert(fechaValido.mensaje);
        return;
    }
    const metodoPagoValido = validarNull(metodoPago, 'Método de Pago');
    if (!metodoPagoValido.esValido) {
        alert(metodoPagoValido.mensaje);
        return;
    }
    const numNochesValido = validarNull(cantNoches, 'Cantidad de Noches');
    if (!numNochesValido.esValido) {
        alert(numNochesValido.mensaje);
        return;
    }
    const importeTotalValido = validarNull(importeTotal, 'Importe Total');
    if (!importeTotalValido.esValido) {
        alert(importeTotalValido.mensaje);
        return;
    }

    const idReservaValido2 = validarInt(idReserva, 'ID Reserva');
    if (!idReservaValido2.esValido) {
        alert(idReservaValido2.mensaje);
        return;
    }
    const numNochesValido2 = validarInt(cantNoches, 'Cantidad de Noches');
    if (!numNochesValido2.esValido) {
        alert(numNochesValido2.mensaje);
        return;
    }

    //Validacion decimal?

    setValidado(true);
  }

  const mandarRequest = async () => {
    //codigo
    LimpiarFactura()
  }

  const verificarExistenciaFactura = async () => {
    if (!idFactura) {
      alert('Ingresa un ID de Factura');
      return;
    }
    try {
    //codigo
    } 
    catch (e) {
      alert('Factura no encontrada: ' + e.message);
      console.error(e);
    }
  }

  return (
    <>
      <h1>Modificar Factura</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>   

        <div className="form-group">
        <label>ID de Factura: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idFactura}
          onChange={setIdFactura}
        />
        </div>
        <button onClick={verificarExistenciaFactura}>Buscar</button>
   
      </div>

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
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={() => {
            validacionesFactura()
            if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button onClick={LimpiarFactura}>Cancelar</button>
        </div>

      </div>
    </>
  )
}