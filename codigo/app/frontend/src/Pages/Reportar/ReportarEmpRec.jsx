import {useState, useEffect} from "react"; 
import api from '../../services/axiosConfig';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarEmpRec(){
    
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargar = async () => {
        try {
            setCargando(true);
            const res = await api.get('/recreacion');
            setDatos(res.data);
        } catch (e) { toast.error("Error cargando reporte"); } 
        finally { setCargando(false); }
    }

    useEffect(() => { cargar(); }, []);

    return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Reportar Empresas de Recreación</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#f9f9f9', margin: '20px'}}>
        {cargando ? <div className="text-center">Cargando...</div> : (
            <div className="table-responsive">
                <table className="table table-bordered table-striped" style={{backgroundColor:'white'}}>
                    <thead className="thead-dark" style={{backgroundColor:'#343a40', color:'white'}}>
                        <tr>
                            <th>ID</th> 
                            <th>Nombre Comercial</th>
                            <th>Cédula Jurídica</th>   
                            <th>Contacto</th>
                            <th>Correo</th>
                            <th>Ubicación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.length > 0 ? (
                            datos.map(d => (
                                <tr key={d.IdEmpresaRecreacion}>
                                    <td>{d.IdEmpresaRecreacion}</td>
                                    <td style={{fontWeight:'bold'}}>{d.NombreComercial}</td>
                                    <td>{d.CedulaJuridica}</td>
                                    <td>{d.NombreContacto}</td>
                                    <td>{d.CorreoElectronico}</td>
                                    <td style={{fontSize:'0.85rem'}}>{d.Provincia}, {d.Canton} ({d.SenasExactas})</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6" className="text-center">No hay datos</td></tr>
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