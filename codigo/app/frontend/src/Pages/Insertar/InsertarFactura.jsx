import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarFactura(){

  const [idReserva, setIdReserva] = useState('')
  const [fechaEmision, setFechaEmision] = useState('')
  const [metodoPago, setMetodoPago] = useState('')
  const [cantNoches, setCantNoches] = useState('')
  const [importeTotal, setImporteTotal] = useState('')

  const LimpiarFactura = () => {
    setIdReserva(''); setFechaEmision(''); setMetodoPago('');
    setCantNoches(''); setImporteTotal('');
  }

  const mandarRequest = async () => {
    if (!validarInt(idReserva, 'ID Reserva').esValido) return toast.warning("ID Reserva inválido");
    if (!validarNull(fechaEmision, 'Fecha').esValido) return toast.warning("Fecha requerida");
    if (!validarInt(cantNoches, 'Noches').esValido) return toast.warning("Noches inválidas");
    if (!importeTotal) return toast.warning("Importe requerido");

    try {
        await api.post('/factura', {
            idReservacion: parseInt(idReserva),
            fechaEmision: fechaEmision,
            metodoPago: metodoPago || null,
            numeroNoches: parseInt(cantNoches),
            importeTotal: parseFloat(importeTotal)
        });
        toast.success("Factura registrada correctamente.");
        LimpiarFactura();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Insertar Factura (Manual)</h1>
      
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
      
        <div className="alert alert-info" style={{marginBottom:'15px', color:'#0c5460', backgroundColor:'#d1ecf1', padding:'10px', borderRadius:'4px'}}>
            Nota: Las facturas se generan automáticamente al cerrar una reserva. Use esto solo para correcciones.
        </div>

        <div className="form-group" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
            <div><label>ID Reserva: </label><Textbox type="number" value={idReserva} onChange={setIdReserva} /></div>
            <div><label>Fecha Emisión: </label><input type="datetime-local" style={{width:'100%', padding:'8px'}} value={fechaEmision} onChange={(e)=>setFechaEmision(e.target.value)} /></div>
        </div>

        <div className="form-group" style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'20px'}}>
            <div>
                <label>Método Pago: </label>
                <select style={{width:'100%', padding:'8px', height:'42px'}} value={metodoPago} onChange={(e)=>setMetodoPago(e.target.value)}>
                    <option value="">Pendiente de Pago</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta de Credito">Tarjeta de Crédito</option>
                </select>
            </div>
            <div><label>Cant. Noches: </label><Textbox type="number" value={cantNoches} onChange={setCantNoches} /></div>
            <div><label>Total (₡): </label><Textbox type="number" value={importeTotal} onChange={setImporteTotal} /></div>
        </div>
        
        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={LimpiarFactura} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
        </div>
      </div>
    </>
  )
}