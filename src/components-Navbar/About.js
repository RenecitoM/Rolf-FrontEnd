import React from 'react'
import rolfs2 from './images/rolfs2.png'
import './About.css'

const About = () => {
    return (
        <div className='about' id='about'>
            <div className='container'>
                <div className='img'>
                <img  src={rolfs2} alt='john' />
                </div>
                <div className='col-2'>
                    <h2>Acerca de nosotros</h2>
                    <span className='line'></span>
                    <p>ROLF S+ se define como un aplicativo web de apoyo para empresas encargadas de proyectos de construcción, brindando como principales funcionalidades crear y supervisar tareas, crear proyectos, crear equipos y validación de los roles del sistema.</p>
                    <p>Este aplicativo está diseñado principalmente para mejorar la eficacia en cuanto a la entrega de los proyectos.</p>
                    <button className='button'>Explore More</button>
                </div>
            </div>
        </div>
    )
}

export default About
