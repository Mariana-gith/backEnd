const http= require('http')
const moment = require('moment')

let server = http.createServer((req,res)=>{
    let start = moment().format("HH:mm")
    if(req.url === "/"){
        res.end("Hola mundo")
    }

    if(req.url === "/fyh"){
        res.end(start)
    }
    if(req.url === "/home"){
        res.end(JSON.stringify({Message : "Hola mundo desde home", numero : 4}))
    }
});


server.listen(3002,()=>{
    console.log('server run on port 3002')
})