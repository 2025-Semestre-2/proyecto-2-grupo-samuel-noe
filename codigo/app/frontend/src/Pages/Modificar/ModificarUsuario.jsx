import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarUsuario(){

  const [usuarioBusqueda, setUsuarioBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  
  const [contra, setContra] = useState('')
  const [tipo, setTipo] = useState('')

  const buscar = async () => {
      if(!usuarioBusqueda) return toast.warning("Ingrese nombre de usuario");
      try {
          const res = await api.get('/usuario');
          const item = res.data.find(x => x.Usuario.toLowerCase() === usuarioBusqueda.toLowerCase());
          
          if(item) {
              setEncontrado(item);
              setContra(item.Contraseña);
              setTipo(item.TipoUsuario);
              toast.success("Usuario cargado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      if (!validarNull(contra, 'Contraseña').esValido) return toast.warning("Contraseña requerida");
      if (!tipo) return toast.warning("Seleccione un Rol");
      
      try {
          await api.put(`/usuario/${encodeURIComponent(encontrado.Usuario)}`, {
              contrasena: contra,
              tipoUsuario: tipo
          });
          toast.success("Credenciales actualizadas.");
          setEncontrado(null);
          setUsuarioBusqueda('');
      } catch (e) { 
          toast.error("Error: " + (e.response?.data?.error || "Error al guardar")); 
      }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Modificar Usuario</h1>
      
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>Buscar Usuario: </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={usuarioBusqueda} onChange={setUsuarioBusqueda} />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>

            <div className="form-group">
                <label>Usuario (PK - No editable): </label>
                <input disabled type="text" value={encontrado.Usuario} style={{width:'100%', padding:'8px', backgroundColor:'#ccc'}} />
            </div>

            <div className="form-group">
                <label>Nueva Contraseña: </label>
                <Textbox type="text" value={contra} onChange={setContra} />
            </div>

            <div className="form-group">
                <label>Tipo de Usuario: </label>
                <select 
                    style={{
                        width: '100%', padding: '8px', height:'42px', 
                        borderRadius:'4px', border:'1px solid #ccc', 
                        backgroundColor:'white', color: '#333'
                    }}
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="USUARIO">USUARIO</option>
                </select>
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={guardar}>Guardar Cambios</button>
                <button onClick={() => setEncontrado(null)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
            </div>
        </div>
      )}
    </>
  )
}