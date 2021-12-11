const express = require('express')



const app = express()


const knex = require('./knexfile')

app.post("/", (req,res)=>{
    let data ={
        nombre:req.body.nombre,
        email:req.body.email,
        contraseña: req.body.contraseña
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


app.listen(3005, ()=>{
    console.log("server ok!!")
})