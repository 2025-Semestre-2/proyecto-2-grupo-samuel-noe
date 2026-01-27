
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import axios from 'axios'

export function InsertarTelCliente(){

  const [idCliente, setIdCliente] = useState('')
  const [telefono, setTelefono] = useState('')
  const [codPais, setCodPais] = useState('')

  //Limpia las casillas
  const LimpiarTelCliente = () => {
    setIdCliente('')
    setTelefono('')
    setCodPais('')
  }

  const mandarRequest = async () => {

    try {
      if (!idCliente || !telefono || !codPais) {
        alert('Completa IdCliente, Código País y Teléfono');
        return;
      }

      await axios.post('http://localhost:3000/api/cliente-telefono', {
        IdCliente: parseInt(idCliente),
        NumeroTelefono: parseInt(telefono),
        CodigoPais: parseInt(codPais)
      })
      alert(' Insertado correctamente')
      LimpiarTelCliente()
    } 
    catch (e) {
      alert(' Error al insertar: ' + (e?.response?.data?.message || e.message))
      console.error(e)
    }
  }

  return (
    <>
      <h1>Insertar Teléfono de Cliente</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Identificación Cliente: </label>
        <Textbox
            type="text"
            placeholder=""
            value={idCliente}
            onChange={setIdCliente}
        />
        </div>

        <div className="form-group">
        <label>Teléfono del Cliente: </label>
        <Textbox
          type="tel"
            placeholder=""
            value={telefono}
            onChange={setTelefono}
        />
        </div>

        <div className="form-group">
        <label>Código País: </label>
        <Textbox
          type="text"
            placeholder=""
            value={codPais}
            onChange={setCodPais}
        />
        </div> 
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={mandarRequest}>Aceptar</button>
          <button onClick={LimpiarTelCliente}>Cancelar</button>
        </div>

      </div>
    </>
  )
}