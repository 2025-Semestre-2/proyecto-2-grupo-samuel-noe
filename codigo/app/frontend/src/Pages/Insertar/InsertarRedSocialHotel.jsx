import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarRedSocialHotel(){

  const [idHospedaje, setIdHospedaje] = useState('')
  const [idPlataforma, setIdPlataforma] = useState('')
  const [catalogo, setCatalogo] = useState([])

  useEffect(() => {
      const cargarCatalogo = async () => {
          try {
              const res = await api.get('/red-social-hotel/catalogo');
              setCatalogo(res.data);
              if (res.data.length === 0) {
                  toast.warning("El catálogo de redes está vacío. Agregue redes primero.");
              } else {
                  setIdPlataforma(res.data[0].IdCatalogoSocial);
              }
          } catch (error) { toast.error("Error cargando catálogo"); }
      };
      cargarCatalogo();
  }, []);

  const Limpiar = () => {
    setIdHospedaje('');
    if(catalogo.length > 0) setIdPlataforma(catalogo[0].IdCatalogoSocial);
  }

  const mandarRequest = async () => {
    if (!validarInt(idHospedaje, 'ID Hotel').esValido) return toast.warning("ID Hotel inválido");
    
    if (catalogo.length === 0) return toast.error("No hay redes sociales disponibles para asociar.");

    try {
        await api.post('/red-social-hotel', {
            idHospedaje: parseInt(idHospedaje),
            idPlataforma: parseInt(idPlataforma)
        });
        toast.success("Red social asociada correctamente.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Insertar Red Social de Hotel</h1>

      <div style={{
        border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
            <label>Cédula Jurídica del Hotel: </label>
            <Textbox type="text" value={idHospedaje} onChange={setIdHospedaje} placeholder="Ingrese ID..." />
        </div>

        <div className="form-group">
            <label>Red Social a Asociar: </label>
            {catalogo.length > 0 ? (
                <select 
                    style={{width: '100%', padding: '8px', height:'42px', borderRadius: '4px', border: '1px solid #ccc'}}
                    value={idPlataforma}
                    onChange={(e) => setIdPlataforma(e.target.value)}
                >
                    {catalogo.map(item => (
                        <option key={item.IdCatalogoSocial} value={item.IdCatalogoSocial}>
                            {item.NombrePlataforma}
                        </option>
                    ))}
                </select>
            ) : (
                <div style={{color: 'red', fontStyle: 'italic'}}>
                    No se encontraron redes sociales. Agregue una al catálogo.
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