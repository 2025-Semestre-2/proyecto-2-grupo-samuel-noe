import {useState, useEffect} from "react"; 
import api from '../../services/axiosConfig';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarRedSocialHoteles(){
    
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const response = await api.get('/red-social-hotel');
      setDatos(response.data);
    } catch (error) {
      toast.error('Error al cargar datos');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Reportar Redes Sociales</h1>
      
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#f9f9f9', margin: '20px'}}>
        {cargando ? (
          <div className="text-center">Cargando...</div>
        ) : (
          <table className="table table-bordered table-striped" style={{backgroundColor:'white'}}>
            <thead className="thead-dark" style={{backgroundColor:'#343a40', color:'white'}}>
                <tr>
                    <th>ID Registro</th> 
                    <th>Hotel</th>
                    <th>ID Hotel</th>   
                    <th>Red Social</th>
                </tr>
            </thead>
            <tbody>
                {datos.length > 0 ? (
                  datos.map((item) => (
                    <tr key={item.IdRedSocial}>
                      <td>{item.IdRedSocial}</td>
                      <td style={{fontWeight:'bold'}}>{item.Hotel}</td>
                      <td>{item.IdHospedaje}</td>
                      <td>{item.RedSocial}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="text-center">No hay datos</td></tr>
                )}
            </tbody>
        </table>
        )}
        <div style={{textAlign:'center', marginTop:'20px'}}>
            <button onClick={cargarDatos} className="btn btn-secondary">Refrescar</button>
        </div>
      </div>
    </>
  )
}