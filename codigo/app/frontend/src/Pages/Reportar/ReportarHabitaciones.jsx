import {useState, useEffect} from "react"; 
import api from '../../services/axiosConfig';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarHabitaciones(){
    
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = async () => {
    try {
        setCargando(true);
        const res = await api.get('/habitacion');
        setDatos(res.data);
    } catch (e) { toast.error("Error cargando reporte"); } 
    finally { setCargando(false); }
  }

  useEffect(() => { cargar(); }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Reportar Habitaciones</h1>
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#f9f9f9', margin: '20px'}}>
        {cargando ? <div className="text-center">Cargando...</div> : (
            <div className="table-responsive">
                <table className="table table-bordered table-striped" style={{backgroundColor:'white'}}>
                    <thead className="thead-dark" style={{backgroundColor:'#343a40', color:'white'}}>
                        <tr>
                            <th>ID</th> 
                            <th>Hotel</th>
                            <th>Tipo</th>   
                            <th>Número Habitación</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.length > 0 ? (
                            datos.map(d => (
                                <tr key={d.IdHabitacion}>
                                    <td>{d.IdHabitacion}</td>
                                    <td>{d.Hotel}</td>
                                    <td>{d.Tipo}</td>
                                    <td style={{fontWeight:'bold', textAlign:'center', fontSize:'1.1rem'}}>{d.NumeroHabitacion}</td>
                                    <td>
                                        <span className={`badge ${
                                            d.Estado === 'Disponible' ? 'bg-success' : 
                                            d.Estado === 'Ocupada' ? 'bg-danger' : 'bg-warning text-dark'
                                        }`}>
                                            {d.Estado}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="text-center">No hay habitaciones registradas</td></tr>
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