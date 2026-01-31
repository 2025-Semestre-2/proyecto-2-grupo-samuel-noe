import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarServicioHospedaje(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  const [nuevoIdServicio, setNuevoIdServicio] = useState('');
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
      const cargar = async () => {
          try {
            const res = await api.get('/servicio-hospedaje/catalogo');
            setCatalogo(res.data);
          } catch(e) { console.error(e); }
      };
      cargar();
  }, []);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID de registro");
      try {
          const res = await api.get('/servicio-hospedaje');
          const item = res.data.find(x => x.IdHospedajeServicio == idBusqueda);
          if(item) {
              setEncontrado(item);
              const serv = catalogo.find(c => c.NombreServicio === item.Servicio);
              setNuevoIdServicio(serv ? serv.IdCatalogoServicio : (catalogo[0]?.IdCatalogoServicio || ''));
              toast.success("Encontrado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      try {
          await api.put(`/servicio-hospedaje/${encontrado.IdHospedajeServicio}`, {
              idServicio: parseInt(nuevoIdServicio)
          });
          toast.success("Actualizado correctamente");
          setEncontrado(null);
          setIdBusqueda('');
      } catch (e) { 
          toast.error("Error: " + (e.response?.data?.error || "Error al guardar")); 
      }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Modificar Servicio de Hospedaje</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom:'20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>ID de Registro (Tabla Intermedia): </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} placeholder="Ej: 1, 10..." />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
            <small style={{color: '#666'}}>Puede consultar los IDs en el módulo "Reportar Servicios Hospedaje".</small>
        </div>
      </div>

      {encontrado && (
          <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
            <div className="form-group">
                <label>Hotel (Solo Lectura): </label>
                <input disabled type="text" value={encontrado.Hotel} 
                       style={{width:'100%', padding:'8px', backgroundColor:'#ccc', borderRadius:'4px', border:'1px solid #999'}} />
            </div>

            <div className="form-group">
                <label>Cambiar Servicio a: </label>
                <select 
                    style={{width: '100%', padding: '8px', height:'42px', borderRadius:'4px', backgroundColor:'white'}}
                    value={nuevoIdServicio}
                    onChange={(e) => setNuevoIdServicio(e.target.value)}
                >
                    {catalogo.map(c => <option key={c.IdCatalogoServicio} value={c.IdCatalogoServicio}>{c.NombreServicio}</option>)}
                </select>
            </div>
            
            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px'}}>
              <button onClick={guardar}>Guardar Cambios</button>
              <button onClick={() => setEncontrado(null)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
            </div>
          </div>
      )}
    </>
  )
}