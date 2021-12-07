const express = require('express')

const app = express()

app.get("/", (req:any,res:any)=>{
    res.send({message:"Hola!!"})
})

app.get("/api", (req:any,res:any)=>{
    res.send({message:"Hola con api!!"})
})


app.listen(8080, ()=>{
    console.log("server Ok!!")
})