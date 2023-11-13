import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import imagen  from '../auth/image/LOGIN.jpg';





export default function ResetPassword({
  setAuthState,
  setUser}) {

    const [email, setEmail] = useState('')
    const auth = getAuth();
  
    const triggerResetEmail = async () => {
      try{ 
        await sendPasswordResetEmail(auth, email);
        alert("Link de recuperacion, enviado a su correo")
        }catch(err){
        alert("Error, Ingrese el correo correctamente, por favor.")
        }
    }
   
    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
            <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
                <h1 className='text-5xl font-semibold'>Recuperar contraseña</h1>
                <p className='font-medium text-lg text-gray-500 mt-4'>Ingrese el correo para recuperar la cuenta.</p>
                <div className='mt-8'>
                    <div className='flex flex-col'>
                        <label className='text-lg font-medium'>Email</label>
                        <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder="Email"  value={email}  onChange={e => setEmail(e.target.value)} required/>
                    </div>
                    </div>
                    <div className='mt-8 flex justify-between items-center'>
                        <div>
                            <input  type="checkbox" id='remember'/>
                            <label className='ml-2 font-medium text-base' for="remember">Recordar durante 30 dias</label>
                        </div>
                        <button onClick={() => setAuthState('login')} className='font-medium text-base text-violet-500'>Regresar al login</button>
                    </div>
                    <div className='mt-8 flex flex-col gap-y-4'>
                    <button  className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'
                    onClick={triggerResetEmail}>Recuperar</button>
                    </div>
                    
                </div>
            </div>
            <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
                <img src={imagen} alt="resetPassword"/>
            </div>
        </div>
    )
  } 
  



  