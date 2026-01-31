import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarRedSocial(){

  const [nombre, setNombre] = useState('')
  const [url, setUrl] = useState('')

  const Limpiar = () => {
    setNombre('')
    setUrl('')
  }

  const mandarRequest = async () => {
    if (!validarNull(nombre, 'Nombre').esValido) return toast.warning("Nombre requerido");
    if (!validarNull(url, 'URL').esValido) return toast.warning("URL requerida");

    try {
        await api.post('/catalogo-redes', { nombre, url });
        toast.success("Plataforma agregada al catálogo.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Insertar Red Social (Catálogo)</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
      
        <div className="form-group">
            <label>Nombre Plataforma: </label>
            <Textbox type="text" placeholder="Ej: Instagram" value={nombre} onChange={setNombre} />
        </div>

        <div className="form-group">
            <label>URL Base: </label>
            <Textbox type="text" placeholder="Ej: www.instagram.com" value={url} onChange={setUrl} />
        </div>
        
        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={Limpiar} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
        </div>
      </div>
    </>
  )
}