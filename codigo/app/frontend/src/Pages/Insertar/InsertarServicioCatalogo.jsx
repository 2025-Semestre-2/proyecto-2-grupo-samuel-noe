import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarServicioCatalogo(){

  const [nombre, setNombre] = useState('')

  const Limpiar = () => {
    setNombre('')
  }

  const mandarRequest = async () => {
    if (!validarNull(nombre, 'Nombre del Servicio').esValido) return toast.warning("Nombre requerido");

    try {
        await api.post('/catalogo-servicios', { nombre });
        toast.success("Servicio agregado al catálogo.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Insertar Servicio (Catálogo)</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
      
        <div className="form-group">
            <label>Nombre del Servicio: </label>
            <Textbox type="text" placeholder="Ej: Aire Acondicionado" value={nombre} onChange={setNombre} />
        </div>
        
        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={Limpiar} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
        </div>
      </div>
    </>
  )
}