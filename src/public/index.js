const socket=io()

let chatBox=document.getElementById("chatBox")
chatBox.addEventListener("keyup",(evt)=>{
    if(chatBox.value.trim().length>0){
    
    if(evt.key==="Enter"){
        socket.emit("message",{message:chatBox.value.trim()})
        chatBox.value=""
    }
}
})