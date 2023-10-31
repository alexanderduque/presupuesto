import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import Swal from 'sweetalert2'


const ControlPresupuesto = ({ gastos, presupuesto, setGastos, setPresupuesto, setIsvalidControl }) => {

  const [porcetanje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)



  useEffect(() => {

    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)


    setGastado(totalGastado)

    const totalDisponible = (presupuesto - totalGastado)

    setDisponible(totalDisponible)

    //CALCULADO EL PORCENTAJE DE LA GRAFICA

    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1300);






  }, [gastos])



  const formatearCantidad = (cantidad) => {

    return cantidad.toLocaleString('es-ES', {

      style: 'currency',
      currency: 'EUR',


    })

  }

  const handleReset = () => {

    Swal.fire({
      title: '¿Estas seguro de Reiniciar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32b810',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No,Cancelar',
      confirmButtonText: 'Si,Reinicia'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Completado',
          'La App fue Reiniciada',
          'success'
        )
        setGastos([])
        setPresupuesto(0)
        setIsvalidControl(false)
      } else {

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Acción cancelada',
          showConfirmButton: false,
          timer: 1300
        })


      }
    })


  }



  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>

      <div>

        <CircularProgressbar

          styles={buildStyles({

            pathColor: porcetanje > 100 ? '#DC2626' : '#006eff',  //Paleta que se va llenando 
            trailColor: '#F5F5F5',  //LINEA QUE NUNCA CAMBIA
            textColor: porcetanje > 100 ? '#DC2626' : 'rgb(19, 19, 229)'  //Color de las letras de grafica

          })}

          value={porcetanje}
          text={`${porcetanje}% Gastado`}
        />
      </div>

      <div className='contenido-presupuesto'>
        <button
          className='reset-app'
          type='button'
          onClick={handleReset}
        >
          Reiniciar Aplicación
        </button>
        <p>

          <span>Presupuesto: </span>{formatearCantidad(presupuesto)}

        </p>

        <p className={`${disponible < 0 ? 'negativo' : ''}`}>

          <span>Disponible: </span>{formatearCantidad(disponible)}

        </p>

        <p>

          <span>Gastado: </span>{formatearCantidad(gastado)}

        </p>

      </div>

    </div>
  )
}

export default ControlPresupuesto
