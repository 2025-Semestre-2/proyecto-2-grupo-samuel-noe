
import {useState, useEffect} from "react"; 
//Imports para poder hacer las tablas de reportes con Toastify y Bootstrap
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarTelHoteles(){
    
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const response = await axios.get('http://localhost:3000/api/hospedaje-telefonos');
      
      if (response.data.success) {
        setDatos(response.data.data);
        toast.success(` ${response.data.count} registros cargados`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(' Error al cargar datos');
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Reportar Teléfonos Hoteles</h1>
      
      <div className="container mt-5">
        {cargando ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
                <tr>
                    <th>ID</th> 
                    <th>ID Hospedaje</th>   
                    <th>Número Teléfono</th>
                    <th>Código País</th>
                </tr>
            </thead>
            <tbody>
                {datos.length > 0 ? (
                  datos.map((telefono) => (
                    <tr key={telefono.IdHospedajeTelefono}>
                      <td>{telefono.IdHospedajeTelefono}</td>
                      <td>{telefono.IdHospedaje}</td>
                      <td>{telefono.NumTelefono}</td>
                      <td>{telefono.CodPais}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No hay datos disponibles
                    </td>
                  </tr>
                )}
            </tbody>
        </table>
        )}
      </div>
    </>
  )
}