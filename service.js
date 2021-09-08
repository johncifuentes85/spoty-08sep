//cliente (voy para el restaurante)
//restaurante = servidosr de Spotyfy

let uri = "https://api.spotify.com/v1/artists/4U7lXyKdSf1JbM1aXvsodC/top-tracks?market=us";

let token= "Authorization: Bearer BQAumM3jezlyX7kziaI7d8gcrmCXgjb3rpusjMC_a_nCUPJIs6NBUOn17U0W0qgo4oq5QMe2aYHKeXFYuyGxGligmk_59oWVMd1edoD1k8_jixbljbSM2dZHggnDhnWl-ekTT3pXgX6x"

//como es un objeto se habren llaves
let parametrosEnvio={
    method: "GET",
    headers: {
        Authorization: token
    }//para tener varios objetos
} 

//funcion de js fetch es la promesa ,  then pregunta la respuesta se hace una funcion anonima
fetch(uri,parametrosEnvio)
.then(function(respuesta){ //funcion anomina
    return(respuesta.json())//verifica que la respuesta esta en json
})
.then(function(respuesta){
    console.log(respuesta)//muestra la respuesta
    pintarDatos(respuesta)//llerar la respuesta a la funcion para que la pinte
    /*console.log(respuesta.tracks)//para acceder al atributo se pone . y el nombre
    console.log(respuesta.tracks[0].album) //para acceder a los datos de un array [posicion] y se llama el atributo 
    console.log(respuesta.tracks[0].album.images[0])
    console.log(respuesta.tracks[0].album.images[0].url)*/
})
//captura el error
.catch(function(error){
    console.log(error)
})

//pintar datos
function pintarDatos(datos){

    let fila = document.getElementById("fila")
    //.tracks es el arreglo
    datos.tracks.forEach(function(cancion){
        console.log(cancion.name)
        console.log(cancion.preview_url)
        console.log(cancion.album.images[0].url)
        console.log(cancion.popularity)

        //crear el div con js (etiqueta) con createElement
        let columna = document.createElement("div")
        //le agrego la clase al col
        columna.classList.add("col")

        //crear el div con js (etiqueta) con createElement
        let tarjeta = document.createElement("div")
        //si tiene dos clases hay que crear ambas
        tarjeta.classList.add("card")
        tarjeta.classList.add("h-100")

         //crear el img con js (etiqueta) con createElement
         let imagen = document.createElement("img")
         //se crea clase
         imagen.classList.add("card-img-top")
         imagen.src=cancion.album.images[0].url //se llama a la imagen y se envia al src

        let info = document.createElement("div")
        info.classList.add("card-body")

        let title =   document.createElement("h5")
        title.classList.add("card-title")
        title.textContent = cancion.name

        let audio = document.createElement("audio")
        audio.classList.add("w-100")

         //padres e hijos
         tarjeta.appendChild(imagen) // imangen es hijode tarjetas se evalua desde el ultimo
         columna.appendChild(tarjeta)
         fila.appendChild(columna)
         tarjeta.appendChild(info)
         info.appendChild(title)
         info.appendChild(audio)
    })
}
