
import React from "react";
import Chart from "react-apexcharts";
import {UserData} from "./Data";
import  {useEffect, useState} from 'react'



function Barchart() {



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
      <Chart options={{
        chart: {
          id: 'basic-bar'
        },
        title: {
          text: 'Equipos - Proyectos - Usuarios',
          align: 'center'
        },
        xaxis: {
          categories: UserData.map((data)=> data.Semana)
        }
      }} 
      series={[
        {
          name: "Total",
          data: [user.length,proyecto.length,equipo.length]
        }
      ]}


       type="bar" width={400}  />
    )
  }


export default Barchart;