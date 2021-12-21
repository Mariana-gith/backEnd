const express = require('express')
const Contenedor = require('./contenedorKanex')
const contenedorKnex = require('./contenedorKanex')


const app = express()
app.use(express.json())

const knex = require('./knexfile')

const contenedor = new Contenedor("Productos", knex);

app.post("/", (req,res)=>{
    let data ={
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        precio: req.body.precio
    }
    console.log( 'data:',req.body)

    contenedor.save(data)
    .then((data) => {
        console.log(data)
        res.send('Registro Ok!!')
    })
    .catch((err)=>{
        res.send(err)
    })
})

app.get("/all",(req,res)=>{
    contenedor.getAll()
    .then((json)=>{
      console.log("cargado")
      res.send({data:json})
    })
    .catch( err => res.send(err))
})



app.get("/:id", (req,res)=>{
    contenedor.otenerById(req.params.id)
    .then((json)=>{
        res.send({data:json})
    })
    .catch((err)=>{
        res.send(err)
    })
})

//Actualizar

app.put("/actualizar/:id",(req,res)=>{
    contenedor.upDateById(req.params.id)
        .then((json)=>{
            console.log("actualizado")
            res.send({data:json})
        })
        .catch((err)=>{
            res.send(err)
        })
})

//Borrar

app.delete("/borrar/:id",(req,res)=>{
   contenedor.deleteAll()
        .then((json)=>{
            res.send({data:'User Eliminado'})
        })
        .catch((err)=>{
            res.send(err)
        })
})



app.listen(3000,()=>{
    console.log('server OK!!',3000)
})