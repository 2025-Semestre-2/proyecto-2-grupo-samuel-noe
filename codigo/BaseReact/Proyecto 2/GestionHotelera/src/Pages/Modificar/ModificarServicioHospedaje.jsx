
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function ModificarServicioHospedaje(){

  const [idServicioHotel, setIdServicioHotel] = useState('')
  const [idHotel, setIdHotel] = useState('')
  const [idServicio, setIdServicio] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarServicio = () => {
    setIdServicioHotel('')
    setIdHotel('')
    setIdServicio('')
    setValidado(false)
  }

  const validacionesServicio = () => {

    const idHotelValido = validarNull(idHotel, 'ID del Hotel');
    if (!idHotelValido.esValido) {
      alert(idHotelValido.mensaje);
      return;
    }
    const idServicioValido = validarNull(idServicio, 'ID del Servicio');
    if (!idServicioValido.esValido) {
      alert(idServicioValido.mensaje);
      return;
    }

    const idHotelValido2 = validarInt(idHotel, 'ID del Hotel');
    if (!idHotelValido2.esValido) {
      alert(idHotelValido2.mensaje);
      return;
    }
    const idServicioValido2 = validarInt(idServicio, 'ID del Servicio');
    if (!idServicioValido2.esValido) {
      alert(idServicioValido2.mensaje);
      return;
    }

    setValidado(true);
  }

  const mandarRequest = async () => {
    //codigo
    LimpiarServicio()
  }

  const verificarExistenciaServicio = async () => {
    if (!idServicioHotel) {
      alert('Ingresa un ID de Servicio Hospedaje');
      return;
    }
    try {
      //codigo
    } 
    catch (e) {
      alert('Servicio Hospedaje no encontrado: ' + e.message);
      console.error(e);
    }
  }

  return (
    <>
      <h1>Modificar Servicio Hospedaje</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>   

        <div className="form-group">
        <label>ID de Servicio Hospedaje: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idServicioHotel}
          onChange={setIdServicioHotel}
        />
        </div>
        <button onClick={verificarExistenciaServicio}>Buscar</button>
   
      </div>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>ID del Hotel: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idHotel}
          onChange={setIdHotel}
        />
        </div>
        
        <div className="form-group">
        <label>ID del Servicio: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idServicio}
          onChange={setIdServicio}
        />
        </div>

        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={() => {
            validacionesServicio()
            if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button onClick={LimpiarServicio}>Cancelar</button>
        </div>

      </div>
    </>
  )
}