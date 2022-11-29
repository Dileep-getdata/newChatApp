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
const groupRouter=require('./router/group');

const Users=require('./models/Users');
const Chat=require('./models/Chat');
const Groups=require('./models/groups');
const Usergroup=require('./models/Usergroup');


app.use(express.json());

const cors=require('cors');
app.use(cors());

app.use('/user',userRouter);
app.use('/chat',chatRouter);
app.use('/group',groupRouter);

app.use((req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,`./public/${req.url}`))
})

Chat.belongsTo(Users,{constrains:true});
Users.hasMany(Chat);

Groups.belongsToMany(Users,{through:Usergroup});
Users.belongsToMany(Groups,{through:Usergroup});

Groups.hasMany(Chat);
Chat.belongsTo(Groups);


sequelize 
// .sync({force:true})
.sync()
.then((result)=>{
//     // https.createServer({key:privatekey,cert:certificate},app)
    app.listen(process.env.DB_PORT);
})
.catch((err)=>console.log(err));



