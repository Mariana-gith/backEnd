
const express = require('express')
var admin = require("firebase-admin");

var serviceAccount = require("./db/appwhat-d79c3-firebase-adminsdk-gnyqd-c0dc630a5c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"http://appwhat.firebaseio.com"
});

const db = admin.firestore()
const app = express()
const http = require('http')
const port = process.env.PORT || 3001
const server = http.createServer(app)
const io = require('socket.io')(server)



const {faker} = require("@faker-js/faker")
app.use(express.json())



const normalizador = require("./FuncNormalizador")

app.set("views", "./views")
app.set("view engine","ejs")

app.get("/home", (req, res)=>{
    res.render("home")
})
let arrayPersonas = []
app.get("/api/productos-test",(req,res)=>{
    for( let i=0 ; i< 5; i++){
        if(arrayPersonas.length=== 5){
          arrayPersonas=[]
        }
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

const query= db.collection('Mensajes')

// websocket

io.on("connection",(socket)=>{
    
    socket.on("menssege_back", (data)=>{
        console.log("Estoy en msg back",data)
    })
    socket.on("msn__client", async (data)=>{
        let mensaje ={
            author: {
                id: data.id, 
                nombre: data.nombre, 
                apellido: data.apellido, 
                edad: data.edad, 
                alias: data.alias,
                avatar: 'url avatar (foto, logo) del usuario'
            },
            text:data.text
        }
       
        await query.add(mensaje)
        const result = []
        const snapshot = await query.get();
        snapshot.forEach(doc => {
            result.push({ id: doc.id, ...doc.data() })})
        
        let objetOrigin = {id:"007", mensajes: result}
        let norm= normalizador(objetOrigin)

        const objetOriginal=JSON.stringify(objetOrigin).length
        io.sockets.emit("menssenge_client",result,norm,objetOriginal)
    })
});




server.listen(port,()=>{
    console.log('server ok!!'+ port)
})


