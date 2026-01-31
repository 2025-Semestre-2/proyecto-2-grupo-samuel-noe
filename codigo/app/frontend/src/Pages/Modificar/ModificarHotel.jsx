import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt, validarCorreo, validarUrl } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarHotel(){

    const [busquedaId, setBusquedaId] = useState('');
    const [hotelEncontrado, setHotelEncontrado] = useState(false);

    const [nombre, setNombre] = useState('')
    const [cedulaJuridica, setCedulaJuridica] = useState('')
    
    const [codigosPais, setCodigosPais] = useState([])
    const [codPais1, setCodPais1] = useState('506')
    const [telefono1, setTelefono1] = useState('')
    const [codPais2, setCodPais2] = useState('506')
    const [telefono2, setTelefono2] = useState('')

    const [tipoHospedaje, setTipoHospedaje] = useState('')
    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [barrio, setBarrio] = useState('')
    const [seniasExactas, setSeniasExactas] = useState('')
    const [refGps, setRefGps] = useState('')
    const [correo, setCorreo] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        const cargarCodigos = async () => {
            try {
                const res = await api.get('/util/codigos-pais');
                setCodigosPais(res.data);
            } catch (error) {
                console.error("Error códigos", error);
                setCodigosPais([{IdCodigoTelefono: 506, Pais: 'Costa Rica'}]);
            }
        };
        cargarCodigos();
    }, []);

    const LimpiarFormulario = () => {
        setHotelEncontrado(false);
        setBusquedaId('');
        setNombre(''); setCedulaJuridica(''); 
        setTelefono1(''); setTelefono2(''); setCodPais1('506'); setCodPais2('506');
        setTipoHospedaje(''); setProvincia(''); setCanton(''); setDistrito('');
        setBarrio(''); setSeniasExactas(''); setRefGps(''); setCorreo(''); setUrl('');
    }

    const buscarHotel = async () => {
        if (!busquedaId) {
            toast.warning("Ingrese una Cédula Jurídica");
            return;
        }

        try {
            const response = await api.get(`/hospedaje/${busquedaId}`);
            const data = response.data;

            setHotelEncontrado(true);
            setCedulaJuridica(data.CedulaJuridica.toString());
            setNombre(data.NombreComercial);
            setTipoHospedaje(data.TipoHospedaje);
            setProvincia(data.Provincia);
            setCanton(data.Canton);
            setDistrito(data.Distrito);
            setBarrio(data.Barrio || '');
            setSeniasExactas(data.SenasExactas);
            setRefGps(data.ReferenciaGPS || '');
            setCorreo(data.CorreoElectronico);
            setUrl(data.SitioWebURL || '');

            if (data.telefonos && data.telefonos.length > 0) {
                setTelefono1(data.telefonos[0].NumeroTelefono.toString());
                setCodPais1(data.telefonos[0].CodigoPais);
                
                if (data.telefonos.length > 1) {
                    setTelefono2(data.telefonos[1].NumeroTelefono.toString());
                    setCodPais2(data.telefonos[1].CodigoPais);
                } else {
                    setTelefono2('');
                    setCodPais2('506');
                }
            } else {
                setTelefono1(''); setTelefono2('');
            }
            toast.success("Hotel cargado correctamente");

        } catch (error) {
            console.error(error);
            toast.error("Hotel no encontrado o error de conexión");
            setHotelEncontrado(false);
        }
    }

    const guardarCambios = async () => {
        if (!validarNull(nombre, 'Nombre').esValido) return toast.warning("Nombre requerido");
        if (!validarInt(telefono1, 'Teléfono 1').esValido) return toast.warning("Teléfono 1 inválido");
        if (!validarCorreo(correo).esValido) return toast.warning("Correo inválido");

        const hotelActualizado = {
            nombreComercial: nombre,
            tipoHospedaje, provincia, canton, distrito, barrio,
            seniasExactas, referenciaGPS: refGps,
            correoElectronico: correo, sitioWebURL: url,
            telefono1: parseInt(telefono1),
            codigoPais1: parseInt(codPais1),
            telefono2: telefono2 ? parseInt(telefono2) : null,
            codigoPais2: telefono2 ? parseInt(codPais2) : null
        };

        try {
            const res = await api.put(`/hospedaje/${cedulaJuridica}`, hotelActualizado);
            toast.success(res.data.message);
            LimpiarFormulario();
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar: " + (error.response?.data?.error || "Desconocido"));
        }
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <h1>Modificar Hotel</h1>

            <div style={{
                border: '2px solid #333', borderRadius: '4px', padding: '20px',
                backgroundColor: '#e9ecef', marginBottom: '20px'
            }}>
                <div className="form-group">
                    <label style={{fontWeight:'bold'}}>Buscar por Cédula Jurídica:</label>
                    <div style={{display:'flex', gap:'10px'}}>
                        <Textbox type="text" value={busquedaId} onChange={setBusquedaId} placeholder="Ingrese ID..."/>
                        <button onClick={buscarHotel} style={{height:'42px', marginTop:'0'}}>Buscar</button>
                    </div>
                </div>
            </div>

            {hotelEncontrado && (
                <div style={{
                    border: '2px solid #333', borderRadius: '4px', padding: '30px',
                    backgroundColor: '#f9f9f9',
                }}>
                    <div className="form-group">
                        <label>Cédula Jurídica (No editable): </label>
                        <input disabled type="text" value={cedulaJuridica} 
                            style={{backgroundColor:'#ccc', width:'100%', padding:'8px', border:'1px solid #999', borderRadius:'4px'}} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Nombre del Hotel: </label>
                        <Textbox type="text" value={nombre} onChange={setNombre} />
                    </div>

                    <div className="form-group">
                        <label>Teléfono Principal: </label>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <select style={{padding:'8px', borderRadius:'4px', border:'1px solid #ccc', backgroundColor:'white'}}
                                value={codPais1} onChange={(e) => setCodPais1(e.target.value)}>
                                {codigosPais.map(c => <option key={c.IdCodigoTelefono} value={c.IdCodigoTelefono}>+{c.IdCodigoTelefono}</option>)}
                            </select>
                            <Textbox type="text" value={telefono1} onChange={setTelefono1} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Teléfono Secundario: </label>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <select style={{padding:'8px', borderRadius:'4px', border:'1px solid #ccc', backgroundColor:'white'}}
                                value={codPais2} onChange={(e) => setCodPais2(e.target.value)}>
                                {codigosPais.map(c => <option key={c.IdCodigoTelefono} value={c.IdCodigoTelefono}>+{c.IdCodigoTelefono}</option>)}
                            </select>
                            <Textbox type="text" value={telefono2} onChange={setTelefono2} />
                        </div>
                    </div>

                    <div className="form-group"><label>Tipo de Hospedaje: </label><Textbox type="text" value={tipoHospedaje} onChange={setTipoHospedaje} /></div>
                    <div className="form-group"><label>Provincia: </label><Textbox type="text" value={provincia} onChange={setProvincia} /></div>
                    <div className="form-group"><label>Cantón: </label><Textbox type="text" value={canton} onChange={setCanton} /></div>
                    <div className="form-group"><label>Distrito: </label><Textbox type="text" value={distrito} onChange={setDistrito} /></div>
                    <div className="form-group"><label>Barrio: </label><Textbox type="text" value={barrio} onChange={setBarrio} /></div>
                    <div className="form-group"><label>Señas Exactas: </label><Textbox type="text" value={seniasExactas} onChange={setSeniasExactas} /></div>
                    <div className="form-group"><label>Referencia GPS: </label><Textbox type="text" value={refGps} onChange={setRefGps} /></div>
                    <div className="form-group"><label>Correo Electrónico: </label><Textbox type="text" value={correo} onChange={setCorreo} /></div>
                    <div className="form-group"><label>URL Sitio Web: </label><Textbox type="text" value={url} onChange={setUrl} /></div>

                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
                        <button onClick={guardarCambios}>Guardar Cambios</button>
                        <button onClick={LimpiarFormulario} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
                    </div>
                </div>
            )}
        </>
    )
}