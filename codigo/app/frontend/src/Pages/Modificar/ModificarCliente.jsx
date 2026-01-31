
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarInt, validarNull } from '../../Components/Validaciones'
import axios from 'axios'

export function ModificarCliente(){

    const [idCliente, setIdCliente] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido1, setApellido1] = useState('')
    const [apellido2, setApellido2] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [tipoIdentificacion, setTipoIdentificacion] = useState('')
    const [identificacion, setIdentificacion] = useState('')
    const [paisResidencia, setPaisResidencia] = useState('')
    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [correo, setCorreo] = useState('')
    const [validado, setValidado] = useState(false)

    //Limpia las casillas
    const LimpiarCliente = () => {
        setIdCliente('')
        setNombre('')
        setApellido1('')
        setApellido2('')
        setFechaNacimiento('')
        setTipoIdentificacion('')
        setIdentificacion('')
        setPaisResidencia('')
        setProvincia('')
        setCanton('')
        setDistrito('')
        setCorreo('')
        setValidado(false)
    }

    const validacionesCliente = () => {
     
        const idClienteValido = validarNull(idCliente, 'ID Cliente');
        if (!idClienteValido.esValido) {
            alert(idClienteValido.mensaje);
            return;
        }
        const nombreValido = validarNull(nombre, 'Nombre Cliente');
        if (!nombreValido.esValido) {
            alert(nombreValido.mensaje);
            return;
        }
        const apellido1Valido = validarNull(apellido1, 'Primer Apellido');
        if (!apellido1Valido.esValido) {
            alert(apellido1Valido.mensaje);
            return;
        }
        const fechaValida = validarNull(fechaNacimiento, 'Fecha de Nacimiento');
        if (!fechaValida.esValido) {
            alert(fechaValida.mensaje);
            return;
        }
        const tipoValido = validarNull(tipoIdentificacion, 'Tipo Identificación');
        if (!tipoValido.esValido) {
            alert(tipoValido.mensaje);
            return;
        }
        const numeroValido = validarNull(identificacion, 'Número de Identificación');
        if (!numeroValido.esValido) {
            alert(numeroValido.mensaje);
            return;
        }
        const paisValido = validarNull(paisResidencia, 'País de Residencia');
        if (!paisValido.esValido) {
            alert(paisValido.mensaje);
            return;
        }
        const correoValido = validarNull(correo, 'Correo Electrónico');
        if (!correoValido.esValido) {
            alert(correoValido.mensaje);
            return;
        }

        const idClienteValido2 = validarInt(idCliente, 'ID Cliente');
        if (!idClienteValido2.esValido) {
            alert(idClienteValido2.mensaje);
            return;
        }

        setValidado(true);
    }

    const mandarRequest = async () => {
        try {
            let fechaNacimientoISO = fechaNacimiento
            //Para enviar solo la fecha sin el tiempo
            ? new Date(fechaNacimiento).toISOString().split('T')[0]
            : null;

            await axios.put(`http://localhost:3000/api/cliente/${idCliente}`, {
                Nombre: nombre,
                PrimerApellido: apellido1,
                SegundoApellido: apellido2,
                FechaNacimiento: fechaNacimientoISO,
                TipoIdentificacion: tipoIdentificacion,
                NumeroIdentificacion: identificacion,
                PaisResidencia: paisResidencia,
                Provincia: provincia,
                Canton: canton,
                Distrito: distrito,
                CorreoElectronico: correo
            });
            alert(' Modificado correctamente');
            LimpiarCliente();
        } 
        catch (e) {
            alert(' Error al modificar: ' + (e?.response?.data?.message || e.message));
            console.error(e);
        }
    }
    
    const verificarExistenciaCliente = async () => {
        if (!idCliente) {
            alert('Ingresa un ID de cliente');
            return;
        }
        try {
            //Buscamos el Teléfono Cliente por su ID
            const response = await axios.get('http://localhost:3000/api/cliente');
            const lista = response.data?.data ?? [];
            const cliente = lista.find(c => String(c.IdCliente) === String(idCliente));

            if (!cliente) {
                alert('Cliente no encontrado');
                return;
            }

            setNombre(cliente.Nombre || '');
            setApellido1(cliente.PrimerApellido || '');
            setApellido2(cliente.SegundoApellido || '');
            setFechaNacimiento(cliente.FechaNacimiento || '');
            setTipoIdentificacion(cliente.TipoIdentificacion || '');
            setIdentificacion(cliente.NumeroIdentificacion || '');
            setPaisResidencia(cliente.PaisResidencia || '');
            setProvincia(cliente.Provincia || '');
            setCanton(cliente.Canton || '');
            setDistrito(cliente.Distrito || '');
            setCorreo(cliente.CorreoElectronico || '');
            alert('Cliente encontrado');
        } 
        catch (e) {
            alert('Cliente no encontrado: ' + e.message);
            console.error(e);
        }
    }

    return (
    <>
      <h1>Modificar Cliente</h1>
      
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
        <button onClick={verificarExistenciaCliente}>Buscar</button>
   
      </div>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Nombre del Cliente: </label>
        <Textbox
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
        />
        </div>

        <div className="form-group">
        <label>Apellido 1: </label>
        <Textbox
            type="text"
            placeholder=""
            value={apellido1}
            onChange={setApellido1}
        />
        </div>

        <div className="form-group">
        <label>Apellido 2: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={apellido2}
            onChange={setApellido2}
        />
        </div>

        <div className="form-group">
        <label>Fecha de Nacimiento: </label>
        <Textbox
            type="date"
            placeholder=""  
            value={fechaNacimiento}
            onChange={setFechaNacimiento}
        />
        </div>

        <div className="form-group">
        <label>Tipo de Identificación: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={tipoIdentificacion}
            onChange={setTipoIdentificacion}
        />
        </div>

        <div className="form-group">
        <label>Identificación: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={identificacion}
            onChange={setIdentificacion}
        />
        </div>

        <div className="form-group">
        <label>País de Residencia: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={paisResidencia}
            onChange={setPaisResidencia}
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
        <label>Cantón: </label>
        <Textbox
            type="text"
            placeholder=""
            value={canton}
            onChange={setCanton}
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
        <label>País de Residencia: </label>
        <Textbox
            type="text"
            placeholder=""
            value={paisResidencia}
            onChange={setPaisResidencia}
        />
        </div>

        <div className="form-group">
        <label>Correo electrónico: </label>
        <Textbox
            type="text"
            placeholder=""
            value={correo}
            onChange={setCorreo}
        />
        </div>
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
            <button onClick={() => {
                validacionesCliente()
                if(validado){mandarRequest()}
            }}>Aceptar</button>
            <button onClick={LimpiarCliente}>Cancelar</button>
        </div>

      </div>
    </>
  )
}   