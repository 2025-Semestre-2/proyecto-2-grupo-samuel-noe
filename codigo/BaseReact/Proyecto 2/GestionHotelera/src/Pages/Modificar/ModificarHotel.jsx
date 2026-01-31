import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarHotel(){

    // Campo de búsqueda
    const [idHotel, setIdHotel] = useState('')

    // Campos del formulario
    const [nombre, setNombre] = useState('')
    const [cedulaJuridica, setCedulaJuridica] = useState('')
    const [telefono1, setTelefono1] = useState('')
    const [tipoHospedaje, setTipoHospedaje] = useState('')
    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [barrio, setBarrio] = useState('')
    const [seniasExactas, setSeniasExactas] = useState('')
    const [refGps, setRefGps] = useState('')
    const [correo, setCorreo] = useState('')
    const [url, setUrl] = useState('')

    // Limpia las casillas
    const LimpiarHotel = () => {
        setIdHotel('')
        setNombre('')
        setCedulaJuridica('')
        setTelefono1('')
        setTipoHospedaje('')
        setProvincia('')
        setCanton('')
        setDistrito('')
        setBarrio('')
        setSeniasExactas('')
        setRefGps('')
        setCorreo('')
        setUrl('')
    }

    // Retorna TRUE si es válido, FALSE si no
    const validacionesHotel = () => {
        const nombreValido = validarNull(nombre, 'Nombre Hotel');
        if (!nombreValido.esValido) {
            toast.warning(nombreValido.mensaje);
            return false;
        }
        
        const telefonoValido = validarInt(telefono1, 'Teléfono');
        if (!telefonoValido.esValido) {
            toast.warning(telefonoValido.mensaje);
            return false;
        }

        const correoValido = validarNull(correo, 'Correo Electrónico');
        if (!correoValido.esValido) {
            toast.warning(correoValido.mensaje);
            return false;
        }

        return true;
    }

    // Función para buscar el hotel por Cédula (ID) y llenar los campos
    const verificarExistenciaHotel = async () => {
        if (!idHotel) {
            toast.warning('Ingresa una Cédula Jurídica para buscar');
            return;
        }

        try {
            const response = await api.get('/hospedaje');
            const listaHoteles = response.data;
            
            const hotelEncontrado = listaHoteles.find(h => h.CedulaJuridica.toString() === idHotel);

            if (hotelEncontrado) {
                setNombre(hotelEncontrado.NombreComercial);
                setCedulaJuridica(hotelEncontrado.CedulaJuridica.toString());
                setTelefono1(hotelEncontrado.Telefono1.toString());
                setTipoHospedaje(hotelEncontrado.TipoHospedaje);
                setProvincia(hotelEncontrado.Provincia);
                setCanton(hotelEncontrado.Canton);
                setDistrito(hotelEncontrado.Distrito);
                setBarrio(hotelEncontrado.Barrio || '');
                setSeniasExactas(hotelEncontrado.SenasExactas);
                setRefGps(hotelEncontrado.ReferenciaGPS || '');
                setCorreo(hotelEncontrado.CorreoElectronico);
                setUrl(hotelEncontrado.SitioWebURL || '');
                
                toast.success("Hotel encontrado. Puede modificar los datos.");
            } else {
                toast.error("No se encontró un hotel con esa Cédula Jurídica.");
            }

        } catch (e) {
            console.error(e);
            toast.error('Error al conectar con el servidor.');
        }
    }

    const mandarRequest = async () => {
        // 1. Validar
        if (!validacionesHotel()) return;

        // 2. Preparar objeto
        const hotelModificado = {
            nombreComercial: nombre,
            telefono1: parseInt(telefono1),
            correoElectronico: correo,
            sitioWebURL: url
        };

        // 3. Enviar PUT
        try {
            const response = await api.put(`/hospedaje/${idHotel}`, hotelModificado);
            toast.success(response.data.message || "Hotel actualizado correctamente");
            LimpiarHotel();
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.error || "Error al actualizar";
            toast.error(msg);
        }
    }

    return (
    <>
      <ToastContainer />
      <h1>Modificar Hotel</h1>

      {/* SECCIÓN DE BÚSQUEDA */}
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#e9ecef',
        marginBottom: '20px'
      }}>   
        <div className="form-group">
        <label style={{fontWeight: 'bold'}}>Buscar por Cédula Jurídica: </label>
        <Textbox
          type="text"
          placeholder="Ingrese ID para buscar"
          value={idHotel}
          onChange={setIdHotel}
        />
        </div>
        <button onClick={verificarExistenciaHotel} style={{marginTop: '10px'}}>Buscar Hotel</button>
      </div>

      {/* SECCIÓN DE EDICIÓN */}
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Nombre del Hotel: </label>
        <Textbox
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
        />
        </div>

        <div className="form-group">
        <label>Cédula Jurídica (No editable): </label>
        <input 
            disabled 
            type="text" 
            value={cedulaJuridica} 
            style={{backgroundColor: '#ccc', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #999'}}
        />
        </div>

        <div className="form-group">
        <label>Teléfono Principal: </label>
        <Textbox
            type="text"
            placeholder=""
            value={telefono1}
            onChange={setTelefono1}
        />
        </div>
        
        <div className="form-group">
        <label>Tipo de Hospedaje: </label>
        <Textbox type="text" value={tipoHospedaje} onChange={setTipoHospedaje} />
        </div>

        <div className="form-group">
        <label>Provincia: </label>
        <Textbox type="text" value={provincia} onChange={setProvincia} />
        </div>

        <div className="form-group">
        <label>Cantón: </label>
        <Textbox type="text" value={canton} onChange={setCanton} />
        </div>

        <div className="form-group">
        <label>Distrito: </label>
        <Textbox type="text" value={distrito} onChange={setDistrito} />
        </div>

        <div className="form-group">
        <label>Barrio: </label>
        <Textbox type="text" value={barrio} onChange={setBarrio} />
        </div>

        <div className="form-group">
        <label>Señas Exactas: </label>
        <Textbox type="text" value={seniasExactas} onChange={setSeniasExactas} />
        </div>

        <div className="form-group">
        <label>Referencia GPS: </label>
        <Textbox type="text" value={refGps} onChange={setRefGps} />
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
        <label>URL: </label>
        <Textbox
            type="text"
            placeholder=""
            value={url}
            onChange={setUrl}
        />
        </div>

        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Guardar Cambios</button>
            <button onClick={LimpiarHotel}>Cancelar / Limpiar</button>
        </div>

      </div>
    </>
  )
}