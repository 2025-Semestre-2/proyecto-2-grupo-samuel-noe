import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarReservacion(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  
  // Estados editables
  const [idCliente, setIdCliente] = useState('')
  const [idHab, setIdHab] = useState('')
  const [fechaIngreso, setFechaIngreso] = useState('')
  const [fechaSalida, setFechaSalida] = useState('')
  const [cantPersonas, setCantPersonas] = useState('')
  const [vehiculo, setVehiculo] = useState('0')
  const [estado, setEstado] = useState('Activo')

  const [clientes, setClientes] = useState([])
  const [habitaciones, setHabitaciones] = useState([])

  useEffect(() => {
      const cargarListas = async () => {
          try {
              const res = await api.get('/reservacion/listas');
              setClientes(res.data.clientes);
              setHabitaciones(res.data.habitaciones);
          } catch(e) {}
      };
      cargarListas();
  }, []);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID");
      try {
          const res = await api.get('/reservacion');
          const item = res.data.find(x => x.IdReservacion == idBusqueda);
          if(item) {
              setEncontrado(item);
              setIdCliente(item.IdCliente);
              setIdHab(item.IdHabitacion);
              setFechaIngreso(item.FechaHoraIngreso.replace('Z', '')); // Ajuste formato fecha
              setFechaSalida(item.FechaSalida.split('T')[0]);
              setCantPersonas(item.CantidadPersonas);
              setVehiculo(item.PoseeVehiculo ? '1' : '0');
              setEstado(item.Estado);
              
              if(item.Estado === 'Cerrado') toast.warning("Reserva CERRADA: Solo lectura.");
              else toast.success("Cargado");
          } else {
              toast.error("No encontrada");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      if (!validarInt(cantPersonas, 'Personas').esValido) return toast.warning("Cantidad inválida");

      if(estado === 'Cerrado' && encontrado.Estado === 'Activo'){
          if(!window.confirm("⚠️ ¿Está seguro de hacer CHECK-OUT? \nEsto CERRARÁ la reserva y generará la FACTURA automáticamente. No podrá deshacer esto.")) return;
      }

      try {
          await api.put(`/reservacion/${encontrado.IdReservacion}`, {
              idCliente: parseInt(idCliente),
              idHabitacion: parseInt(idHab),
              fechaIngreso,
              fechaSalida,
              cantPersonas: parseInt(cantPersonas),
              poseeVehiculo: vehiculo === '1',
              estado
          });
          toast.success(estado === 'Cerrado' ? "Reserva finalizada y Factura generada." : "Actualizado correctamente.");
          setEncontrado(null);
          setIdBusqueda('');
      } catch (e) { 
          toast.error("Error: " + (e.response?.data?.error || "Error al guardar")); 
      }
  }

  const isClosed = encontrado?.Estado === 'Cerrado';

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000}/>
      <h1>Modificar / Finalizar Reservación</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div style={{display:'flex', gap:'10px'}}>
            <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} placeholder="ID Reserva..." />
            <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: isClosed ? '#e2e3e5' : '#f9f9f9'}}>
            
            <div className="form-group" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                <div>
                    <label>Cliente: </label>
                    <select disabled={isClosed} style={{width:'100%', padding:'8px'}} value={idCliente} onChange={(e)=>setIdCliente(e.target.value)}>
                        {clientes.map(c => <option key={c.IdCliente} value={c.IdCliente}>{c.NombreCompleto}</option>)}
                    </select>
                </div>
                <div>
                    <label>Habitación: </label>
                    <select disabled={isClosed} style={{width:'100%', padding:'8px'}} value={idHab} onChange={(e)=>setIdHab(e.target.value)}>
                        {habitaciones.map(h => <option key={h.IdHabitacion} value={h.IdHabitacion}>H-{h.Numero}</option>)}
                    </select>
                </div>
            </div>

            <div className="form-group" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                <div><label>Check-In:</label><input disabled={isClosed} type="datetime-local" style={{width:'100%', padding:'8px'}} value={fechaIngreso} onChange={(e)=>setFechaIngreso(e.target.value)} /></div>
                <div><label>Check-Out:</label><input disabled={isClosed} type="date" style={{width:'100%', padding:'8px'}} value={fechaSalida} onChange={(e)=>setFechaSalida(e.target.value)} /></div>
            </div>

            <div className="form-group" style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'20px'}}>
                <div><label>Personas:</label><Textbox disabled={isClosed} type="number" value={cantPersonas} onChange={setCantPersonas} /></div>
                <div>
                    <label>Vehículo:</label>
                    <select disabled={isClosed} style={{width:'100%', padding:'8px'}} value={vehiculo} onChange={(e)=>setVehiculo(e.target.value)}>
                        <option value="0">No</option>
                        <option value="1">Sí</option>
                    </select>
                </div>
                <div>
                    <label style={{fontWeight:'bold', color: estado==='Cerrado'?'red':'green'}}>ESTADO:</label>
                    <select disabled={isClosed} style={{width:'100%', padding:'8px'}} value={estado} onChange={(e)=>setEstado(e.target.value)}>
                        <option value="Activo">Activo</option>
                        <option value="Cerrado">Cerrado (Check-Out)</option>
                    </select>
                </div>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                {!isClosed && <button onClick={guardar}>Guardar Cambios</button>}
                <button onClick={() => setEncontrado(null)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
            </div>
        </div>
      )}
    </>
  )
}