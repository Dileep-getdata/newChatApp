const display=document.getElementById('displayMsg');
const token=localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', async ()=>{
    try{
        const displayMsg= document.getElementById('displayMsg');
        let innerList=`<ul>`
        const response=await axios.get(`http://localhost:3050/chat/chat`,{headers:{'Authentication':token}});
        const usersN=response.data.users;
        const chatMsgs=response.data.chat;
        usersN.forEach(user=>{
           
            const firstNme=(user.userName).split(' ')[0];
            innerList += `<li>${firstNme} Join !</li>`;
            
        })
       
        chatMsgs.forEach(chatMsg=>{
            innerList += `<li>${chatMsg.message}</li>`;
            
        })
        displayMsg.innerHTML=innerList+`</ul>`;

        
    }catch(err){
        console.log(err);
    }
   
})


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