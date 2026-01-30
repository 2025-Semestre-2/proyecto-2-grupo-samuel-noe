
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function ModificarReservacion(){

  const [idReserva, setIdReserva] = useState('')
  const [idCliente, setIdCliente] = useState('')
  const [idHab, setIdHab] = useState('')
  const [fechaIngreso, setFechaIngreso] = useState('')
  const [fechaSalida, setFechaSalida] = useState('')
  const [cantPersonas, setCantPersonas] = useState('')
  const [vehiculo, setVehiculo] = useState('')
  const [estado, setEstado] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarReservacion = () => {
    setIdReserva('')
    setIdCliente('')
    setIdHab('')
    setFechaIngreso('')
    setFechaSalida('')
    setCantPersonas('')
    setVehiculo('')
    setEstado('')
    setValidado(false)
  }

  const validacionesReservacion = () => {
  
    const idClienteValido = validarNull(idCliente, 'Identificación Cliente');
    if (!idClienteValido.esValido) {
      alert(idClienteValido.mensaje);
      return;
    }
    const idHabValido = validarNull(idHab, 'ID de la Habitación');
    if (!idHabValido.esValido) {
      alert(idHabValido.mensaje);
      return;
    }
    const fechaIngresoValido = validarNull(fechaIngreso, 'Fecha Ingreso');
    if (!fechaIngresoValido.esValido) {
      alert(fechaIngresoValido.mensaje);
      return;
    }
    const fechaSalidaValido = validarNull(fechaSalida, 'Fecha Salida');
    if (!fechaSalidaValido.esValido) {
      alert(fechaSalidaValido.mensaje);
      return;
    }
    const cantidadPersonasValido = validarNull(cantPersonas, 'Cantidad de Personas');
    if (!cantidadPersonasValido.esValido) {
      alert(cantidadPersonasValido.mensaje);
      return;
    }
    const poseeVehiculoValido = validarNull(vehiculo, 'Posee Vehículo');
    if (!poseeVehiculoValido.esValido) {
      alert(poseeVehiculoValido.mensaje);
      return;
    }
    const estadoValido = validarNull(estado, 'Estado');
    if (!estadoValido.esValido) {
      alert(estadoValido.mensaje);
      return;
    }

    const idClienteValido2 = validarInt(idCliente, 'Identificación Cliente');
    if (!idClienteValido2.esValido) {
      alert(idClienteValido2.mensaje);
      return;
    }
    const idHabitacionValido2 = validarInt(idHab, 'ID de la Habitación');
    if (!idHabitacionValido2.esValido) {
      alert(idHabitacionValido2.mensaje);
      return;
    }
    const cantidadPersonasValido2 = validarInt(cantPersonas, 'Cantidad de Personas');
    if (!cantidadPersonasValido2.esValido) {
      alert(cantidadPersonasValido2.mensaje);
      return;
    }

    //Validacion bit?

    setValidado(true);
  }

  const mandarRequest = async () => {
    //codigo
    LimpiarReservacion()
  }

  const verificarExistenciaReserva = async () => {
    if (!idReserva) {
      alert('Ingresa un ID de Reservación');
      return;
    }
    try {
      //codigo
    } 
    catch (e) {
      alert('Reservación no encontrada: ' + e.message);
      console.error(e);
    }
  }

  return (
    <>
      <h1>Modificar Reservación</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>   

        <div className="form-group">
        <label>ID de Reservación: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idReserva}
          onChange={setIdReserva}
        />
        </div>
        <button onClick={verificarExistenciaReserva}>Buscar</button>
   
      </div>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>ID del Cliente: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idCliente}
          onChange={setIdCliente}
        />
        </div>

        <div className="form-group">
        <label>ID de la Habitación: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idHab}
          onChange={setIdHab}
        />
        </div>

        <div className="form-group">
        <label>Fecha Ingreso: </label>
        <Textbox
          type="text"
          placeholder=""  
          value={fechaIngreso}
          onChange={setFechaIngreso}
        />
        </div>

        <div className="form-group">
        <label>Fecha Salida: </label>
        <Textbox
          type="text"
          placeholder=""
          value={fechaSalida}
          onChange={setFechaSalida}
        />
        </div>

        <div className="form-group">
        <label>Cantidad de Personas: </label>
        <Textbox
          type="text"
          placeholder=""
          value={cantPersonas}
          onChange={setCantPersonas}
        />
        </div>

        <div className="form-group">
        <label>Posee Vehículo: </label>
        <Textbox
          type="text"
          placeholder=""
          value={vehiculo}
          onChange={setVehiculo}
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
            validacionesReservacion()
            if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button onClick={LimpiarReservacion}>Cancelar</button>
        </div>

      </div>
    </>
  )
}