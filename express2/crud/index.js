const express = require('express')
const app = express()
const port = 8080 

let arrP = []

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const contenedor = require("./contenedor")

let c = new contenedor.Contenedor("productos.txt")

const apisRoutes = require("./productos")
app.use("/api/productos",apisRoutes)

app.use("/static",express.static(__dirname + "/public"))


app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
})


app.get("/form", (req,res)=>{
    res.sendFile(__dirname + "/public/form.html")
})

app.post("/",  async (req,res)=>{
    await c.save(req.body)
    console.log(req.body)
    res.send('Producto cargado correctamente')
})

app.listen(port, ()=>{
    console.log('Server run port ',port)
})

