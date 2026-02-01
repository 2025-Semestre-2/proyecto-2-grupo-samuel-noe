import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarTipoHabitacion(){

  const [idHospedaje, setIdHospedaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [desc, setDesc] = useState('')
  
  const [tipoCama, setTipoCama] = useState('') 
  
  const [precio, setPrecio] = useState('')
  const [hoteles, setHoteles] = useState([]);

  useEffect(() => {
      const cargarHoteles = async () => {
          try {
              const res = await api.get('/hospedaje'); 
              console.log("Hoteles:", res.data);
              setHoteles(res.data);
              
              if(res.data && res.data.length > 0) {
                  setIdHospedaje(res.data[0].CedulaJuridica.toString());
              }
          } catch(e) { 
              console.error(e);
              toast.error("Error cargando lista de hoteles");
          }
      };
      cargarHoteles();
  }, []);

  const Limpiar = () => {
    if(hoteles.length > 0) setIdHospedaje(hoteles[0].CedulaJuridica.toString());
    else setIdHospedaje('');
    
    setNombre(''); 
    setDesc(''); 
    setTipoCama('');
    setPrecio('');
  }

  const mandarRequest = async () => {
    if (!validarInt(idHospedaje, 'Hotel').esValido) return toast.warning("Seleccione un Hotel.");
    if (!validarNull(nombre, 'Nombre').esValido) return toast.warning("Nombre requerido");
    
    if (!tipoCama) return toast.warning("Seleccione un Tipo de Cama.");
    
    if (!precio || isNaN(precio)) return toast.warning("Precio inválido");

    try {
        await api.post('/tipo-habitacion', {
            idHospedaje: parseInt(idHospedaje),
            nombre,
            descripcion: desc,
            tipoCama,
            precio: parseFloat(precio)
        });
        toast.success("Tipo de habitación registrado.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Insertar Tipo de Habitación</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
      
        <div className="form-group">
            <label>Hotel: </label>
            <select 
                style={{
                    width: '100%', padding: '8px', height:'42px', 
                    borderRadius:'4px', border:'1px solid #ccc', 
                    backgroundColor:'white', color: '#333'
                }}
                value={idHospedaje}
                onChange={(e) => setIdHospedaje(e.target.value)}
            >
                <option value="">-- Seleccione un Hotel --</option>
                {hoteles.map(h => (
                    <option key={h.CedulaJuridica} value={h.CedulaJuridica}>
                        {h.NombreComercial}
                    </option>
                ))}
            </select>
        </div>

        <div className="form-group">
            <label>Nombre del Tipo (Ej: Suite): </label>
            <Textbox type="text" value={nombre} onChange={setNombre} />
        </div>

        <div className="form-group">
            <label>Descripción: </label>
            <Textbox type="text" value={desc} onChange={setDesc} />
        </div>

        <div className="form-group">
            <label>Tipo de Cama: </label>
            <select 
                style={{
                    width: '100%', padding: '8px', height:'42px', 
                    borderRadius:'4px', border:'1px solid #ccc', 
                    backgroundColor:'white', color: '#333' // Color forzado
                }}
                value={tipoCama}
                onChange={(e) => setTipoCama(e.target.value)}
            >
                <option value="">-- Seleccione Tipo de Cama --</option>
                <option value="Individual">Individual</option>
                <option value="Queen">Queen</option>
                <option value="King">King</option>
            </select>
        </div>

        <div className="form-group">
            <label>Precio por Noche: </label>
            <Textbox type="text" value={precio} onChange={setPrecio} placeholder="0.00" />
        </div>
        
        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={Limpiar} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
        </div>
      </div>
    </>
  )
}