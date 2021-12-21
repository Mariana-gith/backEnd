const { json } = require("express")
const req = require("express/lib/request")



module.exports = class Contenedor {
    constructor(tabla, knexConfig){
        this.tabla = tabla
        this.knex = knexConfig
    }

    async save(data){
        return await this.knex(this.tabla).insert(data)
    }

   async otenerById(id) {
        return await this.knex.from(this.tabla)
        .where({id})
    }

    async getAll (){
      return await  this.knex.from(this.tabla)
        .orderBy("id","desc")
    }

    async deleteAll(){
        return await this.knex(this.tabla)
        .del()
    }

    async deleteById(id){     
      return await this.knex(this.tabla)
        .where({id})
        .del()
        
    }

    async upDateById (id,nuevoProd){
        return await this.knex(this.tabla)
        .where({id})
        .update(nuevoProd)
    }
        
}
