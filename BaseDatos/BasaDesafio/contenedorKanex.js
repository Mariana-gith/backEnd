module.exports = class Contenedor {
    constructor(tabla, knexConfig){
        this.tabla = tabla
        this.knex = knexConfig
    }

    save(producto){
        return this.knex(this.tabla)
        .insert(producto)
    }

   async otenerById(id) {
       
    }

    async getAll (){
      
    }

    async deleteAll(){
        
   
    }

    async deleteById(id){       
        
    }

    async upDateById (nuevoProd){}
        
}
