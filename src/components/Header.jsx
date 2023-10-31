import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'



const Header = ({ gastos,
                  presupuesto,
                  setPresupuesto,
                  isvalidControl,
                  setIsvalidControl,
                  setGastos}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      
      {isvalidControl ?( 
        <ControlPresupuesto
        gastos={gastos}
        presupuesto={presupuesto}
        setGastos={setGastos}
        setPresupuesto={setPresupuesto}
        setIsvalidControl={setIsvalidControl}
        
        />
      ):(

        <NuevoPresupuesto
      
      
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setIsvalidControl={setIsvalidControl}
          
          />

      )}

 
      </header>
  )
}

export default Header
