const {Schema,model} = require('mongoose')

const mensajeSchema = new Schema({
    author: {
        id: {type:String}, 
        nombre: {type:String}, 
        apellido: {type:String}, 
        edad: {type:Number}, 
        alias: {type:String},
        avatar: {type:String}
    },
    text:{type:String}
})

module.exports= model("Mensaje", mensajeSchema )