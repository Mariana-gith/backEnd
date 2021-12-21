const express = require('express')
const user = require('./db')

const app = express()
app.use(express.json())

app.post("/", async (req,res)=>{
    let userCreate = await user.create({
        nombre:req.body.nombre,
        email:req.body.email      
    })
  
    res.json({
        message :"guardado",
        data: userCreate
    })
})


app.listen(3004, ()=>{
    console.log("erver OK!!")
})