
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function EliminarTelHotel(){

  const [idTelefono, setIdTelefono] = useState('')
  const [idHospedaje, setIdHospedaje] = useState('')
  const [telefono, setTelefono] = useState('')
  const [codPais, setCodPais] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarTelHotel = () => {
    setIdTelefono('')
    setIdHospedaje('')
    setCodPais('')
    setTelefono('')
    setValidado(false)
  }

  const validacionesTelHotel = () => {
    
    const idHospedajeValido = validarNull(idHospedaje, 'Identificación Hospedaje');
    if (!idHospedajeValido.esValido) {
      alert(idHospedajeValido.mensaje);
      return;
    }
    const codigoValido = validarNull(codPais, 'Código País');
    if (!codigoValido.esValido) {
      alert(codigoValido.mensaje);
      return;
    }
    const numeroValido = validarNull(telefono, 'Número de Teléfono');
    if (!numeroValido.esValido) {
      alert(numeroValido.mensaje);
      return;
    }

    const idHospedajeValido2 = validarInt(IdHospedaje, 'Identificación Hospedaje');
    if (!idHospedajeValido2.esValido) {
      alert(idHospedajeValido2.mensaje);
      return;
    }
    const codigoValido2 = validarNull(codPais, 'Código País');
    if (!codigoValido2.esValido) {
      alert(codigoValido2.mensaje);
      return;
    }
    const numeroValido2 = validarNull(telefono, 'Número de Teléfono');
    if (!numeroValido2.esValido) {
      alert(numeroValido2.mensaje);
      return;
    }

    setValidado(true);
  }

  const mandarRequest = async () => {
    //Codigo 
    
    LimpiarTelHotel()
  }

  const verificarExistenciaTelefono = async () => {
    if (!idTelefono) {
      alert('Ingresa un ID de Teléfono');
      return;
    }
    try {
      //codigo
    } 
    catch (e) {
      alert('Teléfono no encontrado: ' + e.message);
      console.error(e);
    }
  }

  return (
    <>
      <h1>Eliminar Teléfono de Hotel</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>   

        <div className="form-group">
        <label>ID de Teléfono: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idTelefono}
          onChange={setIdTelefono}
        />
        </div>
        <button onClick={verificarExistenciaTelefono}>Buscar</button>
   
      </div>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Identificación Hospedaje: </label>
        <TextboxBlock
          type="text"
          placeholder=""
          value={idHospedaje}
          onChange={setIdHospedaje}
        />
        </div>

        <div className="form-group">
        <label>Teléfono del Hotel: </label>
        <TextboxBlock
          type="text"
          placeholder=""
          value={telefono}
          onChange={setTelefono}
        />
        </div>

        <div className="form-group">
        <label>Código País: </label>
        <TextboxBlock
          type="text"
          placeholder=""
          value={codPais}
          onChange={setCodPais}
        />
        </div> 
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={() => {
            validacionesTelHotel()
            if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button>Cancelar</button>
        </div>

      </div>
    </>
  )
}