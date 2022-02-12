const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'nombre',
      password : 'contraseña',
      database : 'ecommerceknex'
    },


    useNullAsDefault:true,

    pool:{
      min:2,
      max:8
    }

  });

        knex.schema.createTableIfNotExists("productos",(table)=>{
            table.increments("id").primary(),
            table.string("nombre");
            table.string("descripcion");
            table.string("precio");
        })
        .then((res)=>{
            console.log('tabla creada OK!')
        })
        .catch((err)=>{
            console.log(err)
        })  

        


  module.exports = knex