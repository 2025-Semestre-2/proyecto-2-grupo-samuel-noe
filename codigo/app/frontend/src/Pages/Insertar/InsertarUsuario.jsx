import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarUsuario(){

  const [usuario, setUsuario] = useState('')
  const [contra, setContra] = useState('')
  
  const [tipo, setTipo] = useState('') 

  const Limpiar = () => {
    setUsuario('')
    setContra('')
    setTipo('')
  }

  const mandarRequest = async () => {
    if (!validarNull(usuario, 'Nombre de Usuario').esValido) return toast.warning("Ingrese nombre de usuario");
    if (!validarNull(contra, 'Contraseña').esValido) return toast.warning("Ingrese contraseña");
    
    if (!tipo) return toast.warning("Seleccione el Tipo de Usuario (ADMIN/USUARIO)");

    try {
        await api.post('/usuario', {
            usuario: usuario,
            contrasena: contra,
            tipoUsuario: tipo
        });
        toast.success("Usuario registrado correctamente.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Insertar Usuario</h1>
      
      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
      
        <div className="form-group">
            <label>Nombre de Usuario (Login): </label>
            <Textbox type="text" placeholder="Ej: admin01" value={usuario} onChange={setUsuario} />
        </div>

        <div className="form-group">
            <label>Contraseña: </label>
            <Textbox type="password" placeholder="******" value={contra} onChange={setContra} />
        </div>

        <div className="form-group">
            <label>Tipo de Usuario: </label>
            <select 
                style={{
                    width: '100%', padding: '8px', height:'42px', 
                    borderRadius:'4px', border:'1px solid #ccc', 
                    backgroundColor:'white', color: '#333'
                }}
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
            >
                <option value="">-- Seleccione Rol --</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USUARIO">USUARIO</option>
            </select>
        </div>

        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={Limpiar} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
        </div>
      </div>
    </>
  )
}