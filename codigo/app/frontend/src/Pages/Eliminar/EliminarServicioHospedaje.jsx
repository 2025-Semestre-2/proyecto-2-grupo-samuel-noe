import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function EliminarServicioHospedaje(){

  const [lista, setLista] = useState([]);
  const [filtro, setFiltro] = useState('');

  const cargarLista = async () => {
      try {
          const res = await api.get('/servicio-hospedaje');
          setLista(res.data);
      } catch (error) { toast.error("Error cargando lista"); }
  }

  useEffect(() => { cargarLista(); }, []);

  const eliminar = async (id) => {
      if(!window.confirm("¿Desvincular este servicio?")) return;
      try {
          await api.delete(`/servicio-hospedaje/${id}`);
          toast.success("Eliminado correctamente.");
          cargarLista();
      } catch (error) { toast.error("Error al eliminar"); }
  }

  const filtrados = lista.filter(item => 
      item.Hotel.toLowerCase().includes(filtro.toLowerCase()) || 
      item.IdHospedaje.toString().includes(filtro)
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Eliminar Servicio de Hospedaje</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <label style={{fontWeight:'bold'}}>Buscar por Hotel: </label>
        <Textbox type="text" value={filtro} onChange={setFiltro} placeholder="Nombre o ID..." />
      </div>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#f9f9f9'}}>
        <div className="table-responsive">
            <table className="table table-bordered table-hover" style={{backgroundColor:'white'}}>
                <thead className="thead-dark" style={{backgroundColor: '#343a40', color: 'white'}}>
                    <tr>
                        <th>Hotel</th>
                        <th>ID Hotel</th>
                        <th>Servicio</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrados.map(item => (
                        <tr key={item.IdHospedajeServicio}>
                            <td style={{fontWeight:'bold'}}>{item.Hotel}</td>
                            <td>{item.IdHospedaje}</td>
                            <td>{item.Servicio}</td>
                            <td style={{textAlign:'center'}}>
                                <button onClick={() => eliminar(item.IdHospedajeServicio)} style={{backgroundColor:'#dc3545', padding:'5px 10px', fontSize:'0.9rem'}}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filtrados.length === 0 && <tr><td colSpan="4" className="text-center">No hay datos</td></tr>}
                </tbody>
            </table>
        </div>
      </div>
    </>
  )
}