import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function EliminarUsuario(){

  const [usuarioBusqueda, setUsuarioBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);

  const buscar = async () => {
      if(!usuarioBusqueda) return toast.warning("Ingrese nombre de usuario");
      try {
          const res = await api.get('/usuario');
          const item = res.data.find(x => x.Usuario.toLowerCase() === usuarioBusqueda.toLowerCase());
          
          if(item) {
              setEncontrado(item);
              toast.success("Usuario encontrado");
          } else {
              toast.error("Usuario no encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error de conexión"); }
  }

  const eliminar = async () => {
      if(!window.confirm(`¿Eliminar definitivamente al usuario "${encontrado.Usuario}"?`)) return;
      
      try {
          await api.delete(`/usuario/${encodeURIComponent(encontrado.Usuario)}`);
          toast.success("Usuario eliminado.");
          setEncontrado(null);
          setUsuarioBusqueda('');
      } catch (error) {
          toast.error("Error: " + (error.response?.data?.error || "Error al eliminar"));
      }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000}/>
      <h1>Eliminar Usuario</h1>
      
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>Nombre de Usuario: </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={usuarioBusqueda} onChange={setUsuarioBusqueda} placeholder="Ej: admin" />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #d9534f', borderRadius: '4px', padding: '30px', backgroundColor: '#fff5f5'}}>
            <h3 style={{color: '#d9534f', marginTop: 0, textAlign:'center'}}>¿Eliminar Acceso?</h3>

            <div className="form-group">
                <label>Usuario: </label>
                <input disabled type="text" value={encontrado.Usuario} className="form-control" style={{width:'100%', padding:'8px', fontWeight:'bold'}} />
            </div>

            <div className="form-group">
                <label>Rol Actual: </label>
                <input disabled type="text" value={encontrado.TipoUsuario} className="form-control" style={{width:'100%', padding:'8px'}} />
            </div>

            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px'}}>
                <button onClick={eliminar} style={{backgroundColor:'#dc3545', color:'white'}}>Eliminar Definitivamente</button>
                <button onClick={() => setEncontrado(null)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
            </div>
        </div>
      )}
    </>
  )
}