import { useState, useEffect } from 'react'

const Filtros = ({ filtro, setFiltro }) => {
    return (
        <div className='filtros sombra contenedor'>

            <form>

                <div className='campo'>

                    <label htmlFor="">Filtrar Gastos</label>
                    <select
                        value={filtro}
                        onChange={e => setFiltro(e.target.value)}

                    >


                        <option value="">--Todas Las Categorias--</option>
                        <option value="comida">comida</option>
                        <option value="casa">casa</option>
                        <option value="gastos">gastos varios</option>
                        <option value="ocio">ocio</option>
                        <option value="salud">salud</option>
                        <option value="transporte">transporte</option>
                        <option value="suscripciones">suscripciones
                        </option>

                    </select>

                </div>

            </form>

        </div>
    )
}

export default Filtros
