
const signupForm=document.getElementById('signUp_form');
console.log(signupForm);

signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();    
    const nameI=e.target.name.value;
    const email=e.target.email.value;
    const phoneNo=e.target.phoneNo.value;
    const password=e.target.password.value;
    const signup_details={
        name:nameI,
        email:email,
        phoneNo:phoneNo,
        password:password,
    } 
    axios.post(`http://localhost:3050/user/signup`,signup_details)
    .then(response=>{        
            console.log(response.data.message); 
        if(response.status===200){
            MesageShow(response.data.message,'green');
            document.getElementById('name').value='';
            document.getElementById('email').value='';
            document.getElementById('phoneNo').value='';
            document.getElementById('password').value='';
            // window.location.href="../Login/login.html";
        }else{
            throw new Error('Aleary exits');
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

