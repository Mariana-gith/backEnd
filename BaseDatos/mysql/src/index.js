const express = require('express')
const knex = require('./db')


const app = express()
app.use(express.json())

// Leer
app.get("/all",(rq,res)=>{
    knex
    .from("usuarios")
    .orderBy("id","desc")
    .then((json)=>{
      console.log(res)
      res.send({data:json})
    })
})


//Crear
app.post("/", (req,res)=>{
    let data ={
        nombre:req.body.nombre,
        enail:req.body.enail,
        contraseña:req.body.contraseña
       }
    console.log( 'data:',data)
    knex("usuarios")
        .insert(data)
        .then(()=>{
            res.send('Registro Ok!!')
    })
    .catch((err)=>{
        res.send(err)
    })
})

// Obtener po ID

app.get("/:id", (req,res)=>{
    knex.from("usuarios")
    .where({id: req.params.id})
    .then((json)=>{
        res.send({data:json})
    })
    .catch((err)=>{
        res.send(err)
    })
    
})

//Actualizar

app.put("/updateUser/:id",(req,res)=>{
    knex("usuarios")
        .where({id:req.params.id})
        .update({nombre:req.body.nombre,enail:req.body.enail})
        .then((json)=>{
            res.send({data:json})
        })
        .catch((err)=>{
            res.send(err)
        })
})

//Borrar

app.delete("/deleteUser/:id",(req,res)=>{
    knex("usuarios")
        .where({id:req.params.id})
        .del()
        .then((json)=>{
            res.send({data:'User Eliminado'})
        })
        .catch((err)=>{
            res.send(err)
        })
})

app.listen(8080, ()=>{
    console.log('server OK!!')
})