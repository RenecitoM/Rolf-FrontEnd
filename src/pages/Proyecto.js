import React from 'react';
import '../pages/Proyecto.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import * as XLSX from "xlsx"

//import axios from 'axios';


class Proyecto extends React.Component{

   constructor(props){
    super(props);
    this.state={

    datas:[],
    form: {idProyecto:'',nombreProyecto:'',descripcionProyecto: '', url:'',fecha:''},
    modalInsertar: false,
    modalEditar: false,
    _id:"",
    proyecto:[],
    datas22:[],
    busqueda:"",



     };

   }

   filtrarElementos=()=>{
    var search = this.state.datas22.filter(item=>{
      if(item.idProyecto.toString().includes(this.state.busqueda) ){
        return item;
      }
    });
  
    this.setState({datas: search});
    
  
  
  }
  
  
  onChange = async e => {
    await this.setState({busqueda: e.target.value});
    console.log(this.state.busqueda);
    this.filtrarElementos();
  
  }
  


   componentDidMount1() {
    const apiUrl = 'http://localhost:3001/api/proyectos/';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
          this.setState({proyecto:data})


      });
  };



componentDidMount() {
    const apiUrl = 'http://localhost:3001/api/proyectos/';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
          this.setState({datas:data})
          this.componentDidMount1()
          this.setState({datas22:data})

      });

  };

handleChange =(e)=>{

   this.setState({
   form: {

       ...this.state.form,
       [e.target.name]: e.target.value,

    }

  });

}


  handleChange =(e)=>{

    this.setState({
    form: {
 
        ...this.state.form,
        [e.target.name]: e.target.value,
 
     }
 
   });
 
 }


add(){
    
    fetch('http://localhost:3001/api/proyectos/', {
      method: 'POST', 
      body: JSON.stringify({

            idProyecto: document.getElementById("idProyecto").value,
            nombreProyecto: document.getElementById("nombreProyecto").value,
            descripcionProyecto: document.getElementById("descripcionProyecto").value,
            url: document.getElementById("url").value,
            fecha: document.getElementById("fecha").value, 
        

      }), 
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    setTimeout("document.location = document.location", 2000);

  
   }



   UpdateVentas(){
    
    fetch('http://localhost:3001/api/proyectos/'+ document.getElementById("_id").value, {
      method: 'PUT', 
      body: JSON.stringify({
  
        idProyecto: document.getElementById("idProyecto").value,
        nombreProyecto: document.getElementById("nombreProyecto").value,
        descripcionProyecto: document.getElementById("descripcionProyecto").value,
        url: document.getElementById("url").value,
        fecha: document.getElementById("fecha").value, 
    

      }), 
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    setTimeout("document.location = document.location", 2000);


  
   }
  


   DeleteVentas(id){
    
    fetch('http://localhost:3001/api/proyectos/'+ id, {
      method: 'DELETE', 
      body: JSON.stringify({
  
     
  
  
      }), 
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    setTimeout("document.location = document.location", 2000);

  
   }

/* FUNCIONES PARA MOSTRAR Y OCULTAR EL MODAL DE INSERTAR*/  
mostrarModalInsertar=()=>{
  this.setState({modalInsertar:true});
}

ocultarModalInsertar=()=>{
    this.setState({modalInsertar:false});
}

/* FUNCIONES PARA MOSTRAR Y OCULTAR EL MODAL DE EDITAR*/ 

mostrarModalEditar=(registro)=>{
    this.setState({modalEditar:true, form: registro});
}
  
ocultarModalEditar=()=>{
      this.setState({modalEditar:false});
}

/* FUNCION PARA EDITAR*/

editar=(dato)=>{
    var contador= 0;
    var lista=this.state.datas;
    lista.map((registro)=>{
        if(dato.idProyecto==registro.idProyecto){
            lista[contador]._id = dato._id;
            lista[contador].nombreProyecto=dato.nombreProyecto;
            lista[contador].descripcionProyecto=dato.descripcionProyecto;
            lista[contador].url=dato.url;
            lista[contador].fecha=dato.fecha; 
        
        }
        contador++;
    });
    this.setState({data: lista,modalEditar: false});
    Swal.fire({
        title: 'Proyecto editado correctamente!',
        icon: "success",
        timer: '1700',

    });
    this.UpdateVentas();
    setTimeout("document.location = document.location", 2000);



}


/* FUNCION PARA INSERTAR*/

insertar= ()=>{
    
    var valorNuevo= {...this.state.form};
    valorNuevo.idProyecto=this.state.datas.length+2401;


    var lista= this.state.datas;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, datas: lista });
    this.add();

    Swal.fire({
        title: 'Proyecto agregado correctamente!',
        icon: "success",
        timer: '1700',

    });

  }


/* FUNCION PARA ELIMINAR*/

eliminar=(dato)=>{
    var opcion=window.confirm(" Seguro que desea eliminar el proyecto " + dato.idProyecto + " ? ")
    if(opcion){
        var contador=0;
        var lista = this.state.datas;
        lista.map((registro)=>{
            if(registro.idProyecto==dato.idProyecto){
                lista.splice(contador, 1);
            }
            contador++;
        })
        this.setState({datas:lista});
        this.DeleteVentas(dato._id);

    }

}

handleOnExport = () => {

    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(this.state.datas22);
    XLSX.utils.book_append_sheet(wb,ws,"Pagina 1");
    XLSX.writeFile(wb,"MyProyectos.xlsx")
};





    render(){


    return (

        <div className="div">
            <Container className="body"> 
            <h1 className="text-center">Gestion Proyecto</h1>
            
            <form>
                <p>
                <div> 
                <label>ID</label>
                </div>
                  <Form.Control type="text" placeholder="Busqueda de proyecto por ID" onChange={this.onChange}  value={this.state.busqueda}/>
                </p>

            </form>
            <div className='btn'>
            <Button color="success" disabled={this.props.Comprobar.Comprobar === "administrador" ? false : true } onClick={()=>this.mostrarModalInsertar()}>Agregar Proyecto</Button>
            </div>
            <Button color="success" onClick={()=> this.handleOnExport()}>Exportar a excel</Button>

            <Table>
                <thead><tr><th className="text-center">ID Proyecto</th> 
                <th className="text-center">Nombre Proyecto</th>
                <th className="text-center">Fecha</th>
                <th className="text-center">Acciones</th>

                </tr></thead> 
                <tbody>

                    {this.state.datas.map((elemento)=>(
                        <tr key={elemento._id}>
                            <td className="text-center">{elemento.idProyecto}</td>
                            <td className="text-center">{elemento.nombreProyecto}</td>
                            <td className="text-center">{elemento.fecha}</td>
                            <td className="text-center" ><Button disabled={this.props.Comprobar.Comprobar === "administrador" ? false : true } className="text-center" color="primary" onClick={()=>this.mostrarModalEditar(elemento)}><FaPencilAlt /></Button> {" "}
                            {" "}
                            <Button color="danger" disabled={this.props.Comprobar.Comprobar === "administrador" ? false : true } onClick={()=>this.eliminar(elemento)}><FaTimes/></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Container>
            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader>
                    <div>
                        <h3>Registrar Proyecto</h3>
                    </div>
                </ModalHeader>
                <ModalBody>

                    <FormGroup>
                        <div>
                        <label>ID Proyecto:</label>
                        </div>
                        <input className="Form-control" readOnly name="idProyecto" id="idProyecto" type="text"  value = {this.state.datas.length+2401}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Nombre Proyecto:</label>
                        </div>
                        <input className="Form-control" name="nombreProyecto" id="nombreProyecto" type="text" onChange={this.handleChange} />
                     </FormGroup>


                    <FormGroup>
                        <div>
                        <label>Descripcion Proyecto:</label>
                        </div>
                        <textarea className="Form-control" name="descripcionProyecto" type="text" id="descripcionProyecto" onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Url:</label>
                        </div>
                        <input className="Form-control" name="url" id ="url" type="text" onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Fecha:</label>
                        </div>
                        <input className="Form-control" name="fecha" type="date" id="fecha" onChange={this.handleChange} />
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={()=>this.insertar()}>Agregar Proyecto</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        

            <Modal isOpen={this.state.modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Editar Equipo</h3>
                    </div>
                </ModalHeader>
                <ModalBody>

                <FormGroup>
                        <div>
                        <label>Id Object</label>
                        </div>
                        <input className="Form-control" readOnly name="id" id="_id" type="text" value={this.state.form._id}/>
                    </FormGroup>

                   
                   <FormGroup>
                        <div>
                        <label>ID Proyecto:</label>
                        </div>
                        <input className="Form-control" readOnly name="idProyecto" id="idProyecto" type="text"  value = {this.state.form.idProyecto}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Nombre Proyecto:</label>
                        </div>
                        <input className="Form-control" name="nombreProyecto" id="nombreProyecto" type="text" onChange={this.handleChange} value = {this.state.form.nombreProyecto} />
                     </FormGroup>


                    <FormGroup>
                        <div>
                        <label>Descripcion Proyecto:</label>
                        </div>
                        <textarea className="Form-control" name="descripcionProyecto" type="text" id="descripcionProyecto" onChange={this.handleChange} value = {this.state.form.descripcionProyecto}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Url:</label>
                        </div>
                        <input className="Form-control" name="url" id ="url" type="text" onChange={this.handleChange} value = {this.state.form.url} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Fecha:</label>
                        </div>
                        <input className="Form-control" name="fecha" type="date" id="fecha" onChange={this.handleChange} value = {this.state.form.fecha}/>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={()=>this.editar(this.state.form)}>Editar</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </div>


       )
    }
}      
    

export default Proyecto;