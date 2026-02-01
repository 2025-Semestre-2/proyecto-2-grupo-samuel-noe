import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function EliminarReservacion(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID");
      try {
          const res = await api.get('/reservacion');
          const item = res.data.find(x => x.IdReservacion == idBusqueda);
          if(item) {
              setEncontrado(item);
              toast.success("Cargado");
          } else {
              toast.error("No encontrada");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const eliminar = async () => {
      if(encontrado.Estado === 'Cerrado') {
          toast.error("¡Error! No se puede eliminar una reserva CERRADA (Histórico).");
          return;
      }
      if(!window.confirm(`¿Eliminar la reserva #${encontrado.IdReservacion}?`)) return;
      
      try {
          await api.delete(`/reservacion/${encontrado.IdReservacion}`);
          toast.success("Eliminada correctamente.");
          setEncontrado(null);
          setIdBusqueda('');
      } catch (error) {
          toast.error("Error: " + (error.response?.data?.error || "Error al eliminar"));
      }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000}/>
      <h1>Eliminar Reservación</h1>
      
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div className="form-group" style={{display:'flex', gap:'10px'}}>
            <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} placeholder="ID Reserva..." />
            <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #d9534f', borderRadius: '4px', padding: '30px', backgroundColor: '#fff5f5'}}>
            <h3>Datos de Reserva</h3>
            <p><strong>Cliente:</strong> {encontrado.NombreCliente}</p>
            <p><strong>Habitación:</strong> {encontrado.NumeroHabitacion}</p>
            <p><strong>Estado:</strong> {encontrado.Estado}</p>
            
            {encontrado.Estado === 'Cerrado' ? (
                <div style={{color:'red', fontWeight:'bold', marginTop:'10px'}}>
                    ESTA RESERVA YA FUE FINALIZADA Y FACTURADA. NO SE PUEDE ELIMINAR.
                </div>
            ) : (
                <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px'}}>
                    <button onClick={eliminar} style={{backgroundColor:'#dc3545', color:'white'}}>Eliminar</button>
                    <button onClick={() => setEncontrado(null)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
                </div>
            )}
        </div>
      )}
    </>
  )
}