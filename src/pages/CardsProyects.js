import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './CardsProyects.css'


class CardsProyects extends React.Component{

    constructor(){
     super();
     this.state={
         
     proyecto:[]
     
 
     };}

   
 
    componentDidMount() {
     const apiUrl = 'http://localhost:3001/api/proyectos/';
     fetch(apiUrl)
       .then((response) => response.json())
       .then((data) => {
           this.setState({proyecto:data})

       });
   };

 
 
     render(){
 
 
     return (
 
        <div>
            <br></br>
            <h1 align="center">Proyectos creados</h1>
            { this.state.proyecto.map((proyectos) => (
                <Card style={{ width: '18rem' }} key={proyectos._id} className="Cards">
                 <Card.Img variant="top" src={proyectos.url} />
                 <Card.Body>
                     <Card.Title>{proyectos.nombreProyecto}</Card.Title>
                     <Card.Text>{proyectos.descripcionProyecto}</Card.Text>
                 <Button variant="primary">Go somewhere</Button>
                 </Card.Body>
                </Card>
            ))}
        </div>
 
 
        )
     }
 }      
     
 
 export default CardsProyects;