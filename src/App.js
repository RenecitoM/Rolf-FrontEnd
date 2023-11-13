import * as React from 'react';
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from './pages/Home';
import ResetPassword from "./auth/resetPassword";



import { auth } from './fire';
import { onAuthStateChanged } from 'firebase/auth'
import Menu from './Menu';
import {useState, useEffect} from 'react'



function App() {
  const [user, setUser] = React.useState(null);
  const [authState, setAuthState] = React.useState(null)
  const [DataState, setDataState] = useState([])
  const [Comprobar, setComprobar] = React.useState("");



  const showData = async () => {
    const response = await fetch('http://localhost:3001/api/users/')
    const data = await response.json()
    setDataState(data)
  };


    useEffect(() => {

        showData()

    },[])

    const comprobacion = () =>{

      showData()

    }



  React.useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth,
      async authenticatedUser => {
        if(authenticatedUser) {

          setUser(authenticatedUser.email)
          setAuthState('home');

          DataState.forEach(element => {

            if( element.correo === authenticatedUser.email){
                setComprobar(element.rol)          
            }
    
         })

        } else {
          setUser(null);
          setAuthState('login')
        }
      })
      comprobacion()

      return unSubscribeAuth;
  }, [user])

  if(authState === null) return <div className='font-bold text-center text-5xl'>loading...</div>
  if(authState === 'login') return <Login setAuthState={setAuthState} setUser={setUser}/>
  if(authState === 'register') return <Register setAuthState={setAuthState} setUser={setUser}/> 
  if(authState === 'resetPassword') return <ResetPassword setAuthState={setAuthState} setUser={setUser}/> 
  if(user) return <Menu Comprobar={Comprobar}/>


}

export default App;