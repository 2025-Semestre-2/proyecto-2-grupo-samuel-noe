import { Outlet } from "react-router-dom";
import { Navbar, Navbar2, Navbar4, Navbar5, Navbar6, 
    Navbar7, Navbar8, Navbar9, Navbar10, Navbar11 } from "./Navbar";
//Navbar3

//Layout de la barra de navegacion de mantenimientos
export function Layout(){
    return(
        <>
            <Navbar/>
            <main>
                <Outlet/> 
            </main>
        </>
    )
}

//Layout de la barra de navegacion de mantenimientos junto con la de hoteles
export function Layout2(){
    return(
        <>
            <Navbar/>
            <Navbar2/>
            <main className="with-sidebar"> 
                <Outlet/> 
            </main>
        </>
    )
}

/*
//Layout de la barra de navegacion de mantenimientos junto con la de servicios
export function Layout3(){
    return(
        <>
            <Navbar/>
            <Navbar3/>
            <main className="with-sidebar"> 
                <Outlet/> 
            </main>
        </>
    )
}
*/

//Layout de la barra de navegacion de mantenimientos junto con la de tipo habitacion
export function Layout4(){
    return(
        <>
            <Navbar/>
            <Navbar4/>
            <main className="with-sidebar"> 
                <Outlet/> 
            </main>
        </>
    )
}

//Layout de la barra de navegacion de mantenimientos junto con la de habitacion
export function Layout5(){
    return(
        <>
            <Navbar/>
            <Navbar5/>
            <main className="with-sidebar"> 
                <Outlet/> 
            </main>
        </>
    )
}

//Layout de la barra de navegacion de mantenimientos junto con la de clientes
export function Layout6(){
    return(
        <>
            <Navbar/>
            <Navbar6/>
            <main className="with-sidebar"> 
                <Outlet/> 
            </main>
        </>
    )
}

//Layout de la barra de navegacion de mantenimientos junto con la de usuarios
export function Layout7(){
    return(
        <>
            <Navbar/>
            <Navbar7/>
            <main className="with-sidebar"> 
                <Outlet/> 
            </main>
        </>
    )
}

//Layout de la barra de navegacion de mantenimientos junto con la de actividades
export function Layout8(){
    return(
        <>
            <Navbar/>
            <Navbar8/>
            <main className="with-sidebar"> 
                <Outlet/> 
            </main>
        </>
    )
}

//Layout de la barra de navegacion de mantenimientos junto con la de empresas recreativas
export function Layout9(){
    return(
        <>
            <Navbar/>
            <Navbar9/>
            <main className="with-sidebar"> 
                <Outlet/> 
            </main>
        </>
    )
}

//Layout de la barra de navegacion de mantenimientos junto con la de reservaciones
export function Layout10(){
    return(
        <>
            <Navbar/>
            <Navbar10/>
            <main className="with-sidebar"> 
                <Outlet/> 
            </main>
        </>
    )
}

//Layout de la barra de navegacion de mantenimientos junto con la de facturas
export function Layout11(){
    return(
        <>
            <Navbar/>
            <Navbar11/>
            <main className="with-sidebar"> 
                <Outlet/> 
            </main>
        </>
    )
}



/*


*/