import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarTelHotel(){

    const [busquedaId, setBusquedaId] = useState('');
    const [encontrado, setEncontrado] = useState(false);

    const [idHospedaje, setIdHospedaje] = useState('');
    const [codPais, setCodPais] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    
    const [codigosPais, setCodigosPais] = useState([]);

    useEffect(() => {
        const cargarCodigos = async () => {
            try {
                const res = await api.get('/util/codigos-pais');
                setCodigosPais(res.data);
            } catch (error) { console.error(error); }
        };
        cargarCodigos();
    }, []);

    const buscarTelefono = async () => {
        if (!busquedaId) { toast.warning("Ingrese ID de teléfono"); return; }
        
        try {
            const res = await api.get('/telefono-hotel');
            const telefono = res.data.find(t => t.IdHospedajeTelefono == busquedaId);
            
            if (telefono) {
                setEncontrado(true);
                setIdHospedaje(telefono.IdHospedaje.toString());
                const codigoEncontrado = codigosPais.find(c => c.Pais === telefono.Pais)?.IdCodigoTelefono || '506';
                setCodPais(codigoEncontrado);
                setNumeroTelefono(telefono.NumeroTelefono.toString());
                toast.success("Teléfono encontrado");
            } else {
                toast.error("No encontrado");
                setEncontrado(false);
            }
        } catch (error) { toast.error("Error de conexión"); }
    }

    const guardarCambios = async () => {
        if (!validarInt(numeroTelefono, 'Número').esValido) return toast.warning("Número inválido");

        try {
            await api.put(`/telefono-hotel/${busquedaId}`, {
                codigoPais: parseInt(codPais),
                numeroTelefono: parseInt(numeroTelefono)
            });
            toast.success("Teléfono actualizado correctamente");
            setEncontrado(false);
            setBusquedaId('');
        } catch (error) {
            toast.error("Error: " + (error.response?.data?.error || "Error al actualizar"));
        }
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000}/>
            <h1>Modificar Teléfono de Hotel</h1>

            <div style={{
                border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'
            }}>
                <div className="form-group">
                    <label style={{fontWeight:'bold'}}>Buscar por ID de Registro:</label>
                    <div style={{display:'flex', gap:'10px'}}>
                        <Textbox type="text" value={busquedaId} onChange={setBusquedaId} placeholder="Ingrese ID..." />
                        <button onClick={buscarTelefono} style={{height:'42px', marginTop:'0'}}>Buscar</button>
                    </div>
                </div>
            </div>

            {encontrado && (
                <div style={{
                    border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9',
                }}>
                    <div className="form-group">
                        <label>ID Hospedaje (No editable): </label>
                        <input disabled type="text" value={idHospedaje} 
                            style={{backgroundColor:'#ccc', width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid #999'}} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Teléfono: </label>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <select 
                                style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc', height:'42px'}}
                                value={codPais} 
                                onChange={(e) => setCodPais(e.target.value)}
                            >
                                {codigosPais.map(c => <option key={c.IdCodigoTelefono} value={c.IdCodigoTelefono}>+{c.IdCodigoTelefono}</option>)}
                            </select>
                            <Textbox type="text" value={numeroTelefono} onChange={setNumeroTelefono} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                        <button onClick={guardarCambios}>Guardar Cambios</button>
                        <button onClick={() => setEncontrado(false)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
                    </div>
                </div>
            )}
        </>
    )
}