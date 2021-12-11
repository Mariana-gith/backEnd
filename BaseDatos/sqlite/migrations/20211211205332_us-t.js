
exports.up = function(knex) {
    knex.schema
        .createTable("usuarios",(table)=>{
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
  
};

exports.down = function(knex) {
  
};
