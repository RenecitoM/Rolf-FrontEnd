import React from 'react';
import '../pages/Clientes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import * as XLSX from "xlsx"


//import axios from 'axios';


class Clientes extends React.Component{

   constructor(props){
    super(props);
    this.state={
    datas:[],
    form: {idUser:'',nameUser: '', correo:'',  password:'', rol:''},
    modalInsertar: false,
    modalEditar: false,
    _id:"",
    products:[],
    datas22:[],
    busqueda:"",



     };

   }

   filtrarElementos=()=>{
    var search = this.state.datas22.filter(item=>{
      if(item.idUser.toString().includes(this.state.busqueda) ){
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
    const apiUrl = 'http://localhost:3001/api/users/';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
          this.setState({products:data})


      });
  };



componentDidMount() {
    const apiUrl = 'http://localhost:3001/api/users/';
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
    
    fetch('http://localhost:3001/api/users/', {
      method: 'POST', 
      body: JSON.stringify({
  
        idUser: document.getElementById("idUser").value,
        nameUser: document.getElementById("nameUser").value,
        correo: document.getElementById("correo").value,
        password: document.getElementById("password").value,
        rol: document.getElementById("rol").value

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
    
    fetch('http://localhost:3001/api/users/'+ document.getElementById("_id").value, {
      method: 'PUT', 
      body: JSON.stringify({
  

        idUser: document.getElementById("idUser").value,
        nameUser: document.getElementById("nameUser").value,
        correo: document.getElementById("correo").value,
        password: document.getElementById("password").value,
        rol: document.getElementById("rol").value

  
  
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
    
    fetch('http://localhost:3001/api/users/'+ id, {
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
        if(dato.idUser==registro.idUser){
            lista[contador]._id = dato._id;
            lista[contador].nameUser=dato.nameUser;
            lista[contador].correo=dato.correo;
            lista[contador].password=dato.password;
            lista[contador].rol=document.getElementById("rol").value;
            
            

        }
        contador++;
    });
    this.setState({data: lista,modalEditar: false});
    Swal.fire({
        title: 'Usuario editado correctamente!',
        icon: "success",
        timer: '1700',

    });
    this.UpdateVentas();


}


/* FUNCION PARA INSERTAR*/

insertar= ()=>{
    
    var valorNuevo= {...this.state.form};
    valorNuevo.idUser=this.state.datas.length+8401;
    valorNuevo.rol = document.getElementById("rol").value;

    var lista= this.state.datas;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, datas: lista });
    this.add();

    Swal.fire({
        title: 'Usuario agregado correctamente!',
        icon: "success",
        timer: '1700',

    });

  }


/* FUNCION PARA ELIMINAR*/

eliminar=(dato)=>{
    var opcion=window.confirm(" Seguro que desea eliminar el usuario " + dato.idUser + " ? ")
    if(opcion){
        var contador=0;
        var lista = this.state.datas;
        lista.map((registro)=>{
            if(registro.idUser==dato.idUser){
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
        XLSX.writeFile(wb,"MyClientes.xlsx")
    };
    



    render(){


    return (

        <div className="div">
            <Container className="body"> 
            <h1 className="text-center">Gestion Usuarios</h1>
            
            <form>
                <p>
                <div> 
                <label>ID</label>
                </div>
                  <Form.Control type="text" placeholder="Busqueda del Usuario por ID" onChange={this.onChange}  value={this.state.busqueda}/>
                </p>

            </form>
            <div className='btn'>
            <Button color="success" disabled onClick={()=>this.mostrarModalInsertar()}>Agregar Usuario</Button>
            </div>

            <Button color="success" onClick={()=> this.handleOnExport()}>Exportar a excel</Button>


            <Table>           

                <thead><tr><th className="text-center">Id Usuario</th> 
                <th className="text-center">Nombre del Usuario</th>
                <th className="text-center">Correo</th>
                <th className="text-center">Rol</th>
                <th className="text-center">Acciones</th>
                </tr></thead>
                <tbody>
                    {this.state.datas.map((elemento)=>(
                        <tr key={elemento._id}>
                            <td className="text-center">{elemento.idUser}</td>
                            <td className="text-center">{elemento.nameUser}</td>
                            <td className="text-center">{elemento.correo}</td>
                            <td className="text-center">{elemento.rol}</td>
                            <td className="text-center" ><Button className="text-center" disabled={this.props.Comprobar.Comprobar === "administrador" ? false : true }  color="primary" onClick={()=>this.mostrarModalEditar(elemento)}><FaPencilAlt /></Button> {" "}
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
                        <h3>Registrar Usuarios</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
            
                    <FormGroup>
                        <div>
                        <label>Id Usuario:</label>
                        </div>
                        <input className="Form-control" readOnly name="idUser" id="idUser" type="text"  value = {this.state.datas.length+1401}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Nombre del Usuario:</label>
                        </div>
                        <input className="Form-control" name="nameUser" id="nameUser" type="text" onChange={this.handleChange} />
                     </FormGroup>


                    <FormGroup>
                        <div>
                        <label>Correo:</label>
                        </div>
                        <input className="Form-control" name="correo" type="text" id="correo" onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Password:</label>
                        </div>
                        <input className="Form-control" name="password" id ="password" type="text" onChange={this.handleChange} />
                    </FormGroup>

                    
                    <FormGroup>
                        <div>
                        <label>Rol:</label>
                        </div>
                        <select id="rol" className="btn btn-info dropdown-toggle" >
                            <option className="btn btn-success dropdown-toggle" value="administrador">Administrador</option>
                            <option className="btn btn-file dropdown-toggle" value="usuario">Usuario</option>
                        </select>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={()=>this.insertar()}>Agregar Venta</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        
    


            <Modal isOpen={this.state.modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Editar Usuarios</h3>
                    </div>
                </ModalHeader>
                <ModalBody>

                <FormGroup>
                        <div>
                        <label>Id Object</label>
                        </div>
                        <input className="Form-control" readOnly name="Id" id="_id" type="text" value={this.state.form._id}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Id Usuario:</label>
                        </div>
                        <input className="Form-control" readOnly name="idUser" id="idUser" type="text"  value={this.state.form.idUser}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Nombre del Usuario:</label>
                        </div>
                        <input className="Form-control" name="nameUser" readOnly id="nameUser" type="text" onChange={this.handleChange} value={this.state.form.nameUser} />
                     </FormGroup>


                    <FormGroup>
                        <div>
                        <label>Correo:</label>
                        </div>
                        <input className="Form-control" readOnly name="correo" type="text" id="correo" onChange={this.handleChange}  value={this.state.form.correo}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Password:</label>
                        </div>
                        <input className="Form-control" readOnly name="password" id ="password" type="text" onChange={this.handleChange} value={this.state.form.password}/>
                    </FormGroup>

                    
                    <FormGroup>
                        <div>
                        <label>Rol:</label>
                        </div>
                        <select id="rol" className="btn btn-info dropdown-toggle" >
                            <option className="btn btn-success dropdown-toggle" value="administrador">Administrador</option>
                            <option className="btn btn-file dropdown-toggle" value="usuario">Usuario</option>
                        </select>
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
    

export default Clientes;
