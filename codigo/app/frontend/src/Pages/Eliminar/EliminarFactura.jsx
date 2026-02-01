import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function EliminarFactura(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID Factura");
      try {
          const res = await api.get('/factura');
          const item = res.data.find(x => x.IdFactura == idBusqueda);
          if(item) {
              setEncontrado(item);
              toast.success("Factura cargada");
          } else {
              toast.error("No encontrada");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const eliminar = async () => {
      if(!window.confirm(`¿Eliminar factura #${encontrado.IdFactura}?`)) return;
      try {
          await api.delete(`/factura/${encontrado.IdFactura}`);
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
      <h1>Eliminar Factura</h1>
      
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div style={{display:'flex', gap:'10px'}}>
            <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} placeholder="ID Factura..." />
            <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #d9534f', borderRadius: '4px', padding: '30px', backgroundColor: '#fff5f5'}}>
            <h3>Detalle Factura</h3>
            <p><strong>Cliente:</strong> {encontrado.NombreCliente}</p>
            <p><strong>Monto:</strong> ₡ {encontrado.ImporteTotal}</p>
            <p><strong>Estado:</strong> {encontrado.MetodoPago || 'PENDIENTE DE PAGO'}</p>

            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px'}}>
                <button onClick={eliminar} style={{backgroundColor:'#dc3545', color:'white'}}>Eliminar Definitivamente</button>
                <button onClick={() => setEncontrado(null)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
            </div>
        </div>
      )}
    </>
  )
}