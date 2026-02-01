import { useState } from 'react';
import { Textbox } from "../../Components/Textbox";
import api from '../../services/axiosConfig';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ConsultarActividad() {
    
    const [criterio, setCriterio] = useState("");
    const [resultados, setResultados] = useState([]);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);

    const realizarBusqueda = async () => {
        if (!criterio.trim()) {
            toast.warning("Ingrese el nombre o ID de la actividad.");
            return;
        }

        try {
            const response = await api.get(`/actividad/buscar?criterio=${criterio}`);
            setResultados(response.data);
            setBusquedaRealizada(true);
            
            if(response.data.length > 0){
                toast.success(`Se encontraron ${response.data.length} coincidencias.`);
            } else {
                toast.info("No se encontraron actividades con ese criterio.");
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
            <ToastContainer position="top-right" autoClose={3000}/>
            <h1>Consultar Actividad</h1>

            <div style={{
                border: '2px solid #333', 
                borderRadius: '4px', 
                padding: '20px', 
                backgroundColor: '#f9f9f9',
                marginBottom: '30px'
            }}>
                <div className="form-group">
                    <label style={{fontWeight:'bold'}}>Criterio de Búsqueda (Nombre o ID): </label>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Textbox 
                            type="text" 
                            value={criterio} 
                            onChange={setCriterio} 
                            placeholder="Ej: Kayak, 10..." 
                        />
                        <button onClick={realizarBusqueda} style={{height: '42px', marginTop: 0}}>Buscar</button>
                        <button onClick={limpiarBusqueda} style={{height: '42px', marginTop: 0, backgroundColor: '#6c757d'}}>Limpiar</button>
                    </div>
                </div>
            </div>

            {busquedaRealizada && (
                <div style={{
                    border: '2px solid #333', 
                    borderRadius: '4px', 
                    padding: '20px', 
                    backgroundColor: '#f9f9f9'
                }}>
                    <h3 style={{marginTop: 0, borderBottom: '1px solid #ccc', paddingBottom: '10px'}}>Resultados</h3>
                    
                    {resultados.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover" style={{backgroundColor: 'white'}}>
                                <thead className="thead-dark" style={{backgroundColor: '#343a40', color: 'white'}}>
                                    <tr>
                                        <th style={{width: '80px', textAlign:'center'}}>ID</th>
                                        <th>Nombre Actividad</th>
                                        <th>Descripción</th>
                                        <th>Costo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultados.map((item) => (
                                        <tr key={item.IdTipoServicio}>
                                            <td style={{textAlign: 'center'}}>{item.IdTipoServicio}</td>
                                            <td style={{fontWeight: 'bold'}}>{item.NombreTipoServicio}</td>
                                            <td>{item.Descripcion}</td>
                                            <td style={{fontWeight:'bold', color: '#28a745'}}>₡ {item.Costo}</td>
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