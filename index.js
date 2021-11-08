const express = require('express')
let arr = require('./data/productos')



let app = express()


const port = 8080




app.use(express.json())
app.use(express.urlencoded({extended:false}))

/* 
app.set("views", "./viewsEjs")
app.set("view engine", "ejs") 
const ejsRoutes = require('./indexEjs')
app.use("/ejs", ejsRoutes)
 */

app.set("view engine", "pug")
app.set("views", "./pug/views")
const pugRutes = require('./indexPug')
app.use("/pug", pugRutes)



app.listen(port, ()=>{
    console.log('Server run port', port)
}) 


 