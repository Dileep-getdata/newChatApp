const Sequelize=require('sequelize');

const database=require('../util/database');

const Chat=database.define('chat',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

    },
    message:{
        type:Sequelize.STRING,
    }
    

});
module.exports=Chat;