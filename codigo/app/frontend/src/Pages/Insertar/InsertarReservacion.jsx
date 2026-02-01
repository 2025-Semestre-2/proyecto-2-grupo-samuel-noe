import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarReservacion(){

  const [idCliente, setIdCliente] = useState('')
  const [idHab, setIdHab] = useState('')
  const [fechaIngreso, setFechaIngreso] = useState('')
  const [fechaSalida, setFechaSalida] = useState('')
  const [cantPersonas, setCantPersonas] = useState('1')
  const [vehiculo, setVehiculo] = useState('0')
  
  const [clientes, setClientes] = useState([])
  const [habitaciones, setHabitaciones] = useState([])

  useEffect(() => {
      const cargarListas = async () => {
          try {
              const res = await api.get('/reservacion/listas');
              setClientes(res.data.clientes);
              setHabitaciones(res.data.habitaciones);
          } catch(e) { console.error(e); }
      };
      cargarListas();
  }, []);

  const Limpiar = () => {
    setIdCliente(''); setIdHab(''); setFechaIngreso(''); setFechaSalida('');
    setCantPersonas('1'); setVehiculo('0');
  }

  const mandarRequest = async () => {
    if (!idCliente) return toast.warning("Seleccione Cliente");
    if (!idHab) return toast.warning("Seleccione Habitación");
    if (!fechaIngreso || !fechaSalida) return toast.warning("Seleccione fechas");
    if (!validarInt(cantPersonas, 'Personas').esValido) return toast.warning("Cantidad inválida");

    try {
        await api.post('/reservacion', {
            idCliente: parseInt(idCliente),
            idHabitacion: parseInt(idHab),
            fechaIngreso: fechaIngreso, // Enviar formato YYYY-MM-DD
            fechaSalida: fechaSalida,
            cantPersonas: parseInt(cantPersonas),
            poseeVehiculo: vehiculo === '1'
        });
        toast.success("Reservación creada correctamente.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Nueva Reservación</h1>
      
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
      
        <div className="form-group" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
            <div>
                <label>Cliente: </label>
                <select style={{width:'100%', padding:'8px'}} value={idCliente} onChange={(e)=>setIdCliente(e.target.value)}>
                    <option value="">-- Seleccione --</option>
                    {clientes.map(c => <option key={c.IdCliente} value={c.IdCliente}>{c.NombreCompleto}</option>)}
                </select>
            </div>
            <div>
                <label>Habitación: </label>
                <select style={{width:'100%', padding:'8px'}} value={idHab} onChange={(e)=>setIdHab(e.target.value)}>
                    <option value="">-- Seleccione --</option>
                    {habitaciones.map(h => <option key={h.IdHabitacion} value={h.IdHabitacion}>H-{h.Numero} ({h.Estado})</option>)}
                </select>
            </div>
        </div>

        <div className="form-group" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
            <div><label>Check-In:</label><input type="datetime-local" style={{width:'100%', padding:'8px'}} value={fechaIngreso} onChange={(e)=>setFechaIngreso(e.target.value)} /></div>
            <div><label>Check-Out:</label><input type="date" style={{width:'100%', padding:'8px'}} value={fechaSalida} onChange={(e)=>setFechaSalida(e.target.value)} /></div>
        </div>

        <div className="form-group" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
            <div><label>Personas:</label><Textbox type="number" value={cantPersonas} onChange={setCantPersonas} /></div>
            <div>
                <label>Vehículo:</label>
                <select style={{width:'100%', padding:'8px'}} value={vehiculo} onChange={(e)=>setVehiculo(e.target.value)}>
                    <option value="0">No</option>
                    <option value="1">Sí</option>
                </select>
            </div>
        </div>

        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={Limpiar} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
        </div>
      </div>
    </>
  )
}