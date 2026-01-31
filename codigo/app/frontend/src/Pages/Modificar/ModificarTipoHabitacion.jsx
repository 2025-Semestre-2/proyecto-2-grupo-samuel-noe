import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarTipoHabitacion(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  
  const [nombre, setNombre] = useState('')
  const [desc, setDesc] = useState('')
  const [tipoCama, setTipoCama] = useState('')
  const [precio, setPrecio] = useState('')

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID");
      try {
          const res = await api.get('/tipo-habitacion');
          const item = res.data.find(x => x.IdTipoHabitacion == idBusqueda);
          if(item) {
              setEncontrado(item);
              setNombre(item.Nombre);
              setDesc(item.Descripcion);
              setTipoCama(item.TipoCama);
              setPrecio(item.PrecioPorNoche.toString());
              toast.success("Cargado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      if (!validarNull(nombre, 'Nombre').esValido) return toast.warning("Nombre requerido");
      if (!validarInt(precio, 'Precio').esValido) return toast.warning("Precio inválido");

      try {
          await api.put(`/tipo-habitacion/${encontrado.IdTipoHabitacion}`, {
              nombre,
              descripcion: desc,
              tipoCama,
              precio: parseFloat(precio)
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
      <h1>Modificar Tipo de Habitación</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>ID Tipo Habitación: </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
            <div className="form-group">
                <label>Hotel (Solo Lectura): </label>
                <input disabled type="text" value={encontrado.Hotel} style={{width:'100%', padding:'8px', backgroundColor:'#ccc'}} />
            </div>

            <div className="form-group"><label>Nombre: </label><Textbox type="text" value={nombre} onChange={setNombre} /></div>
            <div className="form-group"><label>Descripción: </label><Textbox type="text" value={desc} onChange={setDesc} /></div>
            
            <div className="form-group">
                <label>Tipo de Cama: </label>
                <select 
                    style={{width: '100%', padding: '8px', height:'42px', borderRadius:'4px', border:'1px solid #ccc', backgroundColor:'white'}}
                    value={tipoCama} onChange={(e) => setTipoCama(e.target.value)}
                >
                    <option value="Individual">Individual</option>
                    <option value="Queen">Queen</option>
                    <option value="King">King</option>
                </select>
            </div>

            <div className="form-group"><label>Precio: </label><Textbox type="text" value={precio} onChange={setPrecio} /></div>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={guardar}>Guardar Cambios</button>
                <button onClick={() => setEncontrado(null)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
            </div>
        </div>
      )}
    </>
  )
}