const groupFrom=document.getElementById('groupFrom');
const token=localStorage.getItem('token');


groupFrom.addEventListener('submit',async (e)=>{
    try{
        e.preventDefault();
        const name=e.target.groupName.value;
        const response=await axios.post('http://localhost:3050/group/creategroup',{name:name},{headers:{'Authentication':token}});
        console.log(response);
    }catch(err){
        console.log(err);
    }
   
})