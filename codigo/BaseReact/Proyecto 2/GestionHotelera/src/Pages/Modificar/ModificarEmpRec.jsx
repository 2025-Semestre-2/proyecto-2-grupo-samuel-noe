
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull} from '../../Components/Validaciones'
import axios from 'axios'

export function ModificarEmpRec(){

    const [idEmpRec, setIdEmpRec] = useState('')
    const [nombre, setNombre] = useState('')
    const [cedulaJuridica, setCedulaJuridica] = useState('')
    const [correo, setCorreo] = useState('')
    const [telefono, setTelefono] = useState('')
    const [nombreContacto, setNombreContacto] = useState('')
    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [seniasExactas, setSeniasExactas] = useState('')
    const [validado, setValidado] = useState(false)

    //Limpia las casillas
    const LimpiarEmpRec = () => {
        setIdEmpRec('')
        setNombre('')
        setCedulaJuridica('')
        setCorreo('')
        setTelefono('')
        setNombreContacto('')
        setProvincia('')
        setCanton('')
        setDistrito('')
        setSeniasExactas('')
        setValidado(false)
    }

    const validacionesEmpRec = () => {
    
        const nombreValido = validarNull(nombre, 'Nombre de la Empresa');
        if (!nombreValido.esValido) {
            alert(nombreValido.mensaje);
            return;
        }
        const cedulaValido = validarNull(cedulaJuridica, 'Cédula Jurídica');
        if (!cedulaValido.esValido) {
            alert(cedulaValido.mensaje);
            return;
        }
        const correoValido = validarNull(correo, 'Correo Electrónico');
        if (!correoValido.esValido) {
            alert(correoValido.mensaje);
            return;
        }
        const telefonoValido = validarNull(telefono, 'Teléfono');
        if (!telefonoValido.esValido) {
            alert(telefonoValido.mensaje);
            return;
        }
        const nombreContactoValido = validarNull(nombreContacto, 'Nombre Contacto');
        if (!nombreContactoValido.esValido) {
            alert(nombreContactoValido.mensaje);
            return;
        }
        const provinciaValido = validarNull(provincia, 'Provincia');
        if (!provinciaValido.esValido) {
            alert(provinciaValido.mensaje);
            return;
        }
        const cantonValido = validarNull(canton, 'Canton');
        if (!cantonValido.esValido) {
            alert(cantonValido.mensaje);
            return;
        }
        const distritoValido = validarNull(distrito, 'Distrito');
        if (!distritoValido.esValido) {
            alert(distritoValido.mensaje);
            return;
        }
        
        setValidado(true);
    }

    const mandarRequest = async () => {
        //codigo
        LimpiarEmpRec()
    }

    const verificarExistenciaEmpRec = async () => {
        if (!idEmpRec) {
            alert('Ingresa un ID de Empresa de Recreación');
            return;
        }
        try {
            //codigo
        } 
        catch (e) {
            alert('Empresa de Recreación no encontrada: ' + e.message);
            console.error(e);
        }
    }

    return (
    <>
      <h1>Modificar Empresa de Recreación</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>   

        <div className="form-group">
        <label>ID de la Empresa de Recreación: </label>
        <Textbox
            type="text"
            placeholder=""
            value={idEmpRec}
            onChange={setIdEmpRec}
        />
        </div>
        <button onClick={verificarExistenciaEmpRec}>Buscar</button>
   
      </div>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Nombre de la Empresa: </label>
        <Textbox
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
        />
        </div>

        <div className="form-group">
        <label>Cédula Jurídica: </label>
        <Textbox
            type="text"
            placeholder=""
            value={cedulaJuridica}
            onChange={setCedulaJuridica}
        />
        </div>

        <div className="form-group">
        <label>Correo Electrónico: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={correo}
            onChange={setCorreo}
        />
        </div>

        <div className="form-group">
        <label>Teléfono: </label>
        <Textbox
            type="text"
            placeholder=""
            value={telefono}
            onChange={setTelefono}
        />
        </div>

        <div className="form-group">
        <label>Nombre Contacto: </label>
        <Textbox
            type="text"
            placeholder=""
            value={nombreContacto}
            onChange={setNombreContacto}
        />
        </div>

        <div className="form-group">
        <label>Provincia: </label>
        <Textbox
            type="text"
            placeholder=""
            value={provincia}
            onChange={setProvincia}
        />
        </div>

        <div className="form-group">
        <label>Distrito: </label>
        <Textbox
            type="text"
            placeholder=""
            value={distrito}
            onChange={setDistrito}
        />
        </div>

        <div className="form-group">
        <label>Señas Exactas: </label>
        <Textbox
            type="text"
            placeholder=""
            value={seniasExactas}
            onChange={setSeniasExactas}
        />
        
        </div>
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
            <button onClick={() => {
                validacionesEmpRec()
                if(validado){mandarRequest()}
            }}>Aceptar</button>
          <button onClick={LimpiarEmpRec}>Cancelar</button>
        </div>

      </div>
    </>
  )
}