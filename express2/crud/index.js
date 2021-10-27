const express = require('express')
const app = express()
const port = 3002

let contenedor = require("./contenedor")


app.use(express.json())

app.get("/nuevo",(req,res)=>{

    console.log(req.query)
    let objNew ={
        nombreprod: req.query.nombreprod,
        precio: req.query.precio,
        id : 9

    }
    arr.push(objNew)
    
    res.send('Usuario cargado correctamente !')
})



let c = new contenedor.Contenedor("productos.txt")

app.get ("/productos", async (req,res)=>{
    let allProd=  await c.getAll()
    res.send(allProd)
    console.log( 'productos', allProd)
})

 app.get("/:id", async (req,res)=>{
     let {id} = req.params
     let byId = await c.otenerById(id)
     console.log('por id', byId)
     res.send( byId )

  
})

app.post('/productos', async (req,res)=>{
    let nuevoProd = await c.save(req.body)
    res.send('Post is OK!')
  
    console.log(nuevoProd)
})

app.put("/:id", async (req,res)=>{
    let params = req.body
    params.id = req.params.id
    console.log(params)
    await c.upDateById(params)
    res.send('Producto actulizado correctamente!')

  
})
 
app.delete("/:id", async (req,res)=>{
    await c.deleteById(req.params.id)
    res.send('se borro el producto')
})


app.listen(port, ()=>{
    console.log('Server run port ',port)
})

