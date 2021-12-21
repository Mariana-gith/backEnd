const console = require('console')
const express = require('express')
const { json } = require('express/lib/response')

const app = express()
const http = require('http')
const Contenedor = require('./contenedorKanex')
const port = process.env.PORT || 3001
const server = http.createServer(app)
const io = require('socket.io')(server)
const knex = require("./knexfile")
const knexMysql = require('./src/db')

app.use(express.json())

const contenedorProductos = new Contenedor("productos", knexMysql)

let msj= []

app.use(express.static(__dirname+"/public"))

app.get("/hola",(req,res)=>{
    res.send("Todo ok por aca")
})

// websocket
io.on("connection",(socket)=>{

    socket.on("menssege_back", (data)=>{
        console.log("Estoy en msg back",data)
    })

    socket.on("msn__client", async (data)=>{
      await knex("mensajes").insert(data)
       
       io.sockets.emit("menssenge_client",msj)
    })

});


//Crear
app.post("/", (req,res)=>{
    let data ={
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        precio:req.body.precio
       }
   contenedorProductos.save(data)
        .then((data)=>{
            res.send('Registro Ok!!')
    })
    .catch((err)=>{
        res.send(err)
    })
})
// Leer 
app.get("/all", (req,res)=>{
    contenedorProductos.getAll()
    .then((json)=>{
      console.log(res)
      res.send({data:json})
    })
    .catch((err)=>{
        console.log(err)
    })
})

// Obtener por ID
app.get("/:id",(req,res)=>{
    contenedorProductos.otenerById(req.params.id)
    .then((json)=>{
        res.send({data:json})
    })
    .catch((err)=>{
        res.send(err)
    })
    
})

//Borrar por ID
app.delete("/del/:id",(req,res)=>{
    let id = req.params.id
    contenedorProductos.deleteById(id)
    .then((json)=>{
        res.send({data:"Producto Elimindo"})
    })
    .catch((err)=>{
        console.log(err)
    })
})

//Borrar todo
app.delete("/delAll",(req,res)=>{
    contenedorProductos.deleteAll()
    .then((json)=>{
        res.send({data: "Todo Eliminado"})
    })
    .catch((err)=>{
        console.log(err)
    })
})

//Actualizar
app.put("/upDate/:id",(req,res)=>{
    let id = req.params.id

    let nuevoProd = {
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        precio:req.body.precio
    }
    
    contenedorProductos.upDateById(id,nuevoProd)
    .then((json)=>{
        res.send({data:json})
    })
    .catch((err)=>{
        res.send(err)
    })
})




server.listen(port,()=>{
    console.log('server ok!!'+ port)
})