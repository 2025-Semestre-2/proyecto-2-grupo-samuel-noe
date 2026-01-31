import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarRedSocialHotel(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  const [nuevoIdPlataforma, setNuevoIdPlataforma] = useState('');
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
      const cargar = async () => {
          const res = await api.get('/red-social-hotel/catalogo');
          setCatalogo(res.data);
      };
      cargar();
  }, []);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID de registro");
      try {
          const res = await api.get('/red-social-hotel');
          const item = res.data.find(x => x.IdRedSocial == idBusqueda);
          if(item) {
              setEncontrado(item);
              const plat = catalogo.find(c => c.NombrePlataforma === item.RedSocial);
              setNuevoIdPlataforma(plat ? plat.IdCatalogoSocial : catalogo[0]?.IdCatalogoSocial);
              toast.success("Registro encontrado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      try {
          await api.put(`/red-social-hotel/${encontrado.IdRedSocial}`, {
              idPlataforma: nuevoIdPlataforma
          });
          toast.success("Actualizado correctamente");
          setEncontrado(null);
          setIdBusqueda('');
      } catch (e) { toast.error("Error al guardar"); }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Modificar Red Social de Hotel</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom:'20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>ID de Registro (Tabla Intermedia): </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
        </div>
      </div>

      {encontrado && (
          <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
            <div className="form-group">
                <label>Hotel (Solo Lectura): </label>
                <input disabled type="text" value={encontrado.Hotel} style={{width:'100%', padding:'8px', backgroundColor:'#ccc'}} />
            </div>

            <div className="form-group">
                <label>Cambiar Red Social a: </label>
                <select 
                    style={{width: '100%', padding: '8px', height:'42px'}}
                    value={nuevoIdPlataforma}
                    onChange={(e) => setNuevoIdPlataforma(e.target.value)}
                >
                    {catalogo.map(c => <option key={c.IdCatalogoSocial} value={c.IdCatalogoSocial}>{c.NombrePlataforma}</option>)}
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