const {normalize,schema}= require('normalizr')
const oData = require('./dataTest')
const util = require('util')



const authorSchema = new schema.Entity("author")
const textSchema = new schema.Entity("text")
const chtSchema = new schema.Entity("mensajes",{
    author:authorSchema,
    text:textSchema
})

const mensajes = new schema.Entity("mensajeria",{
    mensajes:[chtSchema]
})

const normalizado = normalize(oData,mensajes)

const print = (obj) =>{
    console.log(util.inspect(obj,false,12,true))
}

print(normalizado)

console.log("objeto normalizado",JSON.stringify(normalizado).length)
console.log("Obejto original",JSON.stringify(oData).length)