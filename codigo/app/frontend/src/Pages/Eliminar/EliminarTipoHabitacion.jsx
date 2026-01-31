import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function EliminarTipoHabitacion(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID");
      try {
          const res = await api.get('/tipo-habitacion');
          const item = res.data.find(x => x.IdTipoHabitacion == idBusqueda);
          if(item) {
              setEncontrado(item);
              toast.success("Encontrado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error de conexión"); }
  }

  const eliminar = async () => {
      if(!window.confirm("¿Eliminar este Tipo de Habitación?")) return;
      try {
          await api.delete(`/tipo-habitacion/${encontrado.IdTipoHabitacion}`);
          toast.success("Eliminado correctamente.");
          setEncontrado(null);
          setIdBusqueda('');
      } catch (error) {
          const msg = error.response?.data?.error || "Error al eliminar";
          toast.error("Error " + msg);
      }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000}/>
      <h1>Eliminar Tipo de Habitación</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>ID Tipo Habitación: </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} placeholder="ID..." />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #d9534f', borderRadius: '4px', padding: '30px', backgroundColor: '#fff5f5'}}>
            <h3 style={{color: '#d9534f', marginTop: 0, textAlign:'center'}}>¿Eliminar Registro?</h3>
            
            <div className="form-group">
                <label>Hotel: </label>
                <input disabled type="text" value={encontrado.Hotel} className="form-control" style={{width:'100%', padding:'8px'}} />
            </div>
            <div className="form-group">
                <label>Nombre Tipo: </label>
                <input disabled type="text" value={encontrado.Nombre} className="form-control" style={{width:'100%', padding:'8px', fontWeight:'bold'}} />
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