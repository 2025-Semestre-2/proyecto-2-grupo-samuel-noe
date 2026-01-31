import { useState } from 'react';
import { Textbox } from "../../Components/Textbox";
import api from '../../services/axiosConfig';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ConsultarHotel() {
    const [criterio, setCriterio] = useState("");
    const [resultados, setResultados] = useState([]);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);

    const realizarBusqueda = async () => {
        if (!criterio.trim()) {
            toast.warning("Por favor ingrese un nombre o cédula para buscar.");
            return;
        }

        try {
            const response = await api.get(`/hospedaje/buscar?criterio=${criterio}`);
            setResultados(response.data);
            setBusquedaRealizada(true);
            
            if(response.data.length > 0){
                toast.success(`Se encontraron ${response.data.length} coincidencias.`);
            } else {
                toast.info("No se encontraron hoteles con ese criterio.");
            }

        } catch (error) {
            console.error(error);
            toast.error("Error al conectar con el servidor.");
            setResultados([]);
        }
    };

    const limpiarBusqueda = () => {
        setCriterio("");
        setResultados([]);
        setBusquedaRealizada(false);
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <h1>Consultar Hotel</h1>

            <div style={{
                border: '2px solid #333', borderRadius: '4px', padding: '20px',
                backgroundColor: '#f9f9f9', marginBottom: '20px'
            }}>
                <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>Buscar por Nombre o Cédula:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Textbox 
                            type="text" 
                            placeholder="Ej: Hotel del Mar o 123456" 
                            value={criterio} 
                            onChange={setCriterio} 
                        />
                        <button onClick={realizarBusqueda} style={{ height: '42px', marginTop: '0' }}>Buscar</button>
                        <button onClick={limpiarBusqueda} style={{ height: '42px', marginTop: '0', backgroundColor: '#6c757d' }}>Limpiar</button>
                    </div>
                </div>
            </div>

            {busquedaRealizada && (
                <div style={{
                    border: '2px solid #333', borderRadius: '4px', padding: '20px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <h3 style={{marginTop: 0, marginBottom: '20px'}}>Resultados</h3>
                    
                    {resultados.length > 0 ? (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="table table-bordered table-hover" style={{backgroundColor: 'white', width: '100%'}}>
                                <thead className="thead-dark" style={{backgroundColor: '#343a40', color: 'white'}}>
                                    <tr>
                                        <th style={{padding: '10px'}}>Cédula</th>
                                        <th style={{padding: '10px'}}>Nombre Comercial</th>
                                        <th style={{padding: '10px'}}>Tipo</th>
                                        <th style={{padding: '10px'}}>Ubicación</th>
                                        <th style={{padding: '10px'}}>Teléfono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultados.map((hotel) => (
                                        <tr key={hotel.CedulaJuridica}>
                                            <td style={{padding: '10px', textAlign: 'center'}}>{hotel.CedulaJuridica}</td>
                                            <td style={{padding: '10px', fontWeight: 'bold'}}>{hotel.NombreComercial}</td>
                                            <td style={{padding: '10px'}}>{hotel.TipoHospedaje}</td>
                                            <td style={{padding: '10px'}}>{hotel.Provincia}, {hotel.Canton}</td>
                                            <td style={{padding: '10px'}}>{hotel.TelefonoPrincipal || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={{textAlign: 'center', color: '#777', padding: '20px'}}>
                            <p>No hay resultados disponibles para esta búsqueda.</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}