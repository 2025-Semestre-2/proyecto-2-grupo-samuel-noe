import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function EliminarEmpRecTipoServicio(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID de Relación");
      try {
          const res = await api.get('/empresa-servicio');
          const item = res.data.find(x => x.ID == idBusqueda);
          if(item) {
              setEncontrado(item);
              toast.success("Registro encontrado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error de conexión"); }
  }

  const eliminar = async () => {
      if(!window.confirm(`¿Desvincular "${encontrado.Servicio}" de "${encontrado.Empresa}"?`)) return;
      try {
          await api.delete(`/empresa-servicio/${encontrado.ID}`);
          toast.success("Desvinculado correctamente.");
          setEncontrado(null);
          setIdBusqueda('');
      } catch (error) {
          toast.error("Error: " + (error.response?.data?.error || "Error al eliminar"));
      }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000}/>
      <h1>Eliminar Asignación de Servicio</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>ID de Asignación: </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} placeholder="ID..." />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #d9534f', borderRadius: '4px', padding: '30px', backgroundColor: '#fff5f5'}}>
            <h3 style={{color: '#d9534f', marginTop: 0, textAlign:'center'}}>¿Eliminar esta relación?</h3>
            
            <div className="form-group">
                <label>Empresa: </label>
                <input disabled type="text" value={encontrado.Empresa} className="form-control" style={{width:'100%', padding:'8px'}} />
            </div>
            
            <div className="form-group">
                <label>Servicio Ofrecido: </label>
                <input disabled type="text" value={encontrado.Servicio} className="form-control" style={{width:'100%', padding:'8px', fontWeight:'bold'}} />
            </div>

            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px'}}>
                <button onClick={eliminar} style={{backgroundColor:'#dc3545', color:'white'}}>Eliminar</button>
                <button onClick={() => setEncontrado(null)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
            </div>
        </div>
      )}
    </>
  )
}