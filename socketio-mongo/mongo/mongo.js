const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/appwhat')

mongoose.connection.on('open',()=>{
    console.log('base de datos conectada OK')
})

mongoose.connection.on('error', ()=>{
    console.log('error al conectar')
})