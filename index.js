const express = require('express')
let arr = require('./data/productos')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))


const port = 8080

app.set("views", "./views")
app.set("view engine", "ejs")


app.get("/", (req,res)=>{
    res.render("index")
})

app.get("/form", (req,res)=>{
    res.render("form")
})

app.get("/vistaProductos",(req,res)=>{
    res.render("vistaProductos", {data:arr})
})

app.post("/form", (req,res)=>{
    console.log(req.body)
    let newProd={
        id: Math.random(),
        nombreprod : req.body.nombreprod,
        precio: req.body.precio
    }
    arr.push(newProd)
    res.redirect("/vistaProductos")
})



app.listen(port, ()=>{
    console.log('Server run port', port)
})

