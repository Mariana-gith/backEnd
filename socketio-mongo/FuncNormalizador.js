
const {normalize,schema}= require('normalizr')
const util= require('util')

const normalizador=(objet)=>{
        const authorSchema = new schema.Entity("author")
        const textSchema = new schema.Entity("text")
        const chtSchema = new schema.Entity("mensajes",{
            author:authorSchema,
            text:textSchema
        })
        const mensajeSchema = new schema.Entity("mensajeria",{
            mensajes:[chtSchema]
        })
        const objetnormalizado = normalize(objet,mensajeSchema)
        const print = (obj) =>{
            console.log(util.inspect(obj,false,12,true))
        }
        print(objetnormalizado)
        console.log("Ojeto original largo",JSON.stringify(objet).length) 
        console.log("Ojeto normalizado largo",JSON.stringify(objetnormalizado).length) 
        return JSON.stringify(objetnormalizado).length
}


module.exports=normalizador