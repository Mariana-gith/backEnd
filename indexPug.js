const express = require('express')
const {Router}= express
const pug = require('pug')



const router = new Router()

let arr = require('./data/productos')


const app = express()





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
    console.log(req.body)
    let newProd={
        id: arr.length +1 ,
        nombreprod : req.body.nombreprod,
        precio: req.body.precio
    }
    arr.push(newProd)
    res.redirect("/productos")
})


module.exports = router

