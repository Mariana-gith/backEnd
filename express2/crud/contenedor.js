
const fs = require("fs")


const obtenerProductos = async (nombre) =>{
    try{
        return JSON.parse(await fs.promises.readFile(nombre,"utf-8"));
    }catch{
        return [];
    }
};

const obtenerId = (array, id) =>{
    const obtenerId = array.find(p =>p.id ==id)
    if(!obtenerId) return {error:"producto no encontrado"}
    return obtenerId
}

const borrarPorId =  (array, id) =>{
    return array.filter((i)=>i.id !== id);
}



class Producto{
    constructor(nombreprod,precio){
        this.nombreprod="calculadora",
        this.precio= 25000
    }
}


class Contenedor {
    constructor(nombre){
        this.nombre = nombre
        this.pr = []
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

   async otenerById(id) {
        if(this.pr.length > 0){
            return obtenerId(this.pr, id)
        }else{
            let productos = await obtenerProductos(this.nombre)
            return obtenerId(productos, id)
        }
    }

    async getAll (){
       return  await obtenerProductos(this.nombre)
    }

    async deleteAll(){
        if(this.pr.length === 10){
        await fs.promises.writeFile(this.nombre,"","utf-8" )
        this.pr = []
        }
    }

    async deleteById(id){       
        this.pr = await obtenerProductos(this.nombre)
        this.pr = borrarPorId(this.pr,id)
        await fs.promises.writeFile(this.nombre,JSON.stringify(this.pr,null,2),"utf-8");
    }

    async upDateById (nuevoProd){
        this.pr = await obtenerProductos(this.nombre)
        let indice= this.pr.findIndex(p=>{
            return p.id == nuevoProd.id
        })
        console.log(indice)
        this.pr[indice] = nuevoProd
        await fs.promises.writeFile(this.nombre,JSON.stringify(this.pr,null,2),"utf-8");
    }
}




const  ejecu = async () =>{
    let contenedor = new Contenedor("productos.txt");
    let producto = new Producto ('Calculadora', 234.56,'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png')

    console.log(await contenedor.save(producto))
   //console.log("Borrando por ID", await contenedor.deleteById(5))
  /*   console.log(await "Objeto por ID", contenedor.otenerById(3))
    console.log("Todos los productos que tengo", await contenedor.getAll())
    console.log("Todos los productos se borran al llegar a 10 productos", await contenedor.deleteAll())
    console.log("Largo del array", contenedor.pr.length) */
}


//ejecu()




    module.exports.Contenedor= Contenedor;

   
    
