
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'nombre',
      password : 'contraseña',
      database : 'ecommerce'
    }
  });

knex.schema.createTableIfNotExists("usuarios",(table)=>{
    table.increments("id").primary(),
    table.string("nombre");
    table.string("email");
    table.string("contraseña");
    table.string("rol").default("admin");
})
.then((res)=>{
    console.log('tabla creada OK!')
})
.catch((err)=>{
    console.log(err)
})
module.exports=knex
