
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import axios from 'axios'

export function ModificarTelCliente(){

  const [idTelCliente, setIdTelCliente] = useState('')
  const [idCliente, setIdCliente] = useState('')
  const [telefono, setTelefono] = useState('')
  const [codPais, setCodPais] = useState('')

  //Limpia las casillas
  const LimpiarTelCliente = () => {
    setIdTelCliente('')
    setIdCliente('')
    setTelefono('')
    setCodPais('')
  }

  const mandarRequest = async () => {
    try {
      await axios.put(`http://localhost:3000/api/cliente-telefono/${idTelCliente}`, {
      IdCliente: idCliente,
      NumeroTelefono: telefono,
      CodigoPais: codPais,
    });
    alert(' Modificado correctamente');
    LimpiarTelCliente();
    } 
    catch (e) {
      alert(' Error al modificar: ' + (e?.response?.data?.message || e.message));
      console.error(e);
    }
  }

  const verificarExistenciaTelCliente = async () => {
    if (!idTelCliente) {
      alert('Ingresa un ID de teléfono cliente');
      return;
    }
    try {
      //Buscamos el Teléfono Cliente por su ID
      const response = await axios.get('http://localhost:3000/api/cliente-telefono');
      const lista = response.data?.data ?? []
      const telcliente = lista.find(c => String(c.IdTelefonoCliente) === String(idTelCliente));

      if (!telcliente) {
        alert('Telefono Cliente no encontrado')
        return
      }

      setIdCliente(telcliente.IdCliente || '')
      setTelefono(telcliente.NumeroTelefono || telcliente.Telefono || '')
      setCodPais(telcliente.CodigoPais || '')
      alert('Telefono Cliente encontrado')
    } 
    catch (e) {
      alert('Telefono Cliente no encontrado: ' + e.message)
      console.error(e);
    }
  }

  return (
    <>
      <h1>Modificar Teléfono de Cliente</h1>
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>   

        <div className="form-group">
        <label>ID del Teléfono Cliente: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idTelCliente}
          onChange={setIdTelCliente}
        />
        </div>
        <button onClick={verificarExistenciaTelCliente}>Buscar</button>

      </div>
      
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
          type="text"
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