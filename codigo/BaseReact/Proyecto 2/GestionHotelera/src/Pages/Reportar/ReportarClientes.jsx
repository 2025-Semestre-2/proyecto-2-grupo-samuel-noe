
import {useState, useEffect} from "react"; 
//Imports para poder hacer las tablas de reportes con Toastify y Bootstrap
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarClientes(){

    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Cargar datos al montar el componente
    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
        setCargando(true);
        const response = await axios.get('http://localhost:3000/api/cliente');
        
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
      <h1>Reportar Clientes</h1>
      
      <div className="container mt-5">
        {cargando ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-sm">
              <thead className="table-dark">
                  <tr>
                      <th>ID</th> 
                      <th>Nombre</th>   
                      <th>Primer Apellido</th>
                      <th>Segundo Apellido</th>
                      <th>Fecha Nacimiento</th>
                      <th>Tipo Identificación</th>
                      <th>Número Identificación</th>
                      <th>País Residencia</th>
                      <th>Provincia</th>
                      <th>Cantón</th>
                      <th>Distrito</th>
                      <th>Correo Electrónico</th>
                  </tr>
              </thead>
              <tbody>
                  {datos.length > 0 ? (
                    datos.map((cliente) => (
                      <tr key={cliente.IdCliente}>
                        <td>{cliente.IdCliente}</td>
                        <td>{cliente.Nombre}</td>
                        <td>{cliente.PrimerApellido}</td>
                        <td>{cliente.SegundoApellido}</td>
                        <td>{cliente.FechaNacimiento}</td>
                        <td>{cliente.TipoIdentificacion}</td>
                        <td>{cliente.NumeroIdentificacion}</td>
                        <td>{cliente.PaisResidencia}</td>
                        <td>{cliente.Provincia}</td>
                        <td>{cliente.Canton}</td>
                        <td>{cliente.Distrito}</td>
                        <td>{cliente.CorreoElectronico}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="text-center">
                        No hay datos disponibles
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}