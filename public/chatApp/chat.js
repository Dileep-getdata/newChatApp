const display=document.getElementById('displayMsg');
const token=localStorage.getItem('token');

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3050/user/login',{headers:{'Authentication':token}})
})