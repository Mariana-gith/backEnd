const {normalize,schema}= require('normalizr')
const oData = require('./data')
const util = require('util')

const authorSchema = new schema.Entity("author")
const textSchema = new schema.Entity("text",{
    autor:authorSchema
})

const chatSchema = new schema.Entity("chat",{
    author:authorSchema,
    text:textSchema
})

const chatNormale= normalize(oData,chatSchema)

const print = (obj) =>{
    console.log(util.inspect(obj,false,12,true))
}

print(chatNormale)