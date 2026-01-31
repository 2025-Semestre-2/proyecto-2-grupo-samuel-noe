import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function EliminarRedSocialHotel(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID de registro");
      
      try {
          const res = await api.get('/red-social-hotel');
          const item = res.data.find(x => x.IdRedSocial == idBusqueda);
          
          if(item) {
              setEncontrado(item);
              toast.success("Registro encontrado");
          } else {
              toast.error("Registro no encontrado");
              setEncontrado(null);
          }
      } catch (e) { 
          console.error(e);
          toast.error("Error al buscar"); 
      }
  }

  const eliminar = async () => {
      if(!window.confirm("¿Seguro que desea eliminar esta asociación permanentemente?")) return;
      
      try {
          await api.delete(`/red-social-hotel/${encontrado.IdRedSocial}`);
          toast.success("Eliminado correctamente.");
          setEncontrado(null);
          setIdBusqueda('');
      } catch (error) { 
          toast.error("Error: " + (error.response?.data?.error || "Error al eliminar")); 
      }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Eliminar Red Social de Hotel</h1>

      <div style={{
        border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'
      }}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>ID de Registro (Tabla Intermedia): </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} placeholder="Ingrese ID..." />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
            <small style={{color: '#666'}}>Puede consultar los IDs en el módulo "Reportar Redes Sociales".</small>
        </div>
      </div>

      {encontrado && (
        <div style={{
            border: '2px solid #d9534f', // Borde rojo para indicar zona de peligro
            borderRadius: '4px', padding: '30px', backgroundColor: '#fff5f5'
        }}>
            <h3 style={{color: '#d9534f', marginTop: 0, textAlign:'center'}}>⚠ ¿Eliminar esta asociación?</h3>

            <div className="form-group">
                <label>Hotel: </label>
                <input disabled type="text" value={encontrado.Hotel} 
                       style={{width:'100%', padding:'8px', backgroundColor:'#e9ecef', border:'1px solid #ccc', borderRadius:'4px'}} />
            </div>

            <div className="form-group">
                <label>ID Hotel: </label>
                <input disabled type="text" value={encontrado.IdHospedaje} 
                       style={{width:'100%', padding:'8px', backgroundColor:'#e9ecef', border:'1px solid #ccc', borderRadius:'4px'}} />
            </div>

            <div className="form-group">
                <label>Red Social: </label>
                <input disabled type="text" value={encontrado.RedSocial} 
                       style={{width:'100%', padding:'8px', backgroundColor:'#e9ecef', border:'1px solid #ccc', borderRadius:'4px'}} />
            </div>

            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px'}}>
                <button onClick={eliminar} style={{backgroundColor:'#dc3545', color:'white', fontWeight:'bold'}}>
                    Eliminar Definitivamente
                </button>
                <button onClick={() => setEncontrado(null)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
            </div>
        </div>
      )}
    </>
  )
}