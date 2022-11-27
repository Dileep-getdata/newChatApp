const display=document.getElementById('displayMsg');
const token=localStorage.getItem('token');


// oldArr=localStorage.getItem('msgList').split(',');
var lastId=localStorage.getItem('lastId');
window.addEventListener('DOMContentLoaded', async ()=>{
    displayMsg();
    gettingMsg();   
    
   
})

async function gettingMsg(){
    try{              
        let newArr=[];
        let lastId=localStorage.getItem('lastId');
        const response=await axios.get(`http://localhost:3050/chat/chat?lastId=${lastId}`,{headers:{'Authentication':token}});
        const usersN=response.data.users;
        const chatMsgs=response.data.chat;
        
        // usersN.forEach(user=>{           
        //     const firstNme=(user.userName).split(' ')[0]+' joined !';
        //     newArr.push(firstNme);
        // })       
        
        chatMsgs.forEach(chatMsg=>{
            newArr.push(chatMsg.message);
            lastId=chatMsg.id;
        })        
        localStorage.setItem('lastId',lastId);
        console.log(newArr)       
        if(newArr.length>0){            
            addLocalStorage(newArr);
        }             
        
    }catch(err){
        console.log(err);
    }
}
//
// setInterval(()=>gettingMsg(),1000)
// 
function addLocalStorage(newArr){   
    let oldArr=[];       
    if(localStorage.getItem('msgList')!==null){ 
        console.log('lcoal')
        const inlist=localStorage.getItem('msgList').split(',')
        oldArr=oldArr.concat(inlist);
    }    
    oldArr=oldArr.concat(newArr);
    console.log(oldArr);
    localStorage.setItem('msgList',oldArr)
    console.log(oldArr);
   
}
// 

// 
function displayMsg(){
    let oldArr=[];
    const displayMsg= document.getElementById('displayMsg'); 
    const inlist=localStorage.getItem('msgList').split(',')
    oldArr=oldArr.concat(inlist);
    let innerList=`<ul>`;
    if(oldArr){                
        oldArr.forEach(eachMsg=>{
            innerList += `<li>${eachMsg}</li>`;
            // console.log(eachMsg);
        }) 
        displayMsg.innerHTML=innerList+`</ul>`;
    }else{
        displayMsg.innerHTML="Send message";
    } 
}

// 
// 
const chatMsg=document.getElementById('chatMsg');
chatMsg.addEventListener('submit',async(e)=>{
    try{
        e.preventDefault();
        const chatMessage=e.target.message.value;
       const chatPost=await axios.post('http://localhost:3050/chat/chat',{chat:chatMessage},{headers:{'Authentication':token}});    
        document.getElementById('message').value='';
        // await gettingMsg();
        displayMsg();
    }catch(err){
        console.log(err);
    }   
})
// 

// 
const crtGrpBtn=document.getElementById('crtGrpBtn');
crtGrpBtn.addEventListener('click',()=>{
    window.location.href="./createGroup.html";
})
