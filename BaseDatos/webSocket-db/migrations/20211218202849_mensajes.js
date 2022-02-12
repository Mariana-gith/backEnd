exports.up = function(knex) {
    knex.schema.createTable("mensajes",(table)=>{
      table.increments("id").primary(),
      table.string("usuario");
      table.string("mensaje")})
      .then((res)=>{
          console.log('tabla creada OK!')
      })
      .catch((err)=>{
          console.log(err)
      })
  };
  
  exports.down = function(knex) {
    
  };
  