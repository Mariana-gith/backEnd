const express = require('express')
const fs = require('fs')
const  app = express()




const obtenerProductos = async (nombre) =>{
    try{
        return JSON.parse(await fs.promises.readFile(nombre,"utf-8"));
    }catch{
        return [];
    }
};
class Producto{
    constructor(nombreprod,precio,foto){
        this.nombreprod=nombreprod,
        this.precio= precio,
        this.foto=foto
    }
}

class Contenedor {
    constructor(nombre){
        this.nombre = nombre
        this.pr =[]
    }

    async save(producto){
        let productos = await obtenerProductos(this.nombre)

        if (productos.length > 0) {
            producto.id = productos.length + 1;
            productos.push(producto);
            this.pr = productos;
            await fs.promises.writeFile( this.nombre,JSON.stringify(this.pr, null, 2), "utf-8");
            return producto.id;
        }else{
            producto.id = 1;
            this.pr.push(producto);
            await fs.promises.writeFile(this.nombre,JSON.stringify(this.pr,null,2),"utf-8");
            return producto.id;
        }
    }
}


const  ejecu = async () =>{
    let contenedor = new Contenedor("productos.txt");
    let producto = new Producto ('Calculadora', 234.56,'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png')

    console.log(await contenedor.save(producto))
}

ejecu()


app.get( '/productos', (req,res)=>{
    fs.readFile("./productos.txt",{encoding: "utf-8"}, (error, data)=>{
       if(error)throw "error al leer"
       let array = JSON.parse(data)
        res.send({data:array})
    })
} )

app.get('/productoRandom', (req, res)=>{
    fs.readFile("./productos.txt",{encoding: "utf-8"}, (error, data)=>{
        let array = JSON.parse(data)
        let random = Math.floor(Math.random()*array.length);
        console.log(random)
        res.send(array[random])
    })
})


app.listen(8080, ()=>{
    console.log('Server run on port 8080')
})


