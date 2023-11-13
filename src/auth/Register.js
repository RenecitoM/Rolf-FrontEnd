import * as React from 'react';
import imagen  from '../auth/image/LOGIN.jpg';
import { auth } from '../fire';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Swal from 'sweetalert2';



export default function Register({
    setAuthState,
    setUser
}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [id, setId] = React.useState('');


    

  const  add= ()=>{
    
    fetch('http://localhost:3001/api/users', {
      method: 'POST', 
      body: JSON.stringify({
  
        idUser: id,
        nameUser: name,
        correo: email,
        password: password ,
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


  const insertar= ()=>{

    add();

    Swal.fire({
        title: 'User agregado correctamente!',
        icon: "success",
        timer: '1700',

    });

  }



    const onSignUpHandle = () => {
        if(email !== null && password !== null) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setUser(user.user.email);
                setAuthState('home')
                insertar()
            })
            .catch((err) => {
                alert("Error, Ingrese los datos correctamente.")
            })
            
        }
        
    }

    return (
        <div className="flex w-full h-screen">
           <div className="w-full flex items-center justify-center lg:w-1/2">
                <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                   
                    <h1 className='text-5xl font-semibold'>Registrarse</h1>
                    <p className='font-medium text-lg text-gray-500 mt-4'>Bievenido, ingrese sus datos para registrarse.</p>
                    <div className='mt-8'>
                        <div className='flex flex-col'>
                            <label className='text-lg font-medium'>Email</label>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Enter your email"/>
                                
                                
                        </div>

                        <div className='flex flex-col mt-4'>
                            <label className='text-lg font-medium'>Password</label>
                            <input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Enter your password"
                                type={"password"}
                            />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <label className='text-lg font-medium'>Nombre completo</label>
                            <input 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Enter your name"
                            />
                        </div>
                        
                        <div className='flex flex-col mt-4'>
                            <label className='text-lg font-medium'>Id</label>
                            <input 
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Enter your id"
                                type={"number"}
                            />
                        </div>

                       
                        <div className='flex flex-col mt-4'>
                            <label className='text-lg font-medium'>Rol</label>
                            <select id="rol" className="btn btn-info dropdown-toggle" >
                                <option className="btn btn-danger dropdown-toggle" value="administrador">Administrador</option>
                                <option className="btn btn-file dropdown-toggle" value="usuario">Usuario</option>
                             </select>
                        </div>


                        <div className='mt-8 flex justify-between items-center'>
                            <div>  
                                <input  type="checkbox" id='remember'/>
                                <label className='ml-2 font-medium text-base' for="remember">Recordar durante 30 dias</label>
                            </div>
                            <button onClick={() => setAuthState('login')} className='font-medium text-base text-violet-500'>Regresar al login</button>
                        </div>
                        <div className='mt-8 flex flex-col gap-y-4'>
                            <button 
                                onClick={onSignUpHandle}
                                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>
                                Registrarse
                            </button>
                           
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
                <img src={imagen} alt="Register"/>
            </div>
        </div>
    )
}

