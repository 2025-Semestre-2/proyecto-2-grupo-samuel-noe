import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarHabitacion(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  
  // Campos editables
  const [idTipoHab, setIdTipoHab] = useState('');
  const [numHab, setNumHab] = useState('');
  const [estado, setEstado] = useState('');
  
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
      const cargar = async () => {
          try {
            const res = await api.get('/habitacion/tipos');
            setTipos(res.data);
          } catch(e) { console.error(e); }
      };
      cargar();
  }, []);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID");
      try {
          const res = await api.get('/habitacion');
          const item = res.data.find(x => x.IdHabitacion == idBusqueda);
          if(item) {
              setEncontrado(item);
              setIdTipoHab(item.IdTipoHabitacion.toString());
              setNumHab(item.NumeroHabitacion.toString());
              setEstado(item.Estado);
              toast.success("Cargado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      if (!validarInt(numHab, 'Número').esValido) return toast.warning("Número inválido");

      try {
          await api.put(`/habitacion/${encontrado.IdHabitacion}`, {
              idTipoHabitacion: parseInt(idTipoHab),
              numeroHabitacion: parseInt(numHab),
              estado: estado
          });
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
      <h1>Modificar Habitación</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>ID Habitación: </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
            
            <div className="form-group">
                <label>Tipo de Habitación: </label>
                <select 
                    style={{width: '100%', padding: '8px', height:'42px', borderRadius:'4px', backgroundColor:'white'}}
                    value={idTipoHab} onChange={(e) => setIdTipoHab(e.target.value)}
                >
                    {tipos.map(t => (
                        <option key={t.IdTipoHabitacion} value={t.IdTipoHabitacion}>
                            {t.Hotel} - {t.Nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Número de Habitación: </label>
                <Textbox type="text" value={numHab} onChange={setNumHab} />
            </div>

            <div className="form-group">
                <label>Estado: </label>
                <select 
                    style={{width: '100%', padding: '8px', height:'42px', borderRadius:'4px', backgroundColor:'white'}}
                    value={estado} onChange={(e) => setEstado(e.target.value)}
                >
                    <option value="Disponible">Disponible</option>
                    <option value="Ocupada">Ocupada</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                    <option value="Limpieza">Limpieza</option>
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