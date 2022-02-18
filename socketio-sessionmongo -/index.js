
const express = require('express')
const session= require('express-session')
var admin = require("firebase-admin")
const cookieParser = require('cookie-parser')




const MongoStore = require('connect-mongo')
const advancedOptions= {useNewUrlParser:true,useUnifiedTopology:true}

const app = express()

app.use(cookieParser())
app.use(session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge:60000
    },
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://Mariana:mariana@cluster0.kqhfa.mongodb.net/Cluster0?retryWrites=true&w=majority',
        mongoOptions:advancedOptions
    }),
}))

var serviceAccount = require("./db/appwhat-d79c3-firebase-adminsdk-gnyqd-c0dc630a5c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"http://appwhat.firebaseio.com"
});

const db = admin.firestore()
const http = require('http')
const port = process.env.PORT || 3001
const server = http.createServer(app)
const io = require('socket.io')(server)



const {faker} = require("@faker-js/faker")
app.use(express.json())



const normalizador = require("./FuncNormalizador")

app.set("views", "./views")
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))

//LOGIN
app.get("/login",(req,res)=>{
    res.render("login")
    console.log("id de la session", req.session.id)
    
})

 app.post("/login", (req,res)=>{
    const username=req.body.nombre 
    console.log(username)
    if(username!="Samanta"){
        return res.send("Login failed")
    }
    req.session.nombre=username
    req.session.admin=true
    console.log("Esto es req.session",req.session)
    res.redirect("/home")
})

app.get("/saliendo", (req,res)=>{
    let username = req.session.nombre
    res.render("saliendo",{bienvenid:username})
})
app.get("/logout",(req,res)=>{
    setTimeout(()=>{
        req.session.destroy((err)=>{
            if(err) {
                console.log("Error",err)
            }else{
              res.redirect("/login")
            }
        })
    },3000)
})


let arrayPersonas = []
app.get("/api/productos-test",(req,res)=>{
    if( req.session.admin===true){
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
        let username = req.session.nombre
        res.render("tabla", {data:arrayPersonas,bienvenid:username})
    }else{
        res.send("No puedes acceder a esta vista ")
    }
})

app.get("/home",(req,res)=>{
    if( req.session.admin===true){
        let username = req.session.nombre
        res.render("home",{bienvenid:username})
    }else{
        let username = req.session.nombre
        res.render("home",{bienvenid:"Invitad@"})
    }
})
    
app.get("/perfil",(req,res)=>{
    if(req.session.admin===true){
        res.send("Usuario autorizado")
    }else{
        res.send("Usuario NO autorizado")

    }
})


app.get("/root",(req,res)=>{
    if(req.session.contador){
        let username = req.session.nombre
        req.session.contador++
        req.session.nombre
        res.send(`Hola ${username} Numero de visitas: ${req.session.contador}`)

    }else{
        req.session.contador=1
        res.send("Bienvenido")
    }
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


