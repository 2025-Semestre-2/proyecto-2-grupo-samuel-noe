import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarServicio(){

  const [nombre, setNombre] = useState('')
  const [desc, setDesc] = useState('')
  const [costo, setCosto] = useState('')

  const Limpiar = () => {
    setNombre('')
    setDesc('')
    setCosto('')
  }

  const mandarRequest = async () => {
    if (!validarNull(nombre, 'Nombre Servicio').esValido) return toast.warning("Nombre requerido");
    if (!validarInt(costo, 'Costo').esValido) return toast.warning("Costo inválido");

    try {
        await api.post('/tipo-servicio', {
            nombreTipoServicio: nombre,
            descripcion: desc,
            costo: parseInt(costo)
        });
        toast.success("Servicio registrado correctamente.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Insertar Servicio Empresa</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
      
        <div className="form-group">
            <label>Nombre del Servicio: </label>
            <Textbox type="text" placeholder="Ej: Transporte VIP" value={nombre} onChange={setNombre} />
        </div>

        <div className="form-group">
            <label>Descripción: </label>
            <Textbox type="text" placeholder="Detalles..." value={desc} onChange={setDesc} />
        </div>

        <div className="form-group">
            <label>Costo: </label>
            <Textbox type="text" placeholder="Ej: 15000" value={costo} onChange={setCosto} />
        </div>
        
        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={Limpiar} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
        </div>
      </div>
    </>
  )
}