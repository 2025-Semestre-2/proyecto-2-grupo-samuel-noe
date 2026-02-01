import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarCorreo } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarCliente(){

    const [idBusqueda, setIdBusqueda] = useState('');
    const [encontrado, setEncontrado] = useState(null);
    
    // Campos editables
    const [nombre, setNombre] = useState('')
    const [apellido1, setApellido1] = useState('')
    const [apellido2, setApellido2] = useState('')
    const [fechaNac, setFechaNac] = useState('')
    const [tipoId, setTipoId] = useState('')
    const [numId, setNumId] = useState('')
    const [pais, setPais] = useState('')
    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [correo, setCorreo] = useState('')

    const buscar = async () => {
        if(!idBusqueda) return toast.warning("Ingrese ID o Cédula");
        try {
            const res = await api.get('/cliente');
            const item = res.data.find(x => x.IdCliente == idBusqueda || x.NumeroIdentificacion == idBusqueda);
            if(item) {
                setEncontrado(item);
                setNombre(item.Nombre);
                setApellido1(item.PrimerApellido);
                setApellido2(item.SegundoApellido);
                
                const fecha = item.FechaNacimiento ? item.FechaNacimiento.split('T')[0] : '';
                setFechaNac(fecha);
                
                setTipoId(item.TipoIdentificacion); 
                
                setNumId(item.NumeroIdentificacion);
                setPais(item.PaisResidencia);
                setProvincia(item.Provincia);
                setCanton(item.Canton);
                setDistrito(item.Distrito);
                setCorreo(item.CorreoElectronico);
                toast.success("Cliente cargado");
            } else {
                toast.error("No encontrado");
                setEncontrado(null);
            }
        } catch (e) { toast.error("Error al buscar"); }
    }

    const guardar = async () => {
        if (!validarNull(nombre, 'Nombre').esValido) return toast.warning("Nombre requerido");
        if (!tipoId) return toast.warning("Seleccione Tipo de Identificación");
        if (!validarCorreo(correo).esValido) return toast.warning("Correo inválido");

        try {
            await api.put(`/cliente/${encontrado.IdCliente}`, {
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
            <h1>Modificar Cliente</h1>

            <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
                <div className="form-group">
                    <label style={{fontWeight:'bold'}}>Buscar por ID (BD) o Cédula: </label>
                    <div style={{display:'flex', gap:'10px'}}>
                        <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} />
                        <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
                    </div>
                </div>
            </div>

            {encontrado && (
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
                        <div className="form-group"><label>Cédula:</label><Textbox type="text" value={numId} onChange={setNumId} /></div>
                    </div>

                    <div className="form-group"><label>Fecha Nacimiento:</label><input type="date" style={{width:'100%', padding:'8px'}} value={fechaNac} onChange={(e)=>setFechaNac(e.target.value)} /></div>
                    <div className="form-group"><label>Correo:</label><Textbox type="text" value={correo} onChange={setCorreo} /></div>
                    <div className="form-group"><label>País:</label><Textbox type="text" value={pais} onChange={setPais} /></div>
                    
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px'}}>
                        <div className="form-group"><label>Provincia:</label><Textbox type="text" value={provincia} onChange={setProvincia} /></div>
                        <div className="form-group"><label>Cantón:</label><Textbox type="text" value={canton} onChange={setCanton} /></div>
                        <div className="form-group"><label>Distrito:</label><Textbox type="text" value={distrito} onChange={setDistrito} /></div>
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