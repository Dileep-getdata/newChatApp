const express=require('express');
const path=require('path');
const fs=require('fs');

const app=express();

const bodyparse=require('body-parser');


const dotenv=require('dotenv');
dotenv.config();

const sequelize=require('./util/database');

const userRouter=require('./router/users');
const chatRouter=require('./router/chat');

const Users=require('./models/users');


app.use(express.json());

const cors=require('cors');
app.use(cors());

app.use('/user',userRouter);
app.use('/chat',chatRouter);

app.use((req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,`./public/${req.url}`))
})

sequelize 
// .sync({force:true})
.sync()
.then((result)=>{
//     // https.createServer({key:privatekey,cert:certificate},app)
    app.listen(process.env.DB_PORT);
})
.catch((err)=>console.log(err));



