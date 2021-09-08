let uri = "https://accounts.spotify.com/api/token";

let dato1 = "grant_type=client_credentials";
let dato2 = "client_id=e691f84b25254c039591f5275c940722";
let dato3 = "client_secret=5727aa65449940c8bf5ddf096a19eb82";

//se arman los parametros para la solicitud de tipo post
let parametrosPOST={
    method: "POST",
    headers: {
        "Content-Type":"application/x-www-form-urlencoded" //siempre lleva el tipo de contenido
    },//para tener varios objetos
    body:`${dato1}&${dato2}&${dato3}` // las comillas al reves sirven para concatenar sin usar el +
} 

fetch(uri,parametrosPOST)
.then(function(respuesta){ //funcion animina
    return(respuesta.json())//verifica que la respuesta esta en json   
})
.then(function(respuesta){//que hago con la respuesta
    console.log(respuesta)
    obtenerToken(respuesta)
})
.catch(function(error){
    console.log(error)
})

function obtenerToken(respuesta){
    let token = respuesta.token_type+" "+respuesta.access_token;
    obtenerCanciones(token)
}

function obtenerCanciones(token){
    let uri = "https://api.spotify.com/v1/artists/4U7lXyKdSf1JbM1aXvsodC/top-tracks?market=us";

    //como es un objeto se habren llaves
let parametrosEnvio={
    method: "GET",
    headers: {
        Authorization: token
    }//para tener varios objetos
} 

fetch(uri,parametrosEnvio)
.then(function(respuesta){ //funcion anomina
    return(respuesta.json())//verifica que la respuesta esta en json
})
.then(function(respuesta){
    console.log(respuesta)//muestra la respuesta
    pintarDatos(respuesta)//llerar la respuesta a la funcion para que la pinte
})
//captura el error
.catch(function(error){
    console.log(error)
})

}

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
        audio.src=cancion.preview_url;
        audio.setAttribute("controls","controls")

         //padres e hijos
         tarjeta.appendChild(imagen) // imangen es hijode tarjetas se evalua desde el ultimo
         columna.appendChild(tarjeta)
         fila.appendChild(columna)
         tarjeta.appendChild(info)
         info.appendChild(title)
         info.appendChild(audio)
    })
}