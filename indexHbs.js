const express = require('express')
const {Router} = express
let arr = require('./data/productos')



const router = new Router()




router.get("/", (req,res)=>{
    res.render("home")
})

router.get("/form",(req,res)=>{
    res.render("form")
})

router.get("/productos", (req,res)=>{
    res.render("productos",{data: arr} )
})

router.post("/form", (req,res)=>{
    console.log(req.body)
    let newProd={
        id: arr.length +1 ,
        nombreprod : req.body.nombreprod,
        precio: req.body.precio
    }
    arr.push(newProd)
    res.redirect("/hbs/productos")
})


module.exports = router