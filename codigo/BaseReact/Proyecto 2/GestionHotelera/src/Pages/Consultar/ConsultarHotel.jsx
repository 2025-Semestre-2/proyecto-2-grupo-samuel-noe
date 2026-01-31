import { useState, useEffect } from 'react';
import { Textbox } from "../../Components/Textbox";
import api from '../../services/axiosConfig';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ConsultarHotel() {
    const [hoteles, setHoteles] = useState([]); // Estado para guardar la lista
    const [busqueda, setBusqueda] = useState(""); // Estado para el filtro por ID o nombre

    // 1. Cargar datos al entrar a la pantalla
    useEffect(() => {
        cargarHoteles();
    }, []);

    const cargarHoteles = async () => {
        try {
            const response = await api.get('/hospedaje'); // Llama al backend
            setHoteles(response.data);
        } catch (error) {
            console.error("Error cargando hoteles:", error);
            toast.error("Error al cargar la lista de hoteles");
        }
    };

    const hotelesFiltrados = hoteles.filter(hotel => 
        hotel.NombreComercial.toLowerCase().includes(busqueda.toLowerCase()) ||
        hotel.CedulaJuridica.toString().includes(busqueda)
    );

    return (
        <>
            <ToastContainer />
            <h1>Buscar Hotel</h1>

            <div style={{
                border: '2px solid #333', borderRadius: '4px', padding: '10px',
                maxWidth: '400px', margin: '20px auto', backgroundColor: '#f9f9f9',
            }}>
                <div className="form-group">
                    <label>Buscar (Nombre o Cédula): </label>
                    <Textbox
                        type="text"
                        placeholder="Escribe aquí..."
                        value={busqueda}
                        onChange={setBusqueda}
                    />
                </div>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '10px' }}>
                    <button onClick={cargarHoteles}>Refrescar</button>
                    <button onClick={() => setBusqueda('')}>Limpiar</button>
                </div>
            </div>

            <div className="container mt-5">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Cédula Jurídica</th>
                            <th>Nombre Comercial</th>
                            <th>Tipo</th>
                            <th>Provincia</th>
                            <th>Cantón</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotelesFiltrados.length > 0 ? (
                            hotelesFiltrados.map((hotel) => (
                                <tr key={hotel.CedulaJuridica}>
                                    <td>{hotel.CedulaJuridica}</td>
                                    <td>{hotel.NombreComercial}</td>
                                    <td>{hotel.TipoHospedaje}</td>
                                    <td>{hotel.Provincia}</td>
                                    <td>{hotel.Canton}</td>
                                    <td>{hotel.Telefono1}</td>
                                    <td>{hotel.CorreoElectronico}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No hay hoteles registrados</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}