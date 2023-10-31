import { useState } from 'react'
import Mensaje from './Mensaje'


const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsvalidControl }) => {

   const [mensaje, setMensaje] = useState('')


   const handlePresupuesto = (e) => {

      e.preventDefault()

      if (!presupuesto || presupuesto < 0) {  //COMPARA QUE ALGUNA SE CUMPLA || true
         setMensaje("NO ES UN PRESUPUESTO VALIDO")

         return
      }
      setMensaje('')
      setIsvalidControl(true)



   }




   return (
      <div className="contenedor-presupuesto contenedor sombra">

         <form

            className='formulario'
            onSubmit={handlePresupuesto}  // Asociacion al submit del input

         >

            <div className='campo'>

               <label>Definir Presupuesto</label>

               <input
                  className='nuevo-presupuesto'
                  type="number"
                  value={presupuesto !== 0 ? presupuesto : ''}
                  placeholder='0'

                  onChange={e => setPresupuesto(Number(e.target.value))}

               />
            </div>

            <input

               type="submit"
               value="Añade tu Presupuesto"

            />

            {mensaje && <Mensaje tipo="error">{mensaje} </Mensaje>}

         </form>

      </div>
   )
}

export default NuevoPresupuesto
