const socket= io()

socket.on("menssenge_client",(data)=>{
    console.log(data)
    render(data)
    socket.emit("menssege_back", "Mensaje recibido")
})

const render = (d) =>{
    let html = d.map((da)=>{
        return `<p> <strong> ${ da.usuario} </strong> :  ${ da.mensaje}</p>`
    }).join(" ")

    document.querySelector("#caja").innerHTML = html
}

const addMessage = () =>{
    let objMsj ={
        usuario: document.getElementById('user').value,
        mensaje: document.getElementById('msn').value
    }

    console.log("Estoy por escribir un mensaje",objMsj)
    socket.emit("msn__client", objMsj)
    mensaje: document.getElementById('msn').value=""
    usuario: document.getElementById('user').value

    return false
}




