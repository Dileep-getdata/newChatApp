const groupFrom=document.getElementById('groupFrom');
const token=localStorage.getItem('token');

groupFrom.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const name=e.target.groupName.value;
    const response=await axios.post('http://localhost:3050/group/creategroup',{headers:{'Authentication':token}},{name:name});
    console.log(response);
})