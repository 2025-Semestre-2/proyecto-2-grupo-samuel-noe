import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarServicioHospedaje(){

  const [idHotel, setIdHotel] = useState('')
  const [idServicio, setIdServicio] = useState('')
  const [catalogo, setCatalogo] = useState([])

  useEffect(() => {
    const cargar = async () => {
        try {
            const res = await api.get('/servicio-hospedaje/catalogo');
            console.log("Datos del catálogo:", res.data); // <--- MIRA LA CONSOLA DEL NAVEGADOR (F12)
            setCatalogo(res.data);
            
            if (res.data && res.data.length > 0) {
                const primerId = res.data[0].IdCatalogoServicio; 
                setIdServicio(primerId.toString());
            } 
        } catch (e) { 
            console.error(e);
            toast.error("Error cargando catálogo"); 
        }
    };
    cargar();
  }, []);

  const Limpiar = () => {
    setIdHotel('');
    if(catalogo.length > 0) setIdServicio(catalogo[0].IdCatalogoServicio.toString());
    else setIdServicio('');
  }

  const mandarRequest = async () => {
    if (!validarInt(idHotel, 'ID Hotel').esValido) return toast.warning("ID Hotel inválido");
    
    if (!idServicio || catalogo.length === 0) return toast.error("Debe seleccionar un servicio.");

    try {
        await api.post('/servicio-hospedaje', {
            idHospedaje: parseInt(idHotel),
            idServicio: parseInt(idServicio)
        });
        toast.success("Servicio asociado correctamente.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Insertar Servicio a Hospedaje</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
      
        <div className="form-group">
            <label>Cédula Jurídica del Hotel: </label>
            <Textbox type="text" value={idHotel} onChange={setIdHotel} placeholder="Ingrese ID..." />
        </div>
        
        <div className="form-group">
            <label>Servicio a Asociar: </label>
            <select 
                style={{
                    width: '100%', 
                    padding: '8px', 
                    height:'42px', 
                    borderRadius:'4px', 
                    border:'1px solid #ccc', 
                    backgroundColor: 'white',
                    color: '#333'
                }}
                value={idServicio}
                onChange={(e) => setIdServicio(e.target.value)}
            >
                <option value="">-- Seleccione un Servicio --</option>

                {catalogo.map(c => (
                    <option key={c.IdCatalogoServicio} value={c.IdCatalogoServicio}>
                        {c.NombreServicio || "---"} 
                    </option>
                ))}
            </select>
            
            {catalogo.length === 0 && (
                <div style={{color:'red', fontSize: '0.9rem', marginTop: '5px'}}>
                    El catálogo está vacío. Vaya a "Catálogo Servicios" y agregue uno.
                </div>
            )}
        </div>

        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest} disabled={catalogo.length === 0}>Aceptar</button>
            <button onClick={Limpiar} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
        </div>
      </div>
    </>
  )
}