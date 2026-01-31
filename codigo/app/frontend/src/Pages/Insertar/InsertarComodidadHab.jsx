import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarComodidadHab(){

  const [idTipoHab, setIdTipoHab] = useState('')
  const [desc, setDesc] = useState('')
  const [tipos, setTipos] = useState([])

  useEffect(() => {
      const cargarTipos = async () => {
          try {
              const res = await api.get('/comodidad-habitacion/tipos'); 
              console.log("Tipos cargados:", res.data);
              setTipos(res.data);
              
              if(res.data && res.data.length > 0) {
                  setIdTipoHab(res.data[0].IdTipoHabitacion.toString());
              }
          } catch(e) { 
              console.error(e);
              toast.error("Error cargando tipos de habitación");
          }
      };
      cargarTipos();
  }, []);

  const Limpiar = () => {
    if(tipos.length > 0) setIdTipoHab(tipos[0].IdTipoHabitacion.toString());
    else setIdTipoHab('');
    setDesc('');
  }

  const mandarRequest = async () => {
    if (!validarInt(idTipoHab, 'Tipo Habitación').esValido) return toast.warning("Seleccione un Tipo.");
    if (!validarNull(desc, 'Descripción').esValido) return toast.warning("Descripción requerida");

    try {
        await api.post('/comodidad-habitacion', {
            idTipoHabitacion: parseInt(idTipoHab),
            descripcion: desc
        });
        toast.success("Comodidad agregada correctamente.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Insertar Comodidad de Habitación</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
      
        <div className="form-group">
            <label>Tipo de Habitación (Hotel - Tipo): </label>
            <select 
                style={{
                    width: '100%', padding: '8px', height:'42px', 
                    borderRadius:'4px', border:'1px solid #ccc', 
                    backgroundColor:'white', color: '#333'
                }}
                value={idTipoHab}
                onChange={(e) => setIdTipoHab(e.target.value)}
            >
                <option value="">-- Seleccione --</option>
                {tipos.map(t => (
                    <option key={t.IdTipoHabitacion} value={t.IdTipoHabitacion}>
                        {t.Hotel} - {t.Nombre}
                    </option>
                ))}
            </select>
        </div>

        <div className="form-group">
            <label>Descripción de Comodidad: </label>
            <Textbox type="text" placeholder="Ej: Jacuzzi privado" value={desc} onChange={setDesc} />
        </div>
        
        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={Limpiar} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
        </div>
      </div>
    </>
  )
}