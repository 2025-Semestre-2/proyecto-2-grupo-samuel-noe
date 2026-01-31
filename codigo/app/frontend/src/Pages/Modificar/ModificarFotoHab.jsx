import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarFotoHab(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  
  const [url, setUrl] = useState('');
  
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
      const cargar = async () => {
          try {
            const res = await api.get('/foto-habitacion/tipos');
            setTipos(res.data);
          } catch(e) { console.error(e); }
      };
      cargar();
  }, []);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID");
      try {
          const res = await api.get('/foto-habitacion');
          const item = res.data.find(x => x.IdFoto == idBusqueda);
          if(item) {
              setEncontrado(item);
              setIdTipoHab(item.IdTipoHabitacion.toString());
              setUrl(item.UrlFoto);
              toast.success("Cargado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      if (!validarNull(url, 'URL').esValido) return toast.warning("URL requerida");

      try {
          await api.put(`/foto-habitacion/${encontrado.IdFoto}`, {
              idTipoHabitacion: parseInt(idTipoHab),
              urlFoto: url
          });
          toast.success("Actualizado correctamente.");
          setEncontrado(null);
          setIdBusqueda('');
      } catch (e) { 
          toast.error("Error: " + (e.response?.data?.error || "Error al guardar")); 
      }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Modificar Foto de Habitación</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>ID Foto: </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
            
            <div className="form-group">
                <label>Tipo de Habitación: </label>
                <select 
                    style={{
                        width: '100%', padding: '8px', height:'42px', 
                        borderRadius:'4px', border:'1px solid #ccc', 
                        backgroundColor:'white', color: '#333'
                    }}
                    value={idTipoHab} onChange={(e) => setIdTipoHab(e.target.value)}
                >
                    {tipos.map(t => (
                        <option key={t.IdTipoHabitacion} value={t.IdTipoHabitacion}>
                            {t.Hotel} - {t.Nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group"><label>URL Foto: </label><Textbox type="text" value={url} onChange={setUrl} /></div>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={guardar}>Guardar Cambios</button>
                <button onClick={() => setEncontrado(null)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
            </div>
        </div>
      )}
    </>
  )
}