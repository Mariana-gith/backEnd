const express = require ("express")

const {Router} = express


const router = new Router()

const contenedor = require("./contenedor")
router.use(express.json())

let c = new contenedor.Contenedor("productos.txt")

router.get ("/", async (req,res)=>{
    let allProd=  await c.getAll()
    res.send(allProd)
    console.log( 'productos', allProd)
})

router.get("/:id", async (req,res)=>{
    let {id} = req.params
    let byId = await c.otenerById(id)
    console.log('por id', byId)
    res.send( byId )
})

router.post("/", async(req,res)=>{
    let nuevoProd = await c.save(req.body)
    res.send('Post is OK!')
    console.log(nuevoProd)
})

router.put("/:id", async (req,res)=>{
    let params = req.body
    params.id = req.params.id
    console.log(params)
    await c.upDateById(params)
    res.send('Producto actulizado correctamente!')

  
})
 
router.delete("/:id", async (req,res)=>{
    await c.deleteById(req.params.id)
    res.send('se borro el producto')
})



module.exports = router