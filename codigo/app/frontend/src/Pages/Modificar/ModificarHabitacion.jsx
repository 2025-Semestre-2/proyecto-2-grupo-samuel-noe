
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function ModificarHabitacion(){

  const [idHab, setIdHab] = useState('')
  const [idTipoHab, setIdTipoHab] = useState('')
  const [numHab, setNumHab] = useState('')
  const [estado, setEstado] = useState('')
  const [validado, setValidado] = useState(false)
  
  const LimpiarHabitacion = () => {
    setIdHab('')
    setIdTipoHab('')
    setNumHab('')
    setEstado('')
    setValidado(false)
  }
  
  const validacionesHabitacion = () => {
  
    const idTipoHabValido = validarNull(idTipoHab, 'Identificación Tipo Habitación');
    if (!idTipoHabValido.esValido) {
      alert(idTipoHabValido.mensaje);
      return;
    }
    const numHabValido = validarNull(numHab, 'Número de Habitación');
    if (!numHabValido.esValido) {
      alert(numHabValido.mensaje);
      return;
    }
    const estadoValido = validarNull(estado, 'Estado');
    if (!estadoValido.esValido) {
      alert(estadoValido.mensaje);
      return;
    }

    const idTipoHabValido2 = validarInt(idTipoHab, 'Identificación Tipo Habitación');
    if (!idTipoHabValido2.esValido) {
      alert(idTipoHabValido2.mensaje);
      return;
    }
    const numHabValido2 = validarInt(numHab, 'Número de Habitación');
    if (!numHabValido2.esValido) {
      alert(numHabValido2.mensaje);
      return;
    }

    setValidado(true);
  }
  
  const mandarRequest = async () => {
    LimpiarHabitacion()
  }

  const verificarExistenciaHabitacion = async () => {
    if (!idHab) {
      alert('Ingresa un ID de Habitación');
      return;
    }
    try {
    } 
    catch (e) {
      alert('Habitación no encontrada: ' + e.message);
      console.error(e);
    }
  }

  return (
    <>
      <h1>Modificar Habitación</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>   

        <div className="form-group">
        <label>ID de Habitación: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idHab}
          onChange={setIdHab}
        />
        </div>
        <button onClick={verificarExistenciaHabitacion}>Buscar</button>
   
      </div>

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
          <button onClick={() => {
            validacionesHabitacion()
            if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button onClick={LimpiarHabitacion}>Cancelar</button>
        </div>

      </div>
    </>
  )
}