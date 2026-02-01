import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt, validarCorreo } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarEmpRec(){

    const [idBusqueda, setIdBusqueda] = useState('');
    const [encontrado, setEncontrado] = useState(null);
    
    // Campos editables
    const [nombre, setNombre] = useState('')
    const [cedulaJuridica, setCedulaJuridica] = useState('')
    const [correo, setCorreo] = useState('')
    const [nombreContacto, setNombreContacto] = useState('')
    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [seniasExactas, setSeniasExactas] = useState('')

    const buscar = async () => {
        if(!idBusqueda) return toast.warning("Ingrese ID");
        try {
            const res = await api.get('/recreacion');
            const item = res.data.find(x => x.IdEmpresaRecreacion == idBusqueda);
            if(item) {
                setEncontrado(item);
                setNombre(item.NombreEmpresa);
                setCedulaJuridica(item.CedulaJuridica.toString());
                setCorreo(item.CorreoElectronico);
                setNombreContacto(item.NombreContacto);
                setProvincia(item.Provincia);
                setCanton(item.Canton);
                setDistrito(item.Distrito);
                setSeniasExactas(item.SenasExactas);
                toast.success("Empresa cargada");
            } else {
                toast.error("No encontrada");
                setEncontrado(null);
            }
        } catch (e) { toast.error("Error al buscar"); }
    }

    const guardar = async () => {
        if (!validarNull(nombre, 'Nombre').esValido) return toast.warning("Nombre requerido");
        if (!validarInt(cedulaJuridica, 'Cédula').esValido) return toast.warning("Cédula inválida");

        try {
            await api.put(`/recreacion/${encontrado.IdEmpresaRecreacion}`, {
                nombreEmpresa: nombre,
                cedulaJuridica: parseInt(cedulaJuridica),
                correoElectronico: correo,
                nombreContacto: nombreContacto,
                provincia, canton, distrito, senasExactas
            });
            toast.success("Actualizada correctamente.");
            setEncontrado(null);
            setIdBusqueda('');
        } catch (e) { 
            toast.error("Error: " + (e.response?.data?.error || "Error al guardar")); 
        }
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000}/>
            <h1>Modificar Empresa de Recreación</h1>

            <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
                <div className="form-group">
                    <label style={{fontWeight:'bold'}}>ID Empresa (Sistema): </label>
                    <div style={{display:'flex', gap:'10px'}}>
                        <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} />
                        <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
                    </div>
                </div>
            </div>

            {encontrado && (
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
                    
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                        <button onClick={guardar}>Guardar Cambios</button>
                        <button onClick={() => setEncontrado(null)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
                    </div>
                </div>
            )}
        </>
    )
}