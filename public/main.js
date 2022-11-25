export function MesageShow(msg,color){    
    const message=document.getElementById('message');
    const notification=document.createElement('h3');
    notification.innerHTML=msg;
    notification.style.color=color;
    message.appendChild(notification);
    setTimeout(()=>{
             notification.remove() },3000);

}

