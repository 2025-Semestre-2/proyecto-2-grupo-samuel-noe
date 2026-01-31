import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt, validarCorreo, validarUrl } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarHotel() {

    const [nombre, setNombre] = useState('')
    const [cedulaJuridica, setCedulaJuridica] = useState('')

    const [codigosPais, setCodigosPais] = useState([])
    const [codPais1, setCodPais1] = useState('506')
    const [telefono1, setTelefono1] = useState('')
    const [codPais2, setCodPais2] = useState('506')
    const [telefono2, setTelefono2] = useState('') // Opcional

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
                console.error("Error cargando códigos", error);
                setCodigosPais([{ IdCodigoTelefono: 506, Pais: 'Costa Rica' }]);
            }
        };
        cargarCodigos();
    }, []);

    const LimpiarHotel = () => {
        setNombre(''); setCedulaJuridica('');
        setTelefono1(''); setTelefono2('');
        setTipoHospedaje(''); setProvincia(''); setCanton(''); setDistrito('');
        setBarrio(''); setSeniasExactas(''); setRefGps(''); setCorreo(''); setUrl('');
        setCodPais1('506'); setCodPais2('506');
    }

    const ejecutarValidaciones = () => {
        if (!validarNull(nombre, 'Nombre Hotel').esValido) return toast.warning("Nombre es requerido");
        if (!validarInt(cedulaJuridica, 'Cédula Jurídica').esValido) return toast.warning("Cédula inválida (solo números)");

        if (!validarInt(telefono1, 'Teléfono Principal').esValido) return toast.warning("Teléfono Principal inválido");

        if (telefono2 && !validarInt(telefono2, 'Teléfono Secundario').esValido) return toast.warning("Teléfono Secundario inválido");

        if (!validarNull(tipoHospedaje, 'Tipo de Hospedaje').esValido) return toast.warning("Tipo de Hospedaje requerido");
        if (!validarNull(provincia, 'Provincia').esValido) return toast.warning("Provincia requerida");
        if (!validarNull(canton, 'Cantón').esValido) return toast.warning("Cantón requerido");
        if (!validarNull(distrito, 'Distrito').esValido) return toast.warning("Distrito requerido");
        
        const valCorreo = validarCorreo(correo);
        if (!valCorreo.esValido) return toast.warning(valCorreo.mensaje);

        const valUrl = validarUrl(url);
        if (!valUrl.esValido) return toast.warning(valUrl.mensaje);

        return true;
    }

    const mandarRequest = async () => {
        if (!ejecutarValidaciones()) return;

        const nuevoHotel = {
            nombreComercial: nombre,
            cedulaJuridica: parseInt(cedulaJuridica),
            tipoHospedaje: tipoHospedaje,
            provincia, canton, distrito, barrio,
            senasExactas: seniasExactas,
            referenciaGPS: refGps,
            correoElectronico: correo,
            sitioWebURL: url,
            telefono1: parseInt(telefono1),
            codigoPais1: parseInt(codPais1),
            telefono2: telefono2 ? parseInt(telefono2) : null,
            codigoPais2: telefono2 ? parseInt(codPais2) : null
        };

        try {
            const response = await api.post('/hospedaje', nuevoHotel);
            toast.success(response.data.message);
            LimpiarHotel();
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.error || "Error al conectar con el servidor";
            toast.error("Error: " + msg);
        }
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <h1>Insertar Hotel</h1>

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
                        value={nombre}
                        onChange={setNombre}
                    />
                </div>

                <div className="form-group">
                    <label>Cédula Jurídica (Solo números): </label>
                    <Textbox
                        type="text"
                        value={cedulaJuridica}
                        onChange={setCedulaJuridica}
                    />
                </div>

                {/* Teléfono Principal (Con Selector) */}
                <div className="form-group">
                    <label>Teléfono Principal: </label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <select
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', height: '40px' }}
                            value={codPais1}
                            onChange={(e) => setCodPais1(e.target.value)}
                        >
                            {codigosPais.map(c => (
                                <option key={c.IdCodigoTelefono} value={c.IdCodigoTelefono}>
                                    +{c.IdCodigoTelefono} ({c.Pais})
                                </option>
                            ))}
                        </select>
                        <div style={{ flexGrow: 1 }}>
                            <Textbox
                                type="text"
                                placeholder="Ej: 88888888"
                                value={telefono1}
                                onChange={setTelefono1}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Teléfono Secundario (Opcional): </label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <select
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', height: '40px' }}
                            value={codPais2}
                            onChange={(e) => setCodPais2(e.target.value)}
                        >
                            {codigosPais.map(c => (
                                <option key={c.IdCodigoTelefono} value={c.IdCodigoTelefono}>
                                    +{c.IdCodigoTelefono} ({c.Pais})
                                </option>
                            ))}
                        </select>
                        <div style={{ flexGrow: 1 }}>
                            <Textbox
                                type="text"
                                placeholder=""
                                value={telefono2}
                                onChange={setTelefono2}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Tipo de Hospedaje: </label>
                    <Textbox
                        type="text"
                        value={tipoHospedaje}
                        onChange={setTipoHospedaje}
                    />
                </div>

                <div className="form-group">
                    <label>Provincia: </label>
                    <Textbox
                        type="text"
                        value={provincia}
                        onChange={setProvincia}
                    />
                </div>

                <div className="form-group">
                    <label>Cantón: </label>
                    <Textbox
                        type="text"
                        value={canton}
                        onChange={setCanton}
                    />
                </div>

                <div className="form-group">
                    <label>Distrito: </label>
                    <Textbox
                        type="text"
                        value={distrito}
                        onChange={setDistrito}
                    />
                </div>

                <div className="form-group">
                    <label>Barrio: </label>
                    <Textbox
                        type="text"
                        value={barrio}
                        onChange={setBarrio}
                    />
                </div>

                <div className="form-group">
                    <label>Señas Exactas: </label>
                    <Textbox
                        type="text"
                        value={seniasExactas}
                        onChange={setSeniasExactas}
                    />
                </div>

                <div className="form-group">
                    <label>Referencia GPS: </label>
                    <Textbox
                        type="text"
                        value={refGps}
                        onChange={setRefGps}
                    />
                </div>

                <div className="form-group">
                    <label>Correo Electrónico: </label>
                    <Textbox
                        type="text"
                        value={correo}
                        onChange={setCorreo}
                    />
                </div>

                <div className="form-group">
                    <label>URL Sitio Web: </label>
                    <Textbox
                        type="text"
                        value={url}
                        onChange={setUrl}
                    />
                </div>

                <div style={{ display: 'flex', gap: '100px', justifyContent: 'center', marginTop: '20px' }}>
                    <button onClick={mandarRequest}>Aceptar</button>
                    <button onClick={LimpiarHotel}>Cancelar</button>
                </div>

            </div>
        </>
    )
}