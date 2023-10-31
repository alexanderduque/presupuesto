import { useState, useEffect } from 'react'
import cerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'


const Modal =
    ({ setModal,
        animarModal,
        setAnimarModal,
        guardarGasto,
        gastosEditar }) => {

        const [mensaje, setMensaje] = useState('')
        const [nombre, setNombre] = useState('')
        const [cantidad, setCantidad] = useState('')
        const [categoria, setCategoria] = useState('')
        const [id, setId] = useState('')
        const [fecha, setFecha] = useState('')

        useEffect(() => {
            if (Object.keys(gastosEditar).length > 0) {

                setNombre(gastosEditar.nombre)
                setCantidad(gastosEditar.cantidad)
                setCategoria(gastosEditar.categoria)
                setId(gastosEditar.id)
                setFecha(gastosEditar.fecha)
            }

        }, [])


        const cerrarModal = () => {

            setAnimarModal(false)

            setTimeout(() => {

                setModal(false)
            }, 500);



        }

        const handleSubmit = e => {

            e.preventDefault()

            if ([nombre, cantidad, categoria].includes('')) {

                setMensaje("TODOS LOS CAMPOS SON OBLIGATORIOS")

                return
            }

            guardarGasto({ nombre, cantidad, categoria, id, fecha })

            setMensaje('')

        }


        return (
            <div className='modal'>

                <div className='cerrar-modal'>

                    <img
                        src={cerrarBtn}
                        alt="Cerrar Modal"
                        onClick={cerrarModal}


                    />


                </div>

                <form
                    onSubmit={handleSubmit}
                    className={`formulario ${animarModal ? "animar" : "cerrar"}`}

                >
                    <legend>{gastosEditar.nombre ? 'EDITAR GASTO' : 'NUEVO GASTO'}</legend>

                    {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                    <div className='campo'>
                        <label htmlFor="nombre">Nombre del gasto</label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            placeholder='Añade el nombre del gasto'
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}

                        />


                    </div>


                    <div className='campo'>
                        <label htmlFor="cantidad  ">Cantidad</label>
                        <input
                            type="number"
                            name="cantidad"
                            id="cantidad"
                            placeholder='Añade la cantidad del gasto: ej.500'
                            value={cantidad !== 0 ? cantidad : ''}
                            onChange={e => setCantidad(Number(e.target.value))}

                        />


                    </div>



                    <div className="campo">
                        <label htmlFor="categoria">Categoria</label>
                        <select
                            id="categoria"
                            value={categoria}
                            onChange={e => setCategoria(e.target.value)}
                        >

                            <option value="">--Seleccione--</option>

                            <option value="comida">comida</option>
                            <option value="casa">casa</option>
                            <option value="gastos">gastos varios</option>
                            <option value="ocio">ocio</option>
                            <option value="salud">salud</option>
                            <option value="transporte">transporte</option>
                            <option value="suscripciones">suscripciones</option>


                        </select>


                    </div>

                    <input
                        type="Submit"
                        value={gastosEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
                    />


                </form>


            </div>
        )
    }

export default Modal
