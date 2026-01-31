
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { validarNull, validarInt} from '../../Components/Validaciones'
import axios from 'axios'

export function EliminarEmpRecTipoAct(){

  const [idEmpRecTipoAct, setIdEmpRecTipoAct] = useState('')
  const [idEmpRec, setIdEmpRec] = useState('')
  const [idActividad, setIdActividad] = useState('')
  const [validado, setValidado] = useState(false)

    const LimpiarActividad = () => {
        setIdEmpRecTipoAct('')
        setIdEmpRec('')
        setIdActividad('')
        setValidado(false)
    }

    const validacionesActividad = () => {
    
        const idEmpRecValido = validarNull(idEmpRec, 'ID Empresa Recreacion');
        if (!idEmpRecValido.esValido) {
            alert(idEmpRecValido.mensaje);
            return;
        }
        const idActividadValido = validarNull(idActividad, 'ID Actividad');
        if (!idActividadValido.esValido) {
            alert(idActividadValido.mensaje);
            return;
        }

        const idEmpRecValido2 = validarInt(idEmpRec, 'ID Empresa Recreacion');
        if (!idEmpRecValido2.esValido) {
            alert(idEmpRecValido2.mensaje);
            return;
        }
        const idActividadValido2 = validarInt(idActividad, 'ID Actividad');
        if (!idActividadValido2.esValido) {
            alert(idActividadValido2.mensaje);
            return;
        }

        setValidado(true);
    }

    const mandarRequest = async () => {
        LimpiarActividad()
    }

  const verificarExistenciaActividad = async () => {
    if (!idEmpRecTipoAct) {
      alert('Ingresa un ID de Empresa-Actividad');
      return;
    }
    try {
    } 
    catch (e) {
      alert('Empresa-Actividad no encontrada: ' + e.message);
      console.error(e);
    }
  }

    return (
    <>
      <h1>Eliminar Empresa Recreacion Tipo Actividad</h1>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>   

      <div className="form-group">
      <label>ID de la Empresa Recreacion Tipo Actividad: </label>
      <Textbox
        type="text"
        placeholder=""
        value={idEmpRecTipoAct}
        onChange={setIdEmpRecTipoAct}
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
        <TextboxBlock
            type="text"
            placeholder=""
            value={idEmpRec}
            onChange={setIdEmpRec}
        />
        </div>

        <div className="form-group">
        <label>ID Actividad: </label>
        <TextboxBlock
            type="text"
            placeholder=""  
            value={idActividad}
            onChange={setIdActividad}
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