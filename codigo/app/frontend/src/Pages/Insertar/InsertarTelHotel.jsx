import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarTelHotel(){

    const [idHospedaje, setIdHospedaje] = useState('')
    const [numeroTelefono, setNumeroTelefono] = useState('')
    const [codPais, setCodPais] = useState('506')
    const [codigosPais, setCodigosPais] = useState([])

    useEffect(() => {
        const cargarCodigos = async () => {
            try {
                const res = await api.get('/util/codigos-pais');
                setCodigosPais(res.data);
            } catch (error) { console.error(error); }
        };
        cargarCodigos();
    }, []);

    const Limpiar = () => {
        setIdHospedaje(''); setNumeroTelefono(''); setCodPais('506');
    }
    
    const mandarRequest = async () => {
        if (!validarInt(idHospedaje, 'ID Hotel').esValido) return toast.warning("ID Hotel inválido");
        if (!validarInt(numeroTelefono, 'Teléfono').esValido) return toast.warning("Número inválido");

        const payload = {
            idHospedaje: parseInt(idHospedaje),
            codigoPais: parseInt(codPais),
            numeroTelefono: parseInt(numeroTelefono)
        };

        try {
            await api.post('/telefono-hotel', payload);
            toast.success("Teléfono agregado correctamente.");
            Limpiar();
        } catch (error) {
            toast.error("Error: " + (error.response?.data?.error || "Error desconocido"));
        }
    }

    return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Insertar Teléfono de Hotel</h1>

      <div style={{
        border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
            <label>Cédula Jurídica del Hotel: </label>
            <Textbox type="text" value={idHospedaje} onChange={setIdHospedaje} />
        </div>

        <div className="form-group">
            <label>Nuevo Teléfono: </label>
            <div style={{display: 'flex', gap: '10px'}}>
                <select 
                    style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc', height:'42px'}}
                    value={codPais} 
                    onChange={(e) => setCodPais(e.target.value)}
                >
                    {codigosPais.map(c => <option key={c.IdCodigoTelefono} value={c.IdCodigoTelefono}>+{c.IdCodigoTelefono}</option>)}
                </select>
                <Textbox type="text" value={numeroTelefono} onChange={setNumeroTelefono} />
            </div>
        </div>
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={Limpiar}>Cancelar</button>
        </div>
      </div>
    </>
  )
}