import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

export function Button1() {
    return(
        <>
        </>
    )
}

//Funcion que acomoda los botones de los buttondrop
//children es todo lo que esta entre las etiquetas donde se llama
export function EstiloBotonDrop({ href, children }) {
  return (
    <button style={{
      width: '100%', 
      fontSize: '14px', 
      padding: '8px 5px'
    }}>
      <a className="dropdown-item" href={href}>
        {children}
      </a>
    </button>
  );
}

//Funcion para un boton desplegable de mantenimiento telefonos hotel
export function ButtonDrop1() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="dropdown" style={{width: '100%'}}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Mantenimiento Teléfonos Hotel
      </button>
        {isOpen && (
        <ul className="dropdown-menu show" style={{position: 'static', width: '100%', minWidth: 'unset', padding: 0}}>
            <EstiloBotonDrop href="/InsertarTelHotel">Insertar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ModificarTelHotel">Modificar</EstiloBotonDrop>
            <EstiloBotonDrop href="/EliminarTelHotel">Eliminar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ReportarTelHoteles">Reportar</EstiloBotonDrop>
        </ul>
        )}
    </div>
  );
}

//Funcion para un boton desplegable de mantenimiento redes sociales hotel
export function ButtonDrop2() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="dropdown" style={{width: '100%'}}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Mantenimiento Redes Sociales Hotel
      </button>
        {isOpen && (
        <ul className="dropdown-menu show" style={{position: 'static', width: '100%', minWidth: 'unset', padding: 0}}>
            <EstiloBotonDrop href="/InsertarRedSocialHotel">Insertar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ModificarRedSocialHotel">Modificar</EstiloBotonDrop>
            <EstiloBotonDrop href="/EliminarRedSocialHotel">Eliminar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ReportarRedSocialHoteles">Reportar</EstiloBotonDrop>
        </ul>
        )}
    </div>
  );
}

//Funcion para un boton desplegable de mantenimiento servicios hotel
export function ButtonDrop3() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="dropdown" style={{width: '100%'}}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Mantenimiento Servicios Hotel
      </button>
        {isOpen && (
        <ul className="dropdown-menu show" style={{position: 'static', width: '100%', minWidth: 'unset', padding: 0}}>
            <EstiloBotonDrop href="/InsertarServicio">Insertar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ModificarServicio">Modificar</EstiloBotonDrop>
            <EstiloBotonDrop href="/EliminarServicio">Eliminar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ReportarServicios">Reportar</EstiloBotonDrop>
        </ul>
        )}
    </div>
  );
}


//Funcion para un boton desplegable de mantenimiento comodidad habitacion
export function ButtonDrop4() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="dropdown" style={{width: '100%'}}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Mantenimiento Comodidades Habitación   
      </button>
        {isOpen && (
        <ul className="dropdown-menu show" style={{position: 'static', width: '100%', minWidth: 'unset', padding: 0}}>
            <EstiloBotonDrop href="/InsertarComodidadHab">Insertar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ModificarComodidadHab">Modificar</EstiloBotonDrop>
            <EstiloBotonDrop href="/EliminarComodidadHab">Eliminar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ReportarComodidadHab">Reportar</EstiloBotonDrop>
        </ul>
        )}
    </div>
  );
}

//Funcion para un boton desplegable de mantenimiento foto habitacion
export function ButtonDrop5() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="dropdown" style={{width: '100%'}}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Mantenimiento Fotos Habitación   
      </button>
        {isOpen && (
        <ul className="dropdown-menu show" style={{position: 'static', width: '100%', minWidth: 'unset', padding: 0}}>
            <EstiloBotonDrop href="/InsertarFotoHab">Insertar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ModificarFotoHab">Modificar</EstiloBotonDrop>
            <EstiloBotonDrop href="/EliminarFotoHab">Eliminar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ReportarFotoHab">Reportar</EstiloBotonDrop>
        </ul>
        )}
    </div>
  );
}

//Funcion para un boton desplegable de mantenimiento telefono cliente
export function ButtonDrop6() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="dropdown" style={{width: '100%'}}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Mantenimiento Teléfonos Cliente   
      </button>
        {isOpen && (
        <ul className="dropdown-menu show" style={{position: 'static', width: '100%', minWidth: 'unset', padding: 0}}>
            <EstiloBotonDrop href="/InsertarTelCliente">Insertar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ModificarTelCliente">Modificar</EstiloBotonDrop>
            <EstiloBotonDrop href="/EliminarTelCliente">Eliminar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ReportarTelClientes">Reportar</EstiloBotonDrop>
        </ul>
        )}
    </div>
  );
}

/*
//Funcion para un boton desplegable de mantenimiento reservaciones
export function ButtonDrop7() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="dropdown" style={{width: '100%'}}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Mantenimiento Reservaciones  
      </button>
        {isOpen && (
        <ul className="dropdown-menu show" style={{position: 'static', width: '100%', minWidth: 'unset', padding: 0}}>
            <EstiloBotonDrop href="/InsertarReservacion">Insertar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ModificarReservacion">Modificar</EstiloBotonDrop>
            <EstiloBotonDrop href="/EliminarReservacion">Eliminar</EstiloBotonDrop>
            <EstiloBotonDrop href="/ReportarReservaciones">Reportar</EstiloBotonDrop>
        </ul>
        )}
    </div>
  );
}
*/


/* Scrap


export function Button1({show, setShow}) {

    //const [show, setShow] = useState(false)

    return(
    <>
        <button onClick = {()=> setShow(!show)}>
            <p>{show == true ? "Hide Item" : "Show Item"}</p>
        </button>

    </>
    )
}


    //Setter funciotns notifica a React triggers una re-renderización de la app
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)

    /*
    //const [filter, setFilter] = useState("None")
    function handleEvent(){
        setCount(count + 1)
        console.log("Botton incremented")
    }
    

    //Usa dos argumentos: una función y un array de dependencias
    //Cada vez que la dependencia cambie, se ejecuta la función
    useEffect(()=>{
        console.log("Count has just changed")  
    },[count])

    useEffect(()=>{
        console.log("Page has just been rendered")  
    },[])

    return(
    <>
        <button onClick = {()=> setCount(count + 1)}>
            <p>{count}</p>
        </button>

    </>
    )

export function Button1({text, color, func, msg}) {

    return(
        <button onClick={() => func(msg)} style = {{backgroundColor: color}}>
            <p>{text}</p>
        </button>
    )
}

export function Button1({text, color, func, msg}) {

    return(
        <button onClick={() => func(msg)} style = {{backgroundColor: color}}>
            <p>{text}</p>
        </button>
    )
}

export function Button1(props) {

    return(
        <button onClick={() => props.func(props.msg)} style = {{backgroundColor: props.color}}>
            <p>{props.text}</p>
        </button>
    )
}

//properies
//props.text
//props.color

    let number = 7; //{number} para usar la variable
    let displayString
    if(number>10){
        displayString = "El número es mayor a 10";
    } else {
        displayString = "El número es menor o igual a 10";
    }

*/