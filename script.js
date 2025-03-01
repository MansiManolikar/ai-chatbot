let prompt=document.querySelector("#prompt");
let container=document.querySelector(".container");
let btn=document.querySelector("#btn");
let chatContainer=document.querySelector(".chat-container");
let userMessage=null;

let Api_Url=''//add here your gemini api

function createChatBox(html,className){
 let div=document.createElement("div");
 div.classList.add(className);
 div.innerHTML=html;
 return div
} 

function scrollToBottom() {
    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 300); // Adding a slight delay ensures smooth scrolling
}


async function getApiResponse(aiChatBox){
    let textElement=aiChatBox.querySelector(".text");
try{
let response=await fetch(Api_Url,{
    method:"POST",
    headers:{"Content-Type": "application/json"},

    body:JSON.stringify({contents: [{
        "parts":[{text:userMessage}]}]


    })
})

let data=await response.json();
console.log(data);
let apiResponse=data?.candidates[0].content.parts[0].text;
console.log(apiResponse);
textElement.innerText=apiResponse;
scrollToBottom();

                               /*chatContainer.scrollTop = chatContainer.scrollHeight;*/
}

catch(error){
    console.log(error);
    textElement.innerText = "Sorry, something went wrong. Please try again.";

}
finally{
    aiChatBox.querySelector(".loading").style.display="none";
    scrollToBottom();

    // chatContainer.scrollTop = chatContainer.scrollHeight;
}


}

function showLoading(){
    let html=`<div class="img">
    <img src="aibot.png" alt="" width="50">
    </div>
<p class="text"></p>


<img class="loading" src="loading.gif" alt="loading" height="50">`;
let aiChatBox=createChatBox(html,"ai-chat-box");
chatContainer.appendChild(aiChatBox);
scrollToBottom();

//chatContainer.scrollTop = chatContainer.scrollHeight;

getApiResponse(aiChatBox);
}


btn.addEventListener("click",()=>{
    userMessage=prompt.value;
    if(userMessage==""){
      container.style.display="flex";
    }
    {
        container.style.display="none"
    }
    if(!userMessage) return;
    let html=`<div class="img"><img src="user.png" alt="" width="50">
    </div>
<p class="text"></p>`;

let userChatBox=createChatBox(html,"user-chat-box");
userChatBox.querySelector(".text").innerText=userMessage;
chatContainer.appendChild(userChatBox);
prompt.value="";
scrollToBottom();

//chatContainer.scrollTop = chatContainer.scrollHeight;

setTimeout(showLoading,500);





})
