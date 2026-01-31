import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarServicioCatalogo(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  
  const [nombre, setNombre] = useState('')

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID");
      try {
          const res = await api.get('/catalogo-servicios');
          const item = res.data.find(x => x.IdCatalogoServicio == idBusqueda);
          if(item) {
              setEncontrado(item);
              setNombre(item.NombreServicio);
              toast.success("Cargado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      if (!validarNull(nombre, 'Nombre').esValido) return toast.warning("Nombre requerido");
      
      try {
          await api.put(`/catalogo-servicios/${encontrado.IdCatalogoServicio}`, { nombre });
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
      <h1>Modificar Servicio (Catálogo)</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>ID Catálogo: </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
            <div className="form-group">
                <label>Nombre del Servicio: </label>
                <Textbox type="text" value={nombre} onChange={setNombre} />
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