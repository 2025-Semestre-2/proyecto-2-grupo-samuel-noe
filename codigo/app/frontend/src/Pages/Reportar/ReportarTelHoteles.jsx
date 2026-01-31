import { useState, useEffect } from "react"; 
import api from '../../services/axiosConfig';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarTelHoteles(){
    
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const response = await api.get('/telefono-hotel');
            setDatos(response.data);
            if(response.data.length > 0) {
                toast.success(`${response.data.length} teléfonos cargados`);
            } else {
                toast.info("No hay teléfonos registrados");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al cargar datos');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <h1>Reportar Teléfonos de Hoteles</h1>
            
            <div style={{
                border: '2px solid #333', borderRadius: '4px', padding: '20px', 
                backgroundColor: '#f9f9f9', margin: '20px'
            }}>
                {cargando ? (
                    <div className="text-center">Cargando datos...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover" style={{backgroundColor: 'white'}}>
                            <thead className="thead-dark" style={{backgroundColor: '#343a40', color: 'white'}}>
                                <tr>
                                    <th>ID Registro</th> 
                                    <th>Hotel</th>
                                    <th>ID Hotel</th>   
                                    <th>País</th>
                                    <th>Número Teléfono</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datos.length > 0 ? (
                                    datos.map((tel) => (
                                        <tr key={tel.IdHospedajeTelefono}>
                                            <td>{tel.IdHospedajeTelefono}</td>
                                            <td style={{fontWeight:'bold'}}>{tel.Hotel}</td>
                                            <td>{tel.IdHospedaje}</td>
                                            <td>{tel.Pais}</td>
                                            <td>{tel.NumeroTelefono}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No hay datos disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                
                <div style={{marginTop: '20px', textAlign: 'center'}}>
                    <button onClick={cargarDatos} className="btn btn-secondary">Refrescar Lista</button>
                </div>
            </div>
        </>
    )
}