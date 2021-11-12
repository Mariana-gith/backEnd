const express = require('express')
let arr = require('./data/productos')
const handlebars = require('express-handlebars')





let app = express()
let appPug = express()
let appHbs = express()


const port = 8080
const porPug = 8081
const portHbs = 8082

app.use(express.json());
app.use(express.urlencoded({extended:false}));

appPug.use(express.json());
appPug.use(express.urlencoded({extended:false}));

appHbs.use(express.json());
appHbs.use(express.urlencoded({extended:false}));

app.set("views", "./views")
app.set("view engine", "ejs") 
const ejsRoutes = require('./indexEjs')
app.use("/ejs", ejsRoutes)


appPug.set("view engine", "pug")
appPug.set("views", "./pug/views")
const pugRutes = require('./indexPug')
appPug.use("/pug", pugRutes)

appHbs.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        layoutsDir:__dirname+ "/hbs/views/layouts" ,
    defaultLayout : "index",
    partialsDir: __dirname+ "/hbs/views/partials"
})
)

appHbs.set("views", "./hbs/views")
appHbs.set("view engine", "hbs")
const hbsRoutes = require('./indexHbs')
appHbs.use("/hbs", hbsRoutes)


app.listen(port, ()=>{
    console.log('Server run port', port)
})


appPug.listen(porPug,()=>{
    console.log('Server run port', porPug)
})

appHbs.listen(portHbs,()=>{
    console.log('Server run port', portHbs)
})