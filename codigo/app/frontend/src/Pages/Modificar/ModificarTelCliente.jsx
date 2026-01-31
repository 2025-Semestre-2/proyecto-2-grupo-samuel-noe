
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function ModificarTelCliente(){

  const [idTelCliente, setIdTelCliente] = useState('')
  const [idCliente, setIdCliente] = useState('')
  const [telefono, setTelefono] = useState('')
  const [codPais, setCodPais] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarTelCliente = () => {
    setIdTelCliente('')
    setIdCliente('')
    setTelefono('')
    setCodPais('')
    setValidado(false)
  }

  const validacionesTelCliente = () => {
  
    const idClienteValido = validarNull(idCliente, 'Identificación Cliente');
    if (!idClienteValido.esValido) {
      alert(idClienteValido.mensaje);
      return;
    }
    const telefonoValido = validarNull(telefono, 'Teléfono del Cliente');
    if (!telefonoValido.esValido) {
      alert(telefonoValido.mensaje);
      return;
    }
    const codPaisValido = validarNull(codPais, 'Código País');
    if (!codPaisValido.esValido) {
      alert(codPaisValido.mensaje);
      return;
    }

    const idClienteValido2 = validarInt(idCliente, 'Identificación Cliente');
    if (!idClienteValido2.esValido) {
      alert(idClienteValido2.mensaje);
      return;
    }
    const telefonoValido2 = validarInt(telefono, 'Teléfono del Cliente');
    if (!telefonoValido2.esValido) {
      alert(telefonoValido2.mensaje);
      return;
    }
    const codPaisValido2 = validarInt(codPais, 'Código País');
    if (!codPaisValido2.esValido) {
      alert(codPaisValido2.mensaje);
      return;
    }

    setValidado(true);
  }

  const mandarRequest = async () => {
    //codigo
    LimpiarTelCliente();
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
          <button onClick={() => {
            validacionesTelCliente()
            if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button onClick={LimpiarTelCliente}>Cancelar</button>
        </div>

      </div>
    </>
  )
}