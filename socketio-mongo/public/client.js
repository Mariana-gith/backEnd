const socket= io()

socket.on("menssenge_client",(data,or,norm)=>{
    titulo(or,norm)
    render(data)
    socket.emit("menssege_back", "Mensaje recibido")
})

const render = (d) =>{
    let html = d.map((da)=>{
        return `<p> <strong> ${da.author.nombre} </strong> : ${da.text}</p>`
    }).join(" ")

    document.querySelector("#caja").innerHTML = html
}

const titulo = (num1,num2) =>{
    let porcentaje= parseInt((num1 * 100) / num2 + "%")
    console.log("esto es porcentaje", porcentaje, "%")
    
    document.querySelector('#titulo').innerHTML=`<p> <strong> My Appwhat</strong></p> <p> (Porcentaje de Compresión :${porcentaje}%) </strong> </p>`
    
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
    console.log("Este es el mensaje",objMsj)
    socket.emit("msn__client", objMsj)
    mensaje: document.getElementById('mensaje').value= " "
    usuario: document.getElementById('nombre').value
    usuario: document.getElementById('apellido').value
    usuario: document.getElementById('edad').value
    usuario: document.getElementById('alias').value
    return false
}
