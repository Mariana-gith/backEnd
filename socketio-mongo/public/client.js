const socket= io()

socket.on("menssenge_client",(data)=>{
    console.log ("esto es data",data)
    render(data)
    socket.emit("menssege_back", "Mensaje recibido")
})

const render = (d) =>{
    let html = d.map((da)=>{
        return `<p> <strong> ${da.author.nombre} </strong> :  ${da.text}</p>`
    }).join(" ")

    document.querySelector("#caja").innerHTML = html
}

const addMessage = () =>{
    console.log("entre")
    let objMsj ={
        id:document.getElementById('mail').value, 
        nombre:document.getElementById("nombre").value,      
        apellido:document.getElementById("apellido").value,      
        edad:document.getElementById("edad").value,      
        alias: document.getElementById('alias').value,
        text: document.getElementById('mensaje').value
    }
    console.log("Estoy por escribir un mensaje",objMsj)
    socket.emit("msn__client", objMsj)
    mensaje: document.getElementById('mensaje').value= " "
    usuario: document.getElementById('nombre').value
    usuario: document.getElementById('apellido').value
    usuario: document.getElementById('edad').value
    usuario: document.getElementById('alias').value
    return false
}
