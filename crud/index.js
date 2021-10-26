const express = require('express')
const app = express()

let arr = require('./arr')


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

app.get("/users",(req,res)=>{
    res.json(arr)
})

app.get("/:id",(req,res)=>{
  
    let {id} = req.params

    let newArr = arr.filter((p)=>{
        return p.id === parseInt( id)
    })
    console.log(newArr)
    res.send({data:newArr[0]})
})

app.post('/productos', (req,res)=>{
    res.send('Post is OK!')
    let obj = {
        nombreprod : req.body.nombreprod,
        precio:req.body.precio,
        id: req.body.id
    }
    arr.push(obj)
    console.log(req.body)
})

app.put("/:id", (req,res)=>{
    let index = arr.findIndex(i =>{
        return i.id == req.params.id
    })
    arr[index].nombreprod = req.body.nombreprod
    arr[index].precio = req.body.precio

    res.send('Producto actulizado correctamente!')
})

app.delete("/:id", (req,res)=>{
    let arrDel = arr.filter(e=>{
        return e.id != req.params.id
    })
    
    arr = arrDel
    res.send({messege: 'Producto eliminado correctamente'})
})

app.listen(3002, ()=>{
    console.log('Server run port 3002')
})

