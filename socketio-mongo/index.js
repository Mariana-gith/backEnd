require("./mongo/mongo")
const express = require('express')
const { json } = require('express/lib/response')
const app = express()
const http = require('http')
const port = process.env.PORT || 3001
const server = http.createServer(app)
const io = require('socket.io')(server)

const Mensaje = require("./mongo/models/mensaje")

const {faker} = require("@faker-js/faker")
app.use(express.json())


const {normalize,schema}= require('normalizr')
const util= require('util')
const { text } = require("express")


app.set("views", "./views")
app.set("view engine","ejs")

app.get("/home", (req, res)=>{
    res.render("home")
})
const arrayPersonas = []
app.get("/api/productos-test",(req,res)=>{
    for( let i=0 ; i< 5; i++){
        arrayPersonas.push({
            nombre: faker.commerce.productName(),
            precio:faker.commerce.price(),
            foto:faker.image.technics(),
            id:i+1           
        })
    }
    res.render("tabla", {data:arrayPersonas})
})


app.use(express.static(__dirname+"/public"))


// websocket

io.on("connection", async(socket)=>{
    let msj= await Mensaje.find({})
    socket.on("menssege_back", (data)=>{
        console.log("Estoy en msg back",data)
    })
    socket.on("msn__client", async (data)=>{
        let mensaje = new Mensaje({
            author: {
                id: data.id, 
                nombre: data.nombre, 
                apellido: data.apellido, 
                edad: data.edad, 
                alias: data.alias,
                avatar: 'url avatar (foto, logo) del usuario'
            },
            text:data.text
        })
        msj.push(mensaje)

        let objetOrigin = {id:"007", mensajes: msj}

        const autorSchema = new schema.Entity("autor");
        const textoSchema = new schema.Entity('texto')
        const mensajeSchema = new schema.Entity("mensajes", {
           autor: autorSchema,
           texto: textoSchema
        });

        const normalizadorChat = normalize(objetOrigin,mensajeSchema) 
        const print = (obj) =>{
            console.log(util.inspect(obj,false,12,true))
        }
        print(normalizadorChat)
        const guardado = await mensaje.save()
        io.sockets.emit("menssenge_client",msj) 
    })
});








server.listen(port,()=>{
    console.log('server ok!!'+ port)
})


