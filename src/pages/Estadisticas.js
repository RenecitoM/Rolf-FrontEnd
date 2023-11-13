
import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import * as RiIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import Linechart from '../Components-Graficas/Linechart'
import Barchart from "../Components-Graficas/Barchart"
import Radarchart from '../Components-Graficas/Radarchart'
import "./Estadisticas.css"





function Estadisticas() {


  const [user,setUser] = useState([]);
  const [proyecto,setProyecto] = useState([]);
  const [equipo,setEquipos] = useState([]);



  const getUser = async () => {
    
    let data = await fetch("http://localhost:3001/api/users/");
    let data2 = await data.json();
    setUser(data2);
  }

  const getProyectos = async () => {

    let data = await fetch("  http://localhost:3001/api/proyectos/");
    let data2 = await data.json();
    setProyecto(data2);
  }

  const getEquipos = async () => {
    
    let data = await fetch("  http://localhost:3001/api/equipos/");
    let data2 = await data.json();
    setEquipos(data2);
  }


  useEffect(()=>{
    
    getUser();
    getProyectos();
    getEquipos();


  },[]);




    return (
       <div className='ContenedorGeneral'>
          <div className='ContenedorCard'>
                <Card className='ContenedorCards'>
                <Card.Body>
                <AiIcons.AiOutlineFileProtect style={{ width: '10rem',height:"3.5rem", color:"red"}} />
                  <Card.Title>Total proyectos</Card.Title>
                  <Card.Text>
                    {proyecto.length}
                  </Card.Text>
                  
                </Card.Body>
              </Card>
              

              <Card className='ContenedorCards' >
                <Card.Body>
                <RiIcons.RiTeamFill style={{ width: '10rem',height:"3.5rem", color:"blue"}} />
                  <Card.Title> Total equipos</Card.Title>
                  <Card.Text>
                  {equipo.length}
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className='ContenedorCards'>
                <Card.Body>
                <FaIcons.FaUserCircle style={{ width: '10rem',height:"3.5rem",color:"#7fffd4"}} />
                  <Card.Title>Total usuarios</Card.Title>
                  <Card.Text>
                  {user.length}
                  </Card.Text>
                </Card.Body>
              </Card>
          </div>

          <div className='ContenedorGraficos'>
            <div className='Contenedor'>
                <Linechart/>    
              </div> 

              <div className='Contenedor' >
                <Barchart />    
              </div> 

              <div className='Contenedor'>
                <Radarchart/>     
              </div> 
            </div>

      </div>

    )
}

export default Estadisticas