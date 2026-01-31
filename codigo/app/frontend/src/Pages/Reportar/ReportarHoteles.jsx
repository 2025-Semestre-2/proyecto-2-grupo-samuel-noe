import React, {useState, useEffect} from "react"; 
import api from '../../services/axiosConfig';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarHoteles(){

    const [hoteles, setHoteles] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [cargando, setCargando] = useState(false);

    const cargarDatos = async (pag) => {
        setCargando(true);
        try {
            const response = await api.get(`/hospedaje/reporte?pagina=${pag}&cantidad=10`);
            const { datos, meta } = response.data;
            
            setHoteles(datos);
            setTotalPaginas(meta.totalPaginas);
            setPagina(meta.paginaActual);
        } catch (error) {
            console.error(error);
            toast.error("Error cargando el reporte.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos(1);
    }, []);

    const irAnterior = () => {
        if (pagina > 1) cargarDatos(pagina - 1);
    };

    const irSiguiente = () => {
        if (pagina < totalPaginas) cargarDatos(pagina + 1);
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <h1>Reporte de Hoteles</h1>

            <div style={{
                border: '2px solid #333', 
                borderRadius: '4px', 
                padding: '20px', 
                backgroundColor: '#f9f9f9',
                margin: '20px'
            }}>
                
                {cargando ? (
                    <div className="text-center">Cargando datos...</div>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped table-hover" style={{backgroundColor: 'white'}}>
                                <thead className="thead-dark" style={{backgroundColor: '#343a40', color: 'white'}}>
                                    <tr>
                                        <th>Cédula</th> 
                                        <th>Nombre</th>   
                                        <th>Tipo</th>
                                        <th>Ubicación</th>
                                        <th>Barrio</th>
                                        <th>Referencia</th>
                                        <th>Teléfono</th>
                                        <th>Correo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hoteles.length > 0 ? (
                                        hoteles.map((h) => (
                                            <tr key={h.CedulaJuridica}>
                                                <td>{h.CedulaJuridica}</td>
                                                <td>{h.NombreComercial}</td>
                                                <td>{h.TipoHospedaje}</td>
                                                <td>{h.Provincia}, {h.Canton}</td>
                                                <td>{h.Barrio || '-'}</td>
                                                <td style={{fontSize: '0.85rem'}}>{h.ReferenciaGPS || h.SenasExactas}</td>
                                                <td>{h.TelefonoPrincipal || 'Sin registrar'}</td>
                                                <td style={{fontSize: '0.85rem'}}>{h.CorreoElectronico}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">No hay datos registrados.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Controles de Paginación */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                            <button 
                                className="btn btn-secondary" 
                                onClick={irAnterior} 
                                disabled={pagina === 1}
                            >
                                &laquo; Anterior
                            </button>
                            
                            <span style={{fontWeight: 'bold'}}>
                                Página {pagina} de {totalPaginas > 0 ? totalPaginas : 1}
                            </span>
                            
                            <button 
                                className="btn btn-secondary" 
                                onClick={irSiguiente} 
                                disabled={pagina === totalPaginas || totalPaginas === 0}
                            >
                                Siguiente &raquo;
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}