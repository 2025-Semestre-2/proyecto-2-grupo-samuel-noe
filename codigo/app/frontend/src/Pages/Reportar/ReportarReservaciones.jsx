import {useState, useEffect} from "react"; 
import api from '../../services/axiosConfig';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarReservaciones(){
    
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = async () => {
    try {
        setCargando(true);
        const res = await api.get('/reservacion');
        setDatos(res.data);
        if (res.data.length > 0) toast.success(`Se cargaron ${res.data.length} reservas.`);
        else toast.info("No hay reservas registradas.");
    } catch (e) { toast.error("Error cargando reporte"); } 
    finally { setCargando(false); }
  }

  useEffect(() => { cargar(); }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Reportar Reservaciones</h1>
      
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#f9f9f9', margin: '20px'}}>
        {cargando ? <div className="text-center">Cargando...</div> : (
            <div className="table-responsive">
                <table className="table table-bordered table-striped" style={{backgroundColor:'white'}}>
                    <thead className="thead-dark" style={{backgroundColor:'#343a40', color:'white'}}>
                        <tr>
                            <th>ID</th> 
                            <th>Cliente</th>   
                            <th>Habitación</th>
                            <th>Ingreso</th>
                            <th>Salida</th>
                            <th>Pers.</th>
                            <th>Auto</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.length > 0 ? (
                            datos.map(d => (
                                <tr key={d.IdReservacion}>
                                    <td>{d.IdReservacion}</td>
                                    <td>{d.NombreCliente}</td>
                                    <td>H-{d.NumeroHabitacion}</td>
                                    <td>{new Date(d.FechaHoraIngreso).toLocaleString()}</td>
                                    <td>{new Date(d.FechaSalida).toLocaleDateString()}</td>
                                    <td>{d.CantidadPersonas}</td>
                                    <td>{d.PoseeVehiculo ? 'Sí' : 'No'}</td>
                                    <td>
                                        <span className={`badge ${d.Estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                                            {d.Estado}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="8" className="text-center">No hay reservas</td></tr>
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