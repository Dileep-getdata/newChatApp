const display=document.getElementById('displayMsg');
const token=localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', async ()=>{
    try{
        const displayMsg= document.getElementById('displayMsg');
        let innerList=`<ul>`
        const response=await axios.get(`http://localhost:3050/chat/chat`,{headers:{'Authentication':token}});
        const usersN=response.data.users;
        usersN.forEach(user=>{
            const firstNme=(user.userName).split(' ')[0];
            innerList += `<li>${firstNme} Join !</li></ul>`
            console.log(user.userName);
        })
        displayMsg.innerHTML=innerList;

        
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
    
        console.log(chatPost);
        document.getElementById('message').value='';
    }catch(err){
        console.log(err);
    }
   
})