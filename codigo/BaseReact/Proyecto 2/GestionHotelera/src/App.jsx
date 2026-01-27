
import './App.css'
// HashRouter si es para github, BrowserRouter si es para servidor propio
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import {Layout, Layout2, Layout4, Layout5, Layout6, 
  Layout7, Layout8, Layout9, Layout10, Layout11} from './Components/Layout.jsx'
//Layout3

//Para que funcione el boton desplegable
import 'bootstrap/dist/css/bootstrap.min.css';
import {Login} from './Pages/Login.jsx'
import {Home} from './Pages/home.jsx'

import {ManteHoteles} from './Pages/Manteniento/ManteHoteles.jsx'
import {ManteServicios} from './Pages/Manteniento/ManteServicios.jsx'
import {ManteTipoHabitacion} from './Pages/Manteniento/ManteTipoHabitacion.jsx'
import {ManteHabitacion} from './Pages/Manteniento/ManteHabitacion.jsx'
import {ManteCliente} from './Pages/Manteniento/ManteCliente.jsx'
import {ManteUsuario} from './Pages/Manteniento/ManteUsuario.jsx'
import {ManteActividades} from './Pages/Manteniento/ManteActividades.jsx'
import {ManteReservaciones} from './Pages/Manteniento/ManteReservaciones.jsx'
import {ManteFacturas} from './Pages/Manteniento/ManteFacturas.jsx'
import {ManteEmpRec} from './Pages/Manteniento/ManteEmpRec.jsx'

import {InsertarHotel} from './Pages/Insertar/InsertarHotel.jsx'
import {ModificarHotel} from './Pages/Modificar/ModificarHotel.jsx'
import {EliminarHotel} from './Pages/Eliminar/EliminarHotel.jsx'
import {ConsultarHotel} from './Pages/Consultar/ConsultarHotel.jsx'
import {ReportarHoteles} from './Pages/Reportar/ReportarHoteles.jsx'

import {InsertarTelHotel} from './Pages/Insertar/InsertarTelHotel.jsx'
import {ModificarTelHotel} from './Pages/Modificar/ModificarTelHotel.jsx'
import {EliminarTelHotel} from './Pages/Eliminar/EliminarTelHotel.jsx'
import {ReportarTelHoteles} from './Pages/Reportar/ReportarTelHoteles.jsx'

import {InsertarRedSocialHotel} from './Pages/Insertar/InsertarRedSocialHotel.jsx'
import {ModificarRedSocialHotel} from './Pages/Modificar/ModificarRedSocialHotel.jsx'
import {EliminarRedSocialHotel} from './Pages/Eliminar/EliminarRedSocialHotel.jsx'
import {ReportarRedSocialHoteles} from './Pages/Reportar/ReportarRedSocialHoteles.jsx'

import {InsertarServicio} from './Pages/Insertar/InsertarServicio.jsx'
import {ModificarServicio} from './Pages/Modificar/ModificarServicio.jsx'
import {EliminarServicio} from './Pages/Eliminar/EliminarServicio.jsx'
import {ReportarServicios} from './Pages/Reportar/ReportarServicios.jsx'

import {InsertarTipoHabitacion} from './Pages/Insertar/InsertarTipoHabitacion.jsx'
import {ModificarTipoHabitacion} from './Pages/Modificar/ModificarTipoHabitacion.jsx'
import {EliminarTipoHabitacion} from './Pages/Eliminar/EliminarTipoHabitacion.jsx'
import {ReportarTipoHabitacion} from './Pages/Reportar/ReportarTipoHabitaciones.jsx'

import {InsertarComodidadHab} from './Pages/Insertar/InsertarComodidadHab.jsx'
import {ModificarComodidadHab} from './Pages/Modificar/ModificarComodidadHab.jsx'
import {EliminarComodidadHab} from './Pages/Eliminar/EliminarComodidadHab.jsx'
import {ReportarComodidadHab} from './Pages/Reportar/ReportarComodidadHab.jsx'

import {InsertarFotoHab} from './Pages/Insertar/InsertarFotoHab.jsx'
import {ModificarFotoHab} from './Pages/Modificar/ModificarFotoHab.jsx'
import {EliminarFotoHab} from './Pages/Eliminar/EliminarFotoHab.jsx'
import {ReportarFotoHab} from './Pages/Reportar/ReportarFotoHab.jsx'

import {InsertarHabitacion} from './Pages/Insertar/InsertarHabitacion.jsx'
import {ModificarHabitacion} from './Pages/Modificar/ModificarHabitacion.jsx'
import {EliminarHabitacion} from './Pages/Eliminar/EliminarHabitacion.jsx'
import {ReportarHabitaciones} from './Pages/Reportar/ReportarHabitaciones.jsx'

import {InsertarCliente} from './Pages/Insertar/InsertarCliente.jsx'
import {ModificarCliente} from './Pages/Modificar/ModificarCliente.jsx'
import {EliminarCliente} from './Pages/Eliminar/EliminarCliente.jsx'
import {ReportarClientes} from './Pages/Reportar/ReportarClientes.jsx'

import {InsertarTelCliente} from './Pages/Insertar/InsertarTelCliente.jsx'
import {ModificarTelCliente} from './Pages/Modificar/ModificarTelCliente.jsx'
import {EliminarTelCliente} from './Pages/Eliminar/EliminarTelCliente.jsx'
import {ReportarTelClientes} from './Pages/Reportar/ReportarTelClientes.jsx'

import {InsertarUsuario} from './Pages/Insertar/InsertarUsuario.jsx'
import {ModificarUsuario} from './Pages/Modificar/ModificarUsuario.jsx'
import {EliminarUsuario} from './Pages/Eliminar/EliminarUsuario.jsx'
import {ReportarUsuarios} from './Pages/Reportar/ReportarUsuarios.jsx'

import {InsertarActividad} from './Pages/Insertar/InsertarActividad.jsx'
import {ModificarActividad} from './Pages/Modificar/ModificarActividad.jsx'
import {EliminarActividad} from './Pages/Eliminar/EliminarActividad.jsx'
import {ConsultarActividad} from './Pages/Consultar/ConsultarActividad.jsx'
import {ReportarActividades} from './Pages/Reportar/ReportarActividades.jsx'

import {InsertarReservacion} from './Pages/Insertar/InsertarReservacion.jsx'
import {ModificarReservacion} from './Pages/Modificar/ModificarReservacion.jsx'
import {EliminarReservacion} from './Pages/Eliminar/EliminarReservacion.jsx'
import {ReportarReservaciones} from './Pages/Reportar/ReportarReservaciones.jsx'

import {InsertarFactura} from './Pages/Insertar/InsertarFactura.jsx'
import {ModificarFactura} from './Pages/Modificar/ModificarFactura.jsx'
import {EliminarFactura} from './Pages/Eliminar/EliminarFactura.jsx'
import {ReportarFacturas} from './Pages/Reportar/ReportarFacturas.jsx'

import {InsertarEmpRec} from './Pages/Insertar/InsertarEmpRec.jsx'
import {ModificarEmpRec} from './Pages/Modificar/ModificarEmpRec.jsx'
import {EliminarEmpRec} from './Pages/Eliminar/EliminarEmpRec.jsx'
import {ReportarEmpRec} from './Pages/Reportar/ReportarEmpRec.jsx'

function App() {

  return (
    //path='/' Ruta default
    <Router>
      <Routes>
        <Route path='/' element = {<Login/>}/>
        <Route element = {<Layout/>}>
          <Route path='/Home' element = {<Home/>}/>
        </Route>
        <Route element = {<Layout2/>}>
          <Route path='/ManteHoteles' element = {<ManteHoteles/>}/>
          <Route path='/InsertarHotel' element = {<InsertarHotel/>}/>
          <Route path='/ModificarHotel' element = {<ModificarHotel/>} />
          <Route path='/EliminarHotel' element = {<EliminarHotel/>}/>
          <Route path='/ConsultarHotel' element = {<ConsultarHotel/>}/>
          <Route path='/ReportarHoteles' element = {<ReportarHoteles/>}/>

          <Route path='/InsertarTelHotel' element = {<InsertarTelHotel/>}/>
          <Route path='/ModificarTelHotel' element = {<ModificarTelHotel/>}/>
          <Route path='/EliminarTelHotel' element = {<EliminarTelHotel/>}/>
          <Route path='/ReportarTelHoteles' element = {<ReportarTelHoteles/>}/>
        
          <Route path='/InsertarRedSocialHotel' element = {<InsertarRedSocialHotel/>}/>
          <Route path='/ModificarRedSocialHotel' element = {<ModificarRedSocialHotel/>}/>
          <Route path='/EliminarRedSocialHotel' element = {<EliminarRedSocialHotel/>}/>
          <Route path='/ReportarRedSocialHoteles' element = {<ReportarRedSocialHoteles/>}/>
        
          <Route path='/ManteServicios' element = {<ManteServicios/>}/>
          <Route path='/InsertarServicio' element = {<InsertarServicio/>}/>
          <Route path='/ModificarServicio' element = {<ModificarServicio/>}/>
          <Route path='/EliminarServicio' element = {<EliminarServicio/>}/>
          <Route path='/ReportarServicios' element = {<ReportarServicios/>}/>
        </Route>
        <Route element = {<Layout4/>}>
        <Route path='/ManteTipoHabitacion' element = {<ManteTipoHabitacion/>}/>
        <Route path='/InsertarTipoHabitacion' element = {<InsertarTipoHabitacion/>}/>
        <Route path='/ModificarTipoHabitacion' element = {<ModificarTipoHabitacion/>}/>
        <Route path='/EliminarTipoHabitacion' element = {<EliminarTipoHabitacion/>}/>
        <Route path='/ReportarTipoHabitacion' element = {<ReportarTipoHabitacion/>}/>
        
        <Route path='/InsertarComodidadHab' element = {<InsertarComodidadHab/>}/>
        <Route path='/ModificarComodidadHab' element = {<ModificarComodidadHab/>}/>
        <Route path='/EliminarComodidadHab' element = {<EliminarComodidadHab/>}/>
        <Route path='/ReportarComodidadHab' element = {<ReportarComodidadHab/>}/>
        
        <Route path='/InsertarFotoHab' element = {<InsertarFotoHab/>}/>
        <Route path='/ModificarFotoHab' element = {<ModificarFotoHab/>}/>
        <Route path='/EliminarFotoHab' element = {<EliminarFotoHab/>}/>
        <Route path='/ReportarFotoHab' element = {<ReportarFotoHab/>}/>
        </Route>
        <Route element = {<Layout5/>}>
        <Route path='/ManteHabitacion' element = {<ManteHabitacion/>}/>
        <Route path='/InsertarHabitacion' element = {<InsertarHabitacion/>}/>
        <Route path='/ModificarHabitacion' element = {<ModificarHabitacion/>}/>
        <Route path='/EliminarHabitacion' element = {<EliminarHabitacion/>}/>
        <Route path='/ReportarHabitaciones' element = {<ReportarHabitaciones/>}/>
        </Route>
        <Route element = {<Layout6/>}>
        <Route path='/ManteCliente' element = {<ManteCliente/>}/>
        <Route path='/InsertarCliente' element = {<InsertarCliente/>}/>
        <Route path='/ModificarCliente' element = {<ModificarCliente/>}/>
        <Route path='/EliminarCliente' element = {<EliminarCliente/>}/>
        <Route path='/ReportarClientes' element = {<ReportarClientes/>}/>
        
        <Route path='/InsertarTelCliente' element = {<InsertarTelCliente/>}/>
        <Route path='/ModificarTelCliente' element = {<ModificarTelCliente/>}/>
        <Route path='/EliminarTelCliente' element = {<EliminarTelCliente/>}/>
        <Route path='/ReportarTelClientes' element = {<ReportarTelClientes/>}/>
        </Route>
        <Route element = {<Layout7/>}>
        <Route path='/ManteUsuario' element = {<ManteUsuario/>}/>
        <Route path='/InsertarUsuario' element = {<InsertarUsuario/>}/>
        <Route path='/ModificarUsuario' element = {<ModificarUsuario/>}/>
        <Route path='/EliminarUsuario' element = {<EliminarUsuario/>}/>
        <Route path='/ReportarUsuarios' element = {<ReportarUsuarios/>}/>
        </Route>
        <Route element = {<Layout8/>}>
        <Route path='/ManteActividades' element = {<ManteActividades/>}/>
        <Route path='/InsertarActividad' element = {<InsertarActividad/>}/>
        <Route path='/ModificarActividad' element = {<ModificarActividad/>}/>
        <Route path='/EliminarActividad' element = {<EliminarActividad/>}/>
        <Route path='/ConsultarActividad' element = {<ConsultarActividad/>}/>
        <Route path='/ReportarActividades' element = {<ReportarActividades/>}/>
        </Route>
        <Route element = {<Layout9/>}>
        <Route path='/ManteEmpRec' element = {<ManteEmpRec/>}/>
        <Route path='/InsertarEmpRec' element = {<InsertarEmpRec/>}/>
        <Route path='/ModificarEmpRec' element = {<ModificarEmpRec/>}/>
        <Route path='/EliminarEmpRec' element = {<EliminarEmpRec/>}/>
        <Route path='/ReportarEmpRec' element = {<ReportarEmpRec/>}/>
        </Route>
        <Route element = {<Layout10/>}>
        <Route path='/ManteReservaciones' element = {<ManteReservaciones/>}/>
        <Route path='/InsertarReservacion' element = {<InsertarReservacion/>}/>
        <Route path='/ModificarReservacion' element = {<ModificarReservacion/>}/>
        <Route path='/EliminarReservacion' element = {<EliminarReservacion/>}/>
        <Route path='/ReportarReservaciones' element = {<ReportarReservaciones/>}/>
        </Route>
        <Route element = {<Layout11/>}>
        <Route path='/ManteFacturas' element = {<ManteFacturas/>}/>
        <Route path='/InsertarFactura' element = {<InsertarFactura/>}/>
        <Route path='/ModificarFactura' element = {<ModificarFactura/>}/>
        <Route path='/EliminarFactura' element = {<EliminarFactura/>}/>
        <Route path='/ReportarFacturas' element = {<ReportarFacturas/>}/>
        </Route>
      </Routes>
    </Router>
  )

}

export default App

//Scrap
/*


  <Route element = {<Layout3/>}>
    <Route path='/ManteServicios' element = {<ManteServicios/>}/>
    <Route path='/InsertarServicio' element = {<InsertarServicio/>}/>
    <Route path='/ModificarServicio' element = {<ModificarServicio/>}/>
    <Route path='/EliminarServicio' element = {<EliminarServicio/>}/>
    <Route path='/ReportarServicios' element = {<ReportarServicios/>}/>
  </Route>


function App() {

  const [showItem, setShowItem] = useState(false)
  //Mismo codigo que abajo pero separando la funcion
  function HandleShow({show}){
    if(show){
      return(
        <StoreItem item = {item1} />
      )
    }
  }

  const item1 = {title: "bat", desc: "this is a bat", price: 50}

  //Jsx
  return (
    <>
      <h1>Perfil de usuario</h1>
      <Buttons.Button1 show = {showItem} setShow = {setShowItem} />
      <HandleShow show = {showItem}/>
    </>
  )
}

{showItem == true ? <StoreItem item = {item1} /> : <></>}

function App() {

 
  //const myArray = ["a", "b", "c", "d", "e"]
  const item1 = {title: "bat", desc: "this is a bat", price: 50}
  const item2 = {title: "ball", desc: "this is a ball", price: 20}
  const myArray = [item1,item2]

  //Jsx
  return (
    <>
      <h1>Perfil de usuario</h1>
      <div>
      {myArray.map((element, index) => {
        return(
            //<StoreItem item = {element} key={index} />
            <Buttons.Button1 />
        )
      })}

      </div>
    </>
  )
}

function App() {
  //Javascript
  const [count, setCount] = useState(0)

  //Jsx
  return (
    <>
      <h1>Sistema de Gestión Hotelera</h1>
      <div>
      <Textboxes.Textbox  />
      <Buttons.Button1 text = {"BBBBB"} color = {"Blue"} />
      </div>
    </>
  )
}


  function notify(msg){
    alert(msg)
  }

    <Buttons.Button1 text = {"AAAAA"} color = {"Red"} func = {notify} msg = {"Mensaje 1"} />

*/
