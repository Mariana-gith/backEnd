
exports.up = function(knex) {
    knex.schema.createTable("Productos",(table)=>{
      table.increments("id").primary(),
      table.string("nombre");
      table.string("descripcion");
      table.integer("precio")})
      .then((res)=>{
          console.log('tabla creada OK!')
      })
      .catch((err)=>{
          console.log(err)
      })
  };
  
  exports.down = function(knex) {
    
  };