import * as React from 'react';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../fire';
import imagen  from '../auth/image/LOGIN.jpg';


 
function Login({
    setAuthState,
    setUser
}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    

    const handleLogin = () => {

            if(email !== null && password !== null) {
                signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setUser(email)
                    setAuthState('login')
                })
                .catch((err) => alert("Error, contraseña o correo incorrecto."));
            }
            
    }

  return (
    
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
      <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
      
            <h1 className='text-5xl font-semibold'>¡Bienvenido de vuelta!</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Ingrese su cuenta para empezar a gestionar tus proyectos.</p>
            <div className='mt-8'>
                <div className='flex flex-col'>
                    <label className='text-lg font-medium'>Email</label>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder="Ingrese su email"/>
                </div>
                <div className='flex flex-col mt-4'>
                    <label className='text-lg font-medium'>Contraseña</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder="Ingrese tu contraseña"
                        type={"password"}
                    />
                </div>
                <div className='mt-8 flex justify-between items-center'>
                    <div>
                        <input  type="checkbox" id='remember'/>
                        <label className='ml-2 font-medium text-base' for="remember">Recordar durante 30 dias</label>
                    </div>
                    <button onClick={() => setAuthState('resetPassword')} className='font-medium text-base text-blue-500'>Recuperar contraseña</button>
                </div>
                <div className='mt-8 flex flex-col gap-y-4'>
                    <button 
                        onClick={handleLogin}
                        className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02]  ease-in-out transform py-4 bg-blue-500 rounded-xl text-white font-bold text-lg'>Ingresar</button>          
                </div>
                <div className='mt-8 flex justify-center items-center'>
                    <span className='font-medium text-base'>No estas registrado?</span>
                    <button 
                        onClick={() => setAuthState('register')}
                        className='ml-2 font-medium text-base text-blue-500'> Registrate aqui</button>
                </div>
            </div>
        </div>
      </div>
      <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
      <img src={imagen} alt="Login"/>
      </div>
    </div>
  );
}

export default Login;