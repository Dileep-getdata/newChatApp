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