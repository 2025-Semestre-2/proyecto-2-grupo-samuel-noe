
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt} from '../../Components/Validaciones'
import axios from 'axios'

export function ModificarEmpRecTipoServicio(){

  const [idEmpRecTipoServicio, setIdEmpRecTipoServicio] = useState('')
  const [idEmpRec, setIdEmpRec] = useState('')
  const [idTipoServicio, setIdTipoServicio] = useState('')
  const [validado, setValidado] = useState(false)

    //Limpia las casillas
    const LimpiarActividad = () => {
        setIdEmpRecTipoServicio('')
        setIdEmpRec('')
        setIdTipoServicio('')
        setValidado(false)
    }

    const validacionesActividad = () => {
    
        const idEmpRecValido = validarNull(idEmpRec, 'ID Empresa Recreacion');
        if (!idEmpRecValido.esValido) {
            alert(idEmpRecValido.mensaje);
            return;
        }
        const idTipoServicioValido = validarNull(idTipoServicio, 'ID Tipo Servicio');
        if (!idTipoServicioValido.esValido) {
            alert(idTipoServicioValido.mensaje);
            return;
        }

        const idEmpRecValido2 = validarInt(idEmpRec, 'ID Empresa Recreacion');
        if (!idEmpRecValido2.esValido) {
            alert(idEmpRecValido2.mensaje);
            return;
        }
        const idTipoServicioValido2 = validarInt(idTipoServicio, 'ID Tipo Servicio');
        if (!idTipoServicioValido2.esValido) {
            alert(idTipoServicioValido2.mensaje);
            return;
        }

        setValidado(true);
    }

    const mandarRequest = async () => {
        //codigo
        LimpiarActividad()
    }

  const verificarExistenciaActividad = async () => {
    if (!idEmpRecTipoServicio) {
      alert('Ingresa un ID de Empresa-Servicio');
      return;
    }
    try {
      //codigo
    } 
    catch (e) {
      alert('Empresa-Servicio no encontrada: ' + e.message);
      console.error(e);
    }
  }

    return (
    <>
      <h1>Modificar Empresa Recreacion Tipo Servicio</h1>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>   

      <div className="form-group">
      <label>ID de la Empresa Recreacion Tipo Servicio: </label>
      <Textbox
        type="text"
        placeholder=""
        value={idEmpRecTipoServicio}
        onChange={setIdEmpRecTipoServicio}
      />
      </div>
      <button onClick={verificarExistenciaActividad}>Buscar</button>
   
      </div>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>ID Empresa Recreacion: </label>
        <Textbox
            type="text"
            placeholder=""
            value={idEmpRec}
            onChange={setIdEmpRec}
        />
        </div>

        <div className="form-group">
        <label>ID Tipo Servicio: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={idTipoServicio}
            onChange={setIdTipoServicio}
        />
        </div>

        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={() => {
              validacionesActividad()
              if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button onClick={LimpiarActividad}>Cancelar</button>
        </div>

      </div>
    </>
  )
}