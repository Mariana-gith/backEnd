const express = require('express')
const {Router}= express
const pug = require('pug')



const router = new Router()

let arr = require('./data/productos')

router.get("/", (req,res)=>{
    res.render("home")
})

router.get("/cargar",(req,res)=>{
    res.render("cargar")
})

router.get("/productos", (req,res)=>{
    res.render("productos",{data: arr} )
})

router.post("/cargar", (req,res)=>{
    console.log("RECIBI POST /CARGAR")
    console.log(req.body)
    let newProd={
        id: arr.length +1 ,
        precio: req.body.precio,
        nombreprod : req.body.nombreprod
    }
    arr.push(newProd)
    res.redirect("/pug/productos")
})




module.exports = router

