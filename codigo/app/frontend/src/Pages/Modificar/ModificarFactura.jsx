import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarFactura(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  
  // Editables
  const [fechaEmision, setFechaEmision] = useState('')
  const [metodoPago, setMetodoPago] = useState('')
  const [cantNoches, setCantNoches] = useState('')
  const [importeTotal, setImporteTotal] = useState('')

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID");
      try {
          const res = await api.get('/factura');
          const item = res.data.find(x => x.IdFactura == idBusqueda);
          if(item) {
              setEncontrado(item);
              setFechaEmision(item.FechaEmision.replace('Z','')); // Ajuste UTC
              setMetodoPago(item.MetodoPago || ''); // Si es null, pone vacío
              setCantNoches(item.NumeroNoches);
              setImporteTotal(item.ImporteTotal);
              toast.success("Factura cargada");
          } else {
              toast.error("No encontrada");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      try {
          await api.put(`/factura/${encontrado.IdFactura}`, {
              fechaEmision,
              metodoPago: metodoPago || null,
              numeroNoches: parseInt(cantNoches),
              importeTotal: parseFloat(importeTotal)
          });
          toast.success("Factura actualizada correctamente.");
          setEncontrado(null);
          setIdBusqueda('');
      } catch (e) { 
          toast.error("Error: " + (e.response?.data?.error || "Error al guardar")); 
      }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Modificar / Pagar Factura</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div style={{display:'flex', gap:'10px'}}>
            <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} placeholder="ID Factura..." />
            <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
            
            <div className="form-group">
                <label>Cliente (Solo Lectura): </label>
                <input disabled type="text" value={encontrado.NombreCliente} style={{width:'100%', padding:'8px', backgroundColor:'#ccc'}} />
            </div>

            <div className="form-group" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                <div><label>Fecha Emisión:</label><input type="datetime-local" style={{width:'100%', padding:'8px'}} value={fechaEmision} onChange={(e)=>setFechaEmision(e.target.value)} /></div>
                
                <div>
                    <label style={{fontWeight:'bold', color:'blue'}}>MÉTODO DE PAGO:</label>
                    <select style={{width:'100%', padding:'8px', height:'42px', border:'2px solid blue'}} value={metodoPago} onChange={(e)=>setMetodoPago(e.target.value)}>
                        <option value="">-- PENDIENTE --</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta de Credito">Tarjeta de Crédito</option>
                    </select>
                </div>
            </div>

            <div className="form-group" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                <div><label>Noches:</label><Textbox type="number" value={cantNoches} onChange={setCantNoches} /></div>
                <div><label>Importe Total:</label><Textbox type="number" value={importeTotal} onChange={setImporteTotal} /></div>
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