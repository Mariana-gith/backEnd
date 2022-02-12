const { json } = require("express")
const req = require("express/lib/request")



module.exports = class Contenedor {
    constructor(tabla, knexConfig){
        this.tabla = tabla
        this.knex = knexConfig
    }

    save(data){
        return this.knex(this.tabla).insert(data)
    }

   otenerById(id) {
        return this.knex.from(this.tabla)
        .where({id})
    }

    getAll (){
      return this.knex.from(this.tabla)
        .orderBy("id","desc")
    }

    deleteAll(){
        return this.knex(this.tabla)
        .del()
    }

    deleteById(id){     
      return this.knex(this.tabla)
        .where({id})
        .del()
        
    }

    upDateById (id,nuevoProd){
        return this.knex(this.tabla)
        .where({id})
        .update(nuevoProd)
    }

    
        
}
