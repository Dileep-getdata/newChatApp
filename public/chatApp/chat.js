const display=document.getElementById('displayMsg');
const token=localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', async ()=>{
    gettingMsg();
   
})
var lastId=0;
async function gettingMsg(){
    try{
        const displayMsg= document.getElementById('displayMsg');
        let oldArr;
        const newArr=[];
        
        let innerList=`<ul>`
        const response=await axios.get(`http://localhost:3050/chat/chat?lastId=${lastId}`,{headers:{'Authentication':token}});
        const usersN=response.data.users;
        const chatMsgs=response.data.chat;
        console.log(chatMsg);
        usersN.forEach(user=>{           
            const firstNme=(user.userName).split(' ')[0];
            newArr.push(firstNme);
            // innerList += `<li>${firstNme} Join !</li>`;
            
        })       
        chatMsgs.forEach(chatMsg=>{
            newArr.push(chatMsg.message);
            lastId=chatMsg.id;
           
            // innerList += `<li>${chatMsg.message}</li>`;
            
        })
        console.log(newArr);
        console.log(lastId);
        if(newArr!==undefined){
            oldArr.push([...newArr]);
            console.log(oldArr);
            localStorage.setItem('msgList',oldArr);
            newArr=[];
        }
        
        
        // displayMsg.innerHTML=innerList+`</ul>`;
    }catch(err){
        console.log(err);
    }
}
//
// setInterval(()=>gettingMsg(),1000)

// 
// 
const chatMsg=document.getElementById('chatMsg');
chatMsg.addEventListener('submit',async(e)=>{
    try{
        e.preventDefault();
        const chatMessage=e.target.message.value;
       const chatPost=await axios.post('http://localhost:3050/chat/chat',{chat:chatMessage},{headers:{'Authentication':token}});
    
        document.getElementById('message').value='';
    }catch(err){
        console.log(err);
    }
   
})
