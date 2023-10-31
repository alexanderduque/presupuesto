import React from 'react'
import Gasto from './Gasto'


const ListadoGasto = ({ filtro,
  gastosFiltro,
  gastos,
  setGastosEditar,
  eliminarGasto }) => {
  return (
    <div className='listado-gastos contenedor'>

      {

        filtro ? (
          <>
            <h2>{gastosFiltro.length ? 'Gastos' : 'No hay Gastos En Esta Categoria'}</h2>
            {//SI HAY ALGO EN FILTRO HACE UN MAP SOBRE ESE STATE (gastosFiltro)
              gastosFiltro.map(gasto => (  //Return implicito 

                <Gasto

                  key={gasto.id}  //Estaria en App.jsx
                  gasto={gasto}
                  setGastosEditar={setGastosEditar}
                  eliminarGasto={eliminarGasto}

                />))}
          </>
        )
          : (
            <>
              <h2>{gastos.length ? 'Gastos' : 'No hay Gastos'}</h2>


              {//SI NO HAY NADA EN FILTRO EL MAP SERA SOBRE (gastos)
                gastos.map(gasto => (  //Return implicito 

                  <Gasto

                    key={gasto.id}  //Estaria en App.jsx
                    gasto={gasto}
                    setGastosEditar={setGastosEditar}
                    eliminarGasto={eliminarGasto}

                  />))}

            </>
          )
      }

    </div>
  )
}

export default ListadoGasto
