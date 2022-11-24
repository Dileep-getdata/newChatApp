const express=require('express');

const app=express();

const bodyparse=require('body-parser');


const dotenv=require('dotenv');
dotenv.config();

const sequelize=require('./util/database');

const userRouter=require('./router/users');

const Users=require('./models/users');


app.use(express.json());

const cors=require('cors');
app.use(cors());

app.use('/user',userRouter);

sequelize 
// // .sync({force:true})
.sync()
.then((result)=>{
//     // https.createServer({key:privatekey,cert:certificate},app)
    app.listen(3050);
})
.catch((err)=>console.log(err));



