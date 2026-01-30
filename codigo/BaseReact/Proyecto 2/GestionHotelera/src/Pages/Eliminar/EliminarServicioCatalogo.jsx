
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function EliminarServicioCatalogo(){

  const [idServicio, setIdServicio] = useState('')
  const [nombre, setNombre] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarServicio = () => {
    setIdServicio('')
    setNombre('')
    setValidado(false)
  }

  const validacionesServicio = () => {

    const nombreValido = validarNull(nombre, 'Nombre del Servicio');
    if (!nombreValido.esValido) {
      alert(nombreValido.mensaje);
      return;
    }

    setValidado(true);
  }

  const mandarRequest = async () => {
    //codigo
    LimpiarServicio()
  }

  const verificarExistenciaServicio = async () => {
    if (!idServicio) {
      alert('Ingresa un ID de Servicio');
      return;
    }
    try {
      //codigo
    } 
    catch (e) {
      alert('Servicio no encontrado: ' + e.message);
      console.error(e);
    }
  }

  return (
    <>
      <h1>Eliminar Servicio Catálogo</h1>
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>   

        <div className="form-group">
        <label>ID de Servicio: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idServicio}
          onChange={setIdServicio}
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
        <label>Nombre del Servicio: </label>
        <TextboxBlock
          type="text"
          placeholder=""
          value={nombre}
          onChange={setNombre}
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