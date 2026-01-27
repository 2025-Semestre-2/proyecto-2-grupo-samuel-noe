
import '../App.css'
import { Link } from "react-router-dom"
import {ButtonDrop1, ButtonDrop2, ButtonDrop3, ButtonDrop4, ButtonDrop5, ButtonDrop6} from './Button'

/*

<Link to="/ManteServicios">
    <button>Mantenimiento Servicios</button>
</Link>


*/


//Barra de navegacion principal donde estan los mantenimientos
export function Navbar(){
    return(
        <>
        <nav>
            <Link to="/Home">
                <button>Página Principal</button>
            </Link>

            <Link to="/ManteHoteles">
                <button>Mantenimiento Hoteles</button>
            </Link>

            <Link to="/ManteTipoHabitacion">
                <button>Mantenimiento Tipo Habitación</button>
            </Link>
                
            <Link to="/ManteHabitacion">
                <button>Mantenimiento Habitación</button>
            </Link>

            <Link to="/ManteCliente">
                <button>Mantenimiento Cliente</button>
            </Link>

            <Link to="/ManteUsuario">
                <button>Mantenimiento Usuario</button>
            </Link>

            <Link to="/ManteActividades">
                <button>Mantenimiento Actividades</button>
            </Link>

            <Link to="/ManteEmpRec">
                <button>Mantenimiento Empresa Recreación</button>
            </Link>

            <Link to="/ManteReservaciones">
                <button>Mantenimiento Reservaciones</button>
            </Link>

            <Link to="/ManteFacturas">
                <button>Mantenimiento Facturas</button>
            </Link>

            <Link to="/ManteEmpRec">
                <button>Mantenimiento Empresa Recreación</button>
            </Link>

            <Link to="/">
                <button>Cerrar Sesión</button>
            </Link>
        </nav>
        </>
    )
}

//Barra de navegacion secundaria donde estan los insertar,
// modificar, eliminar, consultar y reportar hoteles
export function Navbar2(){
    return(
        <>
        <nav className="secondary">
            <Link to="/InsertarHotel">
                <button>Insertar Hotel</button>
            </Link>

            <Link to="/ModificarHotel">
                <button>Modificar Hotel</button>
            </Link>

            <Link to="/EliminarHotel">
                <button>Eliminar Hotel</button>
            </Link>

            <Link to="/ConsultarHotel">
                <button>Buscar Hotel</button>
            </Link>

            <Link to="/ReportarHoteles">
                <button>Reportar Hoteles</button>
            </Link>

            <ButtonDrop1/>
            <ButtonDrop2/>
            <ButtonDrop3/>
            
        </nav>
        </>
    )
}

/*
//Barra de navegacion secundaria donde estan los insertar,
// modificar, eliminar, consultar y reportar servicios
export function Navbar3(){
    return(
        <>
        <Nav>
            <Link to="/InsertarServicio">
                <button>Insertar Servicio</button>
            </Link>

            <Link to="/ModificarServicio">
                <button>Modificar Servicio</button>
            </Link>

            <Link to="/EliminarServicio">
                <button>Eliminar Servicio</button>
            </Link>

            <Link to="/ReportarServicios">
                <button>Reportar Servicios</button>
            </Link>
                
        </Nav>
        </>
    )
}
*/

//Barra de navegacion secundaria donde estan los insertar,
// modificar, eliminar, consultar y reportar tipo habitacion
export function Navbar4(){
    return(
        <>
        <nav className="secondary">
            <Link to="/InsertarTipoHabitacion">
                <button>Insertar Tipo Habitación</button>
            </Link>

            <Link to="/ModificarTipoHabitacion">
                <button>Modificar Tipo Habitación</button>
            </Link>

            <Link to="/EliminarTipoHabitacion">
                <button>Eliminar Tipo Habitación</button>
            </Link>

            <Link to="/ReportarTipoHabitacion">
                <button>Reportar Tipo Habitación</button>
            </Link>
                
            <ButtonDrop4/>
            <ButtonDrop5/>

        </nav>
        </>
    )
}

//Barra de navegacion secundaria donde estan los insertar,
// modificar, eliminar, consultar y reportar habitacion
export function Navbar5(){
    return(
        <>
        <nav className="secondary">
            <Link to="/InsertarHabitacion">
                <button>Insertar Habitación</button>
            </Link>

            <Link to="/ModificarHabitacion">
                <button>Modificar Habitación</button>
            </Link>

            <Link to="/EliminarHabitacion">
                <button>Eliminar Habitación</button>
            </Link>

            <Link to="/ReportarHabitaciones">
                <button>Reportar Habitaciones</button>
            </Link>
                
        </nav>
        </>
    )
}

//Barra de navegacion secundaria donde estan los insertar,
// modificar, eliminar, consultar y reportar clientes
export function Navbar6(){
    return(
        <>
        <nav className="secondary">
            <Link to="/InsertarCliente">
                <button>Insertar Cliente</button>
            </Link>

            <Link to="/ModificarCliente">
                <button>Modificar Cliente</button>
            </Link>

            <Link to="/EliminarCliente">
                <button>Eliminar Cliente</button>
            </Link>

            <Link to="/ReportarClientes">
                <button>Reportar Clientes</button>
            </Link>

            <ButtonDrop6/>
                
        </nav>
        </>
    )
}

//Barra de navegacion secundaria donde estan los insertar,
// modificar, eliminar, consultar y reportar usuarios
export function Navbar7(){
    return(
        <>
        <nav className="secondary">
            <Link to="/InsertarUsuario">
                <button>Insertar Usuario</button>
            </Link>

            <Link to="/ModificarUsuario">
                <button>Modificar Usuario</button>
            </Link>

            <Link to="/EliminarUsuario">
                <button>Eliminar Usuario</button>
            </Link>

            <Link to="/ReportarUsuarios">
                <button>Reportar Usuarios</button>
            </Link>
                
        </nav>
        </>
    )
}

//Barra de navegacion secundaria donde estan los insertar,
// modificar, eliminar, consultar y reportar actividades
export function Navbar8(){
    return(
        <>
        <nav className="secondary">
            <Link to="/InsertarActividad">
                <button>Insertar Actividad</button>
            </Link>

            <Link to="/ModificarActividad">
                <button>Modificar Actividad</button>
            </Link>

            <Link to="/EliminarActividad">
                <button>Eliminar Actividad</button>
            </Link>

            <Link to="/ConsultarActividad">
                <button>Consultar Actividad</button>
            </Link>

            <Link to="/ReportarActividades">
                <button>Reportar Actividades</button>
            </Link>
                
        </nav>
        </>
    )
}

//Barra de navegacion secundaria donde estan los insertar,
// modificar, eliminar, consultar y reportar empresa recreacion
export function Navbar9(){
    return(
        <>
        <nav className="secondary">
            <Link to="/InsertarEmpRec">
                <button>Insertar Empresa Recreación</button>
            </Link>

            <Link to="/ModificarEmpRec">
                <button>Modificar Empresa Recreación</button>
            </Link>

            <Link to="/EliminarEmpRec">
                <button>Eliminar Empresa Recreación</button>
            </Link>

            <Link to="/ReportarEmpRec">
                <button>Reportar Empresa Recreación</button>
            </Link>
                
        </nav>
        </>
    )
}

//Barra de navegacion secundaria donde estan los insertar,
// modificar, eliminar, consultar y reportar reservaciones
export function Navbar10(){
    return(
        <>
        <nav className="secondary">
            <Link to="/InsertarReservacion">
                <button>Insertar Reservación</button>
            </Link>

            <Link to="/ModificarReservacion">
                <button>Modificar Reservación</button>
            </Link>

            <Link to="/EliminarReservacion">
                <button>Eliminar Reservación</button>
            </Link>

            <Link to="/ReportarReservaciones">
                <button>Reportar Reservaciones</button>
            </Link>
                
        </nav>
        </>
    )
}

//Barra de navegacion secundaria donde estan los insertar,
// modificar, eliminar, consultar y reportar facturas
export function Navbar11(){
    return(
        <>
        <nav className="secondary">
            <Link to="/InsertarFactura">
                <button>Insertar Factura</button>
            </Link>

            <Link to="/ModificarFactura">
                <button>Modificar Factura</button>
            </Link>

            <Link to="/EliminarFactura">
                <button>Eliminar Factura</button>
            </Link>

            <Link to="/ReportarFacturas">
                <button>Reportar Facturas</button>
            </Link>
                
        </nav>
        </>
    )
}

//Scrap
/*




*/