const Sequelize=require('sequelize');

const database=require('../util/database');

const Groups=database.define('groups',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    createdBy:{
        type:Sequelize.STRING,
        allowNull:false,
    }
    

});
module.exports=Groups;