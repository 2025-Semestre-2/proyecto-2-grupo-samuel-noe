import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function EliminarHotel() {

    const [busquedaId, setBusquedaId] = useState('');
    const [hotelEncontrado, setHotelEncontrado] = useState(false);

    const [nombre, setNombre] = useState('')
    const [cedulaJuridica, setCedulaJuridica] = useState('')
    const [tipoHospedaje, setTipoHospedaje] = useState('')
    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [barrio, setBarrio] = useState('')
    
    const [telefono1, setTelefono1] = useState('')
    const [telefono2, setTelefono2] = useState('')

    const LimpiarFormulario = () => {
        setHotelEncontrado(false);
        setBusquedaId('');
        setNombre(''); setCedulaJuridica(''); 
        setTipoHospedaje(''); setProvincia(''); setCanton(''); setDistrito('');
        setBarrio(''); setTelefono1(''); setTelefono2('');
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
            
            if (data.telefonos && data.telefonos.length > 0) {
                setTelefono1(data.telefonos[0].NumeroTelefono.toString());
                if (data.telefonos.length > 1) {
                    setTelefono2(data.telefonos[1].NumeroTelefono.toString());
                } else {
                    setTelefono2('N/A');
                }
            } else {
                setTelefono1('N/A'); setTelefono2('N/A');
            }
            toast.info("Hotel encontrado. Verifique antes de eliminar.");

        } catch (error) {
            console.error(error);
            toast.error("Hotel no encontrado.");
            setHotelEncontrado(false);
        }
    }

    const confirmarEliminacion = async () => {
        if (!window.confirm(`¿ESTÁ SEGURO? Se eliminará el hotel "${nombre}" y toda su configuración (teléfonos, servicios, habitaciones). Esta acción no se puede deshacer.`)) {
            return;
        }

        try {
            await api.delete(`/hospedaje/${cedulaJuridica}`);
            toast.success("Hotel y sus dependencias eliminados correctamente.");
            LimpiarFormulario();
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.error || "Error al eliminar";
            
            if (msg.includes("Reservaciones")) {
                toast.error("BLOQUEADO: " + msg);
            } else {
                toast.error("Error: " + msg);
            }
        }
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <h1>Eliminar Hotel</h1>

            <div style={{
                border: '2px solid #333', borderRadius: '4px', padding: '20px',
                backgroundColor: '#e9ecef', marginBottom: '20px'
            }}>
                <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>Buscar por Cédula Jurídica:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Textbox type="text" value={busquedaId} onChange={setBusquedaId} placeholder="Ingrese ID..." />
                        <button onClick={buscarHotel} style={{ height: '42px', marginTop: '0' }}>Buscar</button>
                    </div>
                </div>
            </div>

            {hotelEncontrado && (
                <div style={{
                    border: '2px solid #d9534f', // Borde rojo para indicar peligro
                    borderRadius: '4px', padding: '30px',
                    backgroundColor: '#fff5f5', // Fondo rojizo suave
                }}>
                    <h3 style={{ color: '#d9534f', textAlign: 'center' }}>⚠ ADVERTENCIA: Usted está a punto de eliminar este registro</h3>
                    
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input disabled type="text" value={nombre} className="form-control" 
                               style={{ width: '100%', padding: '8px', backgroundColor: '#e9ecef', border: '1px solid #ced4da' }} />
                    </div>

                    <div className="form-group">
                        <label>Cédula Jurídica:</label>
                        <input disabled type="text" value={cedulaJuridica} className="form-control" 
                               style={{ width: '100%', padding: '8px', backgroundColor: '#e9ecef', border: '1px solid #ced4da' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label>Teléfono 1:</label>
                            <input disabled type="text" value={telefono1} style={{ width: '100%', padding: '8px', backgroundColor: '#e9ecef' }} />
                        </div>
                        <div className="form-group">
                            <label>Teléfono 2:</label>
                            <input disabled type="text" value={telefono2} style={{ width: '100%', padding: '8px', backgroundColor: '#e9ecef' }} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Ubicación:</label>
                        <input disabled type="text" value={`${provincia}, ${canton}, ${distrito} (${barrio})`} 
                               style={{ width: '100%', padding: '8px', backgroundColor: '#e9ecef' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
                        <button 
                            onClick={confirmarEliminacion} 
                            style={{ backgroundColor: '#dc3545', color: 'white', fontWeight: 'bold' }}>
                            ELIMINAR DEFINITIVAMENTE
                        </button>
                        <button onClick={LimpiarFormulario} style={{ backgroundColor: '#6c757d' }}>Cancelar</button>
                    </div>
                </div>
            )}
        </>
    )
}