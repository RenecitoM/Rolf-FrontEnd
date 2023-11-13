import React from 'react';
import './App.css';
import Navbar from './components-SideBar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Equipo from './pages/Equipo';
import Boards from './pages/Boards';
import Proyecto from './pages/Proyecto';
import CardsProyects from './pages/CardsProyects';
import Clientes from './pages/Clientes';
import Estadistica from './pages/Estadisticas';



const Menu = (Comprobar) => {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/proyecto" element={<Proyecto Comprobar={Comprobar} />} />
          <Route path="/equipo" element={<Equipo Comprobar={Comprobar}/>} />
          <Route path="/CardsProyects" element={<CardsProyects />} />
          <Route path="/usuario" element={<Clientes Comprobar={Comprobar}/>} />
          <Route path="/estadistica" element={<Estadistica/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default Menu;