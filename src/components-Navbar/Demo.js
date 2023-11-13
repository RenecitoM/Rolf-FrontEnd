import React from 'react'
import './Demo.css'

const Demo = () => {
    return (
        <div className='demo' id='demo'>
            <div className='container'>
                <div className='col-1'>
                    <p>Buscamos las mejores soluciones a los problemas,</p>
                    <p>Rolf+s</p>
                    <p>Como valor agregado o propuesta en comparación con los aplicativos webs de gestión de proyectos encontrados, que están en el mercado, presentamos el plus de las estadísticas en tiempo real para la comodidad del gerente encargado y el cliente, permitiendo esto un acceso más cómodo desde la comodidad de su hogar a la información necesaria.</p>
                    <button className='button'>Free Consultation</button>
                </div>
                <div className='col-2'>
                    <iframe width='570' height='320' src='https://www.youtube.com/embed/NY019qyesMk' title='Youtube video player' frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
            </div>
        </div>
    )
}

export default Demo
