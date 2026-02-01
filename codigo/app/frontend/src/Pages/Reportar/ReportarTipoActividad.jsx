import {useState, useEffect} from "react"; 
import api from '../../services/axiosConfig';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarTipoActividad(){
    
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = async () => {
    try {
        setCargando(true);
        const res = await api.get('/tipo-actividad');
        setDatos(res.data);
        
        if (res.data.length > 0) {
            toast.success(`Se cargaron ${res.data.length} actividades.`);
        } else {
            toast.info("No se encontraron registros.");
        }

    } catch (e) { 
        console.error(e);
        toast.error("Error cargando reporte de actividades"); 
    } 
    finally { setCargando(false); }
  }

  useEffect(() => { cargar(); }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Reportar Tipos de Actividad</h1>
      
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#f9f9f9', margin: '20px'}}>
        {cargando ? <div className="text-center">Cargando...</div> : (
            <div className="table-responsive">
                <table className="table table-bordered table-striped" style={{backgroundColor:'white'}}>
                    <thead className="thead-dark" style={{backgroundColor:'#343a40', color:'white'}}>
                        <tr>
                            <th>ID</th> 
                            <th>Nombre Actividad</th>   
                            <th>Descripción</th>
                            <th>Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.length > 0 ? (
                            datos.map(d => (
                                <tr key={d.IdTipoActividad}>
                                    <td>{d.IdTipoActividad}</td>
                                    <td style={{fontWeight:'bold'}}>{d.NombreTipoActividad}</td>
                                    <td>{d.Descripcion}</td>
                                    <td>₡ {d.Costo}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className="text-center">No hay actividades registradas</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}
        <div style={{textAlign:'center', marginTop:'20px'}}>
            <button onClick={cargar} className="btn btn-secondary">Refrescar</button>
        </div>
      </div>
    </>
  )
}