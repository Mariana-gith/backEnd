const { Sequelize } = require('sequelize');
const userModel = require('./models/users')

const sequelize = new Sequelize('ecommerce_coder', 'root', 'password', {
    host: 'localhost',
    dialect:  'mysql'
  });


  sequelize.sync({force:false}).then(()=>{
      console.log("Conectado OK!")
  }).catch(err=>{
      console.log("error de coneccion")
  })



const user = userModel(sequelize, Sequelize)

module.exports = user
  