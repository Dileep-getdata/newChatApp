const Sequelize=require('sequelize');

const database=require('../util/database');

const Users=database.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false

    },
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    phoneNo:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    login:{
        type:Sequelize.BOOLEAN,
    }
    

});
module.exports=Users;