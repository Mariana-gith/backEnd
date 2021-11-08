const express = require('express')
const {Router}= express


const router = new Router()


let arr = require('./data/productos')





router.get("/", (req,res)=>{
    res.render("index")
})

router.get("/form", (req,res)=>{
    res.render("form")
})

router.get("/vistaProductos",(req,res)=>{
    res.render("vistaProductos", {data:arr})
  
})

router.post("/form", (req,res)=>{
    console.log(req.body)
    let newProd={
        id: arr.length +1 ,
        nombreprod : req.body.nombreprod,
        precio: req.body.precio
    }
    arr.push(newProd)
    res.redirect("/ejs/vistaProductos")
})


module.exports=router