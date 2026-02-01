import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarTipoActividad(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  
  // Campos editables
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [costo, setCosto] = useState('')

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID");
      try {
          const res = await api.get('/tipo-actividad');
          const item = res.data.find(x => x.IdTipoActividad == idBusqueda);
          if(item) {
              setEncontrado(item);
              setNombre(item.NombreTipoActividad);
              setDescripcion(item.Descripcion);
              setCosto(item.Costo.toString());
              toast.success("Cargado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      if (!validarNull(nombre, 'Nombre').esValido) return toast.warning("Nombre requerido");
      if (!validarInt(costo, 'Costo').esValido) return toast.warning("Costo inválido");

      try {
          await api.put(`/tipo-actividad/${encontrado.IdTipoActividad}`, {
              nombreTipoActividad: nombre,
              descripcion: descripcion,
              costo: parseInt(costo)
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
      <h1>Modificar Tipo de Actividad</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>ID Tipo Actividad: </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
            <div className="form-group">
                <label>Nombre Actividad: </label>
                <Textbox type="text" value={nombre} onChange={setNombre} />
            </div>

            <div className="form-group">
                <label>Descripción: </label>
                <Textbox type="text" value={descripcion} onChange={setDescripcion} />
            </div>

            <div className="form-group">
                <label>Costo: </label>
                <Textbox type="text" value={costo} onChange={setCosto} />
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