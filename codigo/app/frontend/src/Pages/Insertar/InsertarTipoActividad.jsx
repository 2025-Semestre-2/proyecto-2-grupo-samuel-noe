import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarTipoActividad(){

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [costo, setCosto] = useState('')

  const Limpiar = () => {
    setNombre('')
    setDescripcion('')
    setCosto('')
  }

  const mandarRequest = async () => {
    // Validaciones
    if (!validarNull(nombre, 'Nombre Actividad').esValido) return toast.warning("Nombre requerido");
    if (!validarInt(costo, 'Costo').esValido) return toast.warning("Costo inválido (solo números)");

    try {
        await api.post('/tipo-actividad', {
            nombreTipoActividad: nombre,
            descripcion: descripcion,
            costo: parseInt(costo)
        });
        toast.success("Tipo de actividad registrado correctamente.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Insertar Tipo de Actividad</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
      
        <div className="form-group">
            <label>Nombre de Actividad: </label>
            <Textbox 
                type="text" 
                placeholder="Ej: Canopy Tour" 
                value={nombre} 
                onChange={setNombre} 
            />
        </div>

        <div className="form-group">
            <label>Descripción: </label>
            <Textbox 
                type="text" 
                placeholder="Detalles de la actividad..." 
                value={descripcion} 
                onChange={setDescripcion} 
            />
        </div>

        <div className="form-group">
            <label>Costo (Colones): </label>
            <Textbox 
                type="text" 
                placeholder="Ej: 5000" 
                value={costo} 
                onChange={setCosto} 
            />
        </div>
        
        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={Limpiar} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
        </div>
      </div>
    </>
  )
}