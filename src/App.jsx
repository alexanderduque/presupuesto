import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import Filtros from './components/Filtros'
import ListadoGasto from './components/ListadoGasto'
import { generarId } from './helpers'
import nuevoGasto from './img/nuevo-gasto.svg'
import Swal from 'sweetalert2'


function App() {


  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )

  const [isvalidControl, setIsvalidControl] = useState(false)

  const [modal, setModal] = useState(false)

  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(

    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [gastosEditar, setGastosEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltro, setGastosFiltro] = useState([])
  const [sweetAlertMostrado, setSweetAlertMostrado] = useState(false);


  //LO QUE ESTARA ESCUCHANDO 
  useEffect(() => {
    if (Object.keys(gastosEditar).length > 0) {

      handleEditarGasto()

    }

  }, [gastosEditar])

  //Effect para localStorage
  useEffect(() => {

    localStorage.setItem('presupuesto', presupuesto ?? 0)

  }, [presupuesto])

  //Effect para que cuando reinicie si hay algo en lstorage entonces reinicie 
  //ya en el control de prepuesto
  useEffect(() => {

    const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0

    if (presupuestoLs > 0) {

      setIsvalidControl(true)
    }

  }, [])

  // Local storage para los gastos creados
  useEffect(() => {

    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])

  }, [gastos])

  //Effect -- Filtrar los gastos
  useEffect(() => {
    if (filtro) {

      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltro(gastosFiltrados)
    }

  }, [filtro])


  const handleNuevoGasto = () => {

    //MODAL PARA UN NUEVO GASTO LIMPIANDO EL STATE DE LA EDICION PREVIA
    setGastosEditar({});

    setModal(true)

    setTimeout(() => {

      setAnimarModal(true)
    }, 500);



  }


  const handleEditarGasto = () => {

    //MODAL CON EDICION DE GASTOS
    setModal(true)

    setTimeout(() => {

      setAnimarModal(true)
    }, 500);



  }


  const guardarGasto = gasto => {

    if (gasto.id) {
      //ACTUALIZAR
      const gastosActualizados = gastos.map(gastoStatee => gastoStatee.id === gasto.id
        ? gasto : gastoStatee)
      setGastos(gastosActualizados);
    } else {

      gasto.id = generarId();
      gasto.fecha = Date.now();  //retorna la fecha en la que se genera
      setGastos([...gastos, gasto])
    }



    setAnimarModal(false)

    setTimeout(() => {

      setModal(false)
    }, 700);
    //MOSTRAR UNA SOLA VES EL ALERT =   !sweet
    if (!sweetAlertMostrado)
      setTimeout(() => {

        const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.justifyContent = 'center';  // Centrar horizontalmente
    div.style.alignItems = 'center';   
    div.style.gap = '1';

    const img1 = document.createElement('img');
    img1.src = 'public/left.gif';
    img1.alt = 'deslizar izquierda';
    img1.style.width = '170px';
    img1.style.height = '140px';

    const img2 = document.createElement('img');
    img2.src = 'public/right.gif';
    img2.alt = 'deslizar derecha';
    img2.style.width = '170px';
    img2.style.height = '140px';

    div.appendChild(img1);
    div.appendChild(img2);

        Swal.fire({
          html: div,
 
          title: '<span style="color: grey">---Gastos---</span>\n\n <span style="color: green">--->Editar</span>\n <span style="color: red"> <---Eliminar</span>',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        setSweetAlertMostrado(true)
      }, 1000);
  }




  const eliminarGasto = id => {

    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizados)
  }




  return (
    <div className={modal ? 'fijar' : ''}>

      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setGastos={setGastos}
        isvalidControl={isvalidControl}
        setIsvalidControl={setIsvalidControl}

      />

      {isvalidControl ? (

        <>
          <main>
            <Filtros

              filtro={filtro}
              setFiltro={setFiltro}

            />



            <ListadoGasto
              gastos={gastos}
              setGastosEditar={setGastosEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltro={gastosFiltro}


            />

          </main>


          <div className='nuevo-gasto'>

            <img
              src={nuevoGasto}
              alt="boton de nuevo gasto"
              onClick={handleNuevoGasto}
            />

          </div>

        </>
      ) : ''}

      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastosEditar={gastosEditar}

      />

      }

    </div>
  )
}

export default App

