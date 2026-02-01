import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt, validarCorreo } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarEmpRec(){

    const [nombre, setNombre] = useState('')
    const [cedulaJuridica, setCedulaJuridica] = useState('')
    const [correo, setCorreo] = useState('')
    const [nombreContacto, setNombreContacto] = useState('')
    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [seniasExactas, setSeniasExactas] = useState('')

    const LimpiarEmpRec = () => {
        setNombre(''); setCedulaJuridica(''); setCorreo('');
        setNombreContacto('');
        setProvincia(''); setCanton(''); setDistrito(''); setSeniasExactas('');
    }

    const mandarRequest = async () => {
        if (!validarNull(nombre, 'Nombre').esValido) return toast.warning("Nombre requerido");
        if (!validarInt(cedulaJuridica, 'Cédula').esValido) return toast.warning("Cédula inválida");
        if (!validarCorreo(correo).esValido) return toast.warning("Correo inválido");

        try {
            await api.post('/recreacion', {
                nombreComercial: nombre,
                cedulaJuridica: parseInt(cedulaJuridica),
                correoElectronico: correo,
                nombreContacto: nombreContacto,
                provincia, canton, distrito, senasExactas
            });
            toast.success("Empresa registrada correctamente.");
            LimpiarEmpRec();
        } catch (error) {
            toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
        }
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000}/>
            <h1>Insertar Empresa de Recreación</h1>

            <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
                
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                    <div className="form-group"><label>Nombre Comercial:</label><Textbox type="text" value={nombre} onChange={setNombre} /></div>
                    <div className="form-group"><label>Cédula Jurídica:</label><Textbox type="text" value={cedulaJuridica} onChange={setCedulaJuridica} /></div>
                </div>

                <div className="form-group"><label>Correo:</label><Textbox type="text" value={correo} onChange={setCorreo} /></div>
                
                <div className="form-group"><label>Nombre Contacto:</label><Textbox type="text" value={nombreContacto} onChange={setNombreContacto} /></div>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px'}}>
                    <div className="form-group"><label>Provincia:</label><Textbox type="text" value={provincia} onChange={setProvincia} /></div>
                    <div className="form-group"><label>Cantón:</label><Textbox type="text" value={canton} onChange={setCanton} /></div>
                    <div className="form-group"><label>Distrito:</label><Textbox type="text" value={distrito} onChange={setDistrito} /></div>
                </div>

                <div className="form-group"><label>Señas Exactas:</label><Textbox type="text" value={seniasExactas} onChange={setSeniasExactas} /></div>
                
                <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
                    <button onClick={mandarRequest}>Aceptar</button>
                    <button onClick={LimpiarEmpRec} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
                </div>
            </div>
        </>
    )
}