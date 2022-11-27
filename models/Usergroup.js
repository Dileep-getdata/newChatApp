
const Sequelize=require('sequelize');

const database=require('../util/database');

const Usergroup=database.define('usergroup',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

    },
   
    

});
module.exports=Usergroup;