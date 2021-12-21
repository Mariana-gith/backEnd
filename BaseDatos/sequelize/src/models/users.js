module.exports =(sequelize, type )=>{
    return sequelize.define("user",{
        id: {
        type:type.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    nombre: type.STRING,
    email: type.STRING
    })
}