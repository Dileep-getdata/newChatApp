const display=document.getElementById('displayMsg');
const token=localStorage.getItem('token');


// oldArr=localStorage.getItem('msgList').split(',');
var lastId=localStorage.getItem('lastId');
window.addEventListener('DOMContentLoaded', async ()=>{
    // 
    // gettingMsg();   
    getNumOfGroups();
    const getUser= await axios.get('http://localhost:3050/user/userList',{headers:{'Authentication':token}});
    const presentUser=getUser.data.presntUser;
    localStorage.setItem('phoneNo',presentUser);
    
   
})

async function gettingMsg(groupId){
    try{              
        let newArr=[];
        let lastId=localStorage.getItem('lastId');
        const response=await axios.get(`http://localhost:3050/chat/chat?lastId=${lastId}&groupId=${groupId}`,{headers:{'Authentication':token}});
        
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
    if(localStorage.getItem('msgList')!==null){
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
// 

// 
// 
async function getNumOfGroups(){
    const groupContainer =document.getElementById('groupContainer');
    let innerHtml=``;
    let grpss;
    const response=await axios.get(`http://localhost:3050/group/nubOfGroups`,{headers:{'Authentication':token}});
    response.data.userGrp.forEach(async groupId=>{        
        grpss=await axios.get(`http://localhost:3050/group/groupDetails?groupId=${groupId.groupId}`,{headers:{'Authentication':token}});
               
        innerHtml = `<button class="listOfGroups"  onclick="groupChat(${grpss.data.userGrp.id},'${grpss.data.userGrp.name}','${grpss.data.userGrp.createdBy}')">${grpss.data.userGrp.name}<br><small>${grpss.data.userGrp.createdBy}</small></button><br>`;
        groupContainer.innerHTML += innerHtml;
    });
     
}
// 

// 
async function groupChat(grpId,grpNme,createdBy){
    const loclphon=localStorage.getItem('phoneNo') ;
    
    if(loclphon===createdBy){
        const inviteSection=document.getElementById('inviteSection');  
    console.log(grpNme,grpId)
    document.getElementById('mainTitle').innerHTML=grpNme;   
    const invitaion=`<div  class="invitaion" style="float: left;">
    <button id="invite" onclick="inviteTo(${grpId})" >Invite</button>
    <div id="userList">
    </div>
    </div>`  
    
    inviteSection.innerHTML=invitaion;
   
    gettingMsg(grpId);
    displayMsg();
    }else{
        window.location.href='./chat.html';
    }
    

}
// 

// 

async function inviteTo(grpId){    
    const invitaion=document.getElementById('userList');
    const getUser= await axios.get('http://localhost:3050/user/userList',{headers:{'Authentication':token}});
    const presentUser=getUser.data.presntUser;
    const allUsers=getUser.data.listUsers;
    let innerHtml=``;
    allUsers.forEach(user=>{
        if(presentUser!==user.phoneNo){
            innerHtml += `<button class="listOfGroups" onclick="addToGrup('${grpId}','${user.phoneNo}')">${user.userName} </buttton><button onclick="deleteFromGrp('${grpId}','${user.phoneNo}')">X</button><br>`
            console.log(user);
        }
    })
    invitaion.innerHTML = innerHtml;
}
// 

// 
async function deleteFromGrp(groupId,userNo){
    const dltUser= await axios.post('http://localhost:3050/group/delete',{groupId,userNo},{headers:{'Authentication':token}});
    console.log(dltUser);
}



// 

// 
async function addToGrup(grpId,userNo){
    const addUser=await axios.post('http://localhost:3050/group/addToGroup',{grpId,userNo},{headers:{'Authentication':token}});
    console.log(addUser);
}