import '../App.css'  
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Textbox } from "../Components/Textbox"
import api from '../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Login(){

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!user || !password) {
            toast.warning("Ingrese usuario y contraseña"); return;
        }
        try {
            const response = await api.post('/auth/login', { user, password });
            if (response.data.success) {
                toast.success("Inicio de sesión exitoso");
                setTimeout(() => { navigate("/Home"); }, 1500);
            }
        } catch (error) {
            const msg = error.response?.data?.error || "Error de conexión";
            toast.error(msg);
        }
    }

    return(
        <>
            <ToastContainer position="top-center" autoClose={3000}/>
            <h1 style={{marginBottom: '10px'}}> Sistema de Gestión Hotelera </h1>
            <h3 style={{marginTop: 0, marginBottom: '30px', color: '#666'}}>Inicie Sesión</h3>

            <div style={{
                maxWidth: '400px',
                margin: '0 auto', 
                padding: '35px',
                border: '2px solid #333',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
                
                <div className="form-group" style={{display: 'flex', flexDirection: 'column', marginBottom: '20px', textAlign: 'left'}}>
                    <label style={{fontWeight: 'bold', marginBottom: '5px'}}>Usuario:</label>
                    <Textbox
                        type="text"
                        placeholder="Ej: admin"
                        value={user}
                        onChange={setUser}
                        style={{width: '100%'}}
                    />
                </div>

                <div className="form-group" style={{display: 'flex', flexDirection: 'column', marginBottom: '25px', textAlign: 'left'}}>
                    <label style={{fontWeight: 'bold', marginBottom: '5px'}}>Contraseña:</label>
                    <Textbox
                        type="password"
                        placeholder="Ej: ******"
                        value={password}
                        onChange={setPassword}
                        style={{width: '100%'}}
                    />
                </div>

                <button onClick={handleLogin} style={{width: '100%', padding: '12px', fontSize: '16px', cursor: 'pointer'}}>
                    Ingresar
                </button>
            </div>
        </>
    )
}