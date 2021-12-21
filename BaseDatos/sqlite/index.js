const express = require('express')



const app = express()
app.use(express.json())


const knex = require('./knexfile')

app.post("/", (req,res)=>{
    let data ={
        nombre:req.body.nombre,
        email:req.body.email,
        contraseña: req.body.contraseña
       }
    console.log( 'data:',req.body.contraseña)
    knex("usuarios")
        .insert(data)
        .then(()=>{
            res.send('Registro Ok!!')
    })
    .catch((err)=>{
        res.send(err)
    })
})

app.get("/all",(req,res)=>{
    knex
    .from("usuarios")
    .select("*")
    .orderBy("id","desc")
    .then((json)=>{
      console.log("cargado")
      res.send({data:json})
    })
})




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

app.put("/actualizar/:id",(req,res)=>{
    knex("usuarios")
        .where({id:req.params.id})
        .update({nombre:req.body.nombre,enail:req.body.enail, contraseña: req.body.contraseña})
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


app.listen(3005, ()=>{
    console.log("server ok!!",3005)
})