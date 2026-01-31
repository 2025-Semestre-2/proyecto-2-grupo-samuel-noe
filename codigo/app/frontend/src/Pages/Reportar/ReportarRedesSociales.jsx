import {useState, useEffect} from "react"; 
import api from '../../services/axiosConfig';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarRedesSociales(){
    
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = async () => {
    try {
        setCargando(true);
        const res = await api.get('/catalogo-redes');
        setDatos(res.data);
    } catch (e) { toast.error("Error cargando reporte"); } 
    finally { setCargando(false); }
  }

  useEffect(() => { cargar(); }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Catálogo de Redes Sociales</h1>
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#f9f9f9', margin: '20px'}}>
        {cargando ? <div className="text-center">Cargando...</div> : (
            <table className="table table-bordered table-striped" style={{backgroundColor:'white'}}>
                <thead className="thead-dark" style={{backgroundColor:'#343a40', color:'white'}}>
                    <tr>
                        <th>ID</th> 
                        <th>Nombre Plataforma</th>   
                        <th>URL Base</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map(d => (
                        <tr key={d.IdCatalogoSocial}>
                            <td>{d.IdCatalogoSocial}</td>
                            <td style={{fontWeight:'bold'}}>{d.NombrePlataforma}</td>
                            <td>{d.UrlPlataforma}</td>
                        </tr>
                    ))}
                    {datos.length === 0 && <tr><td colSpan="3" className="text-center">Vacío</td></tr>}
                </tbody>
            </table>
        )}
        <div style={{textAlign:'center', marginTop:'20px'}}>
            <button onClick={cargar} className="btn btn-secondary">Refrescar</button>
        </div>
      </div>
    </>
  )
}