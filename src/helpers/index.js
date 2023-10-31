export const generarId = () => {

     const random = Math.random().toString(36).substring(2) //para numeros
     const fecha = Date.now().toString(36) //para fechas

     return random + fecha

}

export const formatearFecha = fecha => {

     const fechaNueva = new Date(fecha)
     const opciones = {
          year: 'numeric',
          month: 'long',  //DESCRIPCION DE MES LARGO
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',




     }

     //METODO PARA FORMATEAR LA FECHA EN FECHA LOCAL Y OBJ CON OPCIONES ESPECIFICAS

     return fechaNueva.toLocaleDateString('es-ES', opciones)

}