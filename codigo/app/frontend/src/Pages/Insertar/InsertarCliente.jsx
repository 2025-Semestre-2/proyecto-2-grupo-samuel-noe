import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarCorreo } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarCliente(){

    const [nombre, setNombre] = useState('')
    const [apellido1, setApellido1] = useState('')
    const [apellido2, setApellido2] = useState('')
    const [fechaNac, setFechaNac] = useState('')
    
    const [tipoId, setTipoId] = useState('') 
    
    const [numId, setNumId] = useState('')
    const [pais, setPais] = useState('Costa Rica')
    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [correo, setCorreo] = useState('')

    const Limpiar = () => {
        setNombre(''); setApellido1(''); setApellido2('');
        setFechaNac(''); 
        setTipoId('');
        setNumId('');
        setPais('Costa Rica'); setProvincia(''); setCanton(''); setDistrito('');
        setCorreo('');
    }

    const mandarRequest = async () => {
        if (!validarNull(nombre, 'Nombre').esValido) return toast.warning("Nombre requerido");
        if (!validarNull(apellido1, '1er Apellido').esValido) return toast.warning("Apellido requerido");
        
        // CAMBIO 2: Validación explícita del Combo
        if (!tipoId) return toast.warning("Seleccione el Tipo de Identificación");
        
        if (!validarNull(numId, 'Identificación').esValido) return toast.warning("Cédula requerida");
        if (!validarCorreo(correo).esValido) return toast.warning("Correo inválido");

        try {
            await api.post('/cliente', {
                nombre,
                primerApellido: apellido1,
                segundoApellido: apellido2,
                fechaNacimiento: fechaNac,
                tipoIdentificacion: tipoId,
                numeroIdentificacion: numId,
                paisResidencia: pais,
                provincia, canton, distrito,
                correo
            });
            toast.success("Cliente registrado correctamente.");
            Limpiar();
        } catch (error) {
            toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
        }
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000}/>
            <h1>Insertar Cliente</h1>

            <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
                
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px'}}>
                    <div className="form-group"><label>Nombre:</label><Textbox type="text" value={nombre} onChange={setNombre} /></div>
                    <div className="form-group"><label>1er Apellido:</label><Textbox type="text" value={apellido1} onChange={setApellido1} /></div>
                    <div className="form-group"><label>2do Apellido:</label><Textbox type="text" value={apellido2} onChange={setApellido2} /></div>
                </div>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                    <div className="form-group">
                        <label>Tipo Identificación:</label>
                        <select 
                            style={{
                                width:'100%', 
                                padding:'8px', 
                                height:'42px', 
                                borderRadius:'4px', 
                                border:'1px solid #ccc', 
                                backgroundColor:'white',
                                color: '#333'
                            }} 
                            value={tipoId} 
                            onChange={(e)=>setTipoId(e.target.value)}
                        >
                            <option value="">-- Seleccione Tipo ID --</option>
                            <option value="Cedula Nacional">Cédula Nacional</option>
                            <option value="Pasaporte">Pasaporte</option>
                            <option value="DIMEX">DIMEX</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div className="form-group"><label>Número Identificación:</label><Textbox type="text" value={numId} onChange={setNumId} /></div>
                </div>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                    <div className="form-group"><label>Fecha Nacimiento:</label><input type="date" style={{width:'100%', padding:'8px', height:'42px'}} value={fechaNac} onChange={(e)=>setFechaNac(e.target.value)} /></div>
                    <div className="form-group"><label>Correo:</label><Textbox type="text" value={correo} onChange={setCorreo} /></div>
                </div>

                <div className="form-group"><label>País Residencia:</label><Textbox type="text" value={pais} onChange={setPais} /></div>
                
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px'}}>
                    <div className="form-group"><label>Provincia:</label><Textbox type="text" value={provincia} onChange={setProvincia} /></div>
                    <div className="form-group"><label>Cantón:</label><Textbox type="text" value={canton} onChange={setCanton} /></div>
                    <div className="form-group"><label>Distrito:</label><Textbox type="text" value={distrito} onChange={setDistrito} /></div>
                </div>

                <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
                    <button onClick={mandarRequest}>Aceptar</button>
                    <button onClick={Limpiar} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
                </div>
            </div>
        </>
    )
}