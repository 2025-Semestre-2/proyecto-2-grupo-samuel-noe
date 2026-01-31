import {useState, useEffect} from "react"; 
import api from '../../services/axiosConfig';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarFotoHab(){
    
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = async () => {
    try {
        setCargando(true);
        const res = await api.get('/foto-habitacion');
        setDatos(res.data);
    } catch (e) { toast.error("Error cargando reporte"); } 
    finally { setCargando(false); }
  }

  useEffect(() => { cargar(); }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Reportar Fotos</h1>
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#f9f9f9', margin: '20px'}}>
        {cargando ? <div className="text-center">Cargando...</div> : (
            <div className="table-responsive">
                <table className="table table-bordered table-striped" style={{backgroundColor:'white'}}>
                    <thead className="thead-dark" style={{backgroundColor:'#343a40', color:'white'}}>
                        <tr>
                            <th>ID</th> 
                            <th>Hotel</th>
                            <th>Tipo Habitación</th>
                            <th>URL</th>
                            <th>Vista Previa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.length > 0 ? (
                            datos.map(d => (
                                <tr key={d.IdFoto}>
                                    <td>{d.IdFoto}</td>
                                    <td>{d.Hotel}</td>
                                    <td style={{fontWeight:'bold'}}>{d.TipoHabitacion}</td>
                                    <td style={{fontSize:'0.8rem', wordBreak:'break-all'}}>{d.UrlFoto}</td>
                                    <td style={{textAlign:'center'}}>
                                        <img src={d.UrlFoto} alt="-" style={{height:'40px'}} onError={(e) => e.target.style.display='none'} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="text-center">No hay datos</td></tr>
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