
const loginForm=document.getElementById('login_form');
console.log(loginForm);

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    const login_details={        
        email:email,       
        password:password,
    } 
    axios.post('http://localhost:3050/user/login',login_details)
    .then(response=>{        
            console.log(response.data.message); 
        if(response.status===200){
            MesageShow(response.data.message,'green'); 
            localStorage.setItem('token',response.data.token);  
            // console.log(response.data.token);         
            document.getElementById('email').value='';            
            document.getElementById('password').value='';
            // window.location.href="../Login/login.html";
        }else{
            throw new Error('Register now');
        }       
        
    })
    .catch(err=>{
        console.log(err);
        MesageShow(err.response.data.message,'red');
    })        
    
})

 function MesageShow(msg,color){    
    const message=document.getElementById('message');
    const notification=document.createElement('h3');
    notification.innerHTML=msg;
    notification.style.color=color;
    message.appendChild(notification);
    setTimeout(()=>{
             notification.remove() },3000);

}

