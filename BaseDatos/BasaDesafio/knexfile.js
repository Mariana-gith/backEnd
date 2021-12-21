// Update with your config settings.

const knex = require("knex");

//const config = {
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './ecommerceKnex.db3'
    },
    
    useNullAsDefault:true,

    pool:{
      min:2,
      max:8
    }
  }
};

//module.exports = knex(config.development)
