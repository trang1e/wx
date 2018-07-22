let url=decodeURI(location.href).split('?')[1].split('&');

let chatContent=document.getElementsByClassName('chat-content')[0];

let editBox=document.getElementsByClassName('edit-box')[0];

let editButton=document.getElementsByClassName('edit-button')[0];

let userName=document.getElementsByClassName('user-name')[0];

let onlineCount=document.getElementsByClassName('online-count')[0];

userName.innerHTML=url[1].split('=')[1];

var userImg=document.getElementsByClassName('user-img')[0];

userImg.src='./img/'+url[0].split('=')[1];
let logOut=document.getElementsByClassName('log-out')[0];

editButton.addEventListener('click',sendMessage);

logOut.addEventListener('click',closePage);

document.onclick = function(event){
    let e=event || window.event;
    if(e && e.keyCode===13){
        if(editBox.value!==''){
            editButton.click();
        }
    }

}

function closePage() {
    let userAgent=navigator.userAgent;
    if(userAgent.indexOf("Firefox")!=-1 || userAgent.indexOf("Chrome")!=-1){
        window.location.href="about:blank";
    }else{
        window.opener=null;
        window.open("","_self");
        window.close();
    }

}

let socket=io();
socket.on('message',function(information){
   if(information.name!==userName.textContent){
       createOtherMessage(information);
   }
});

socket.on('connected',function(onlineCount){
    console.log(onlineCount);
    onlineCount.innerHTML='Online'+onlineCount;
});

socket.on('disconnected',function(onlineCount){
    console.log(onlineCount);
    onlineCount.innerHTML='Online'+onlineCount;
});

function sendMessage(){
    if(editBox.value!==''){
        let myInformation={
            name:userName.textContent,
            chatContent:editBox.value,
            img:userImg.src
        };
        socket.emit('message',myInformation);
        createMyMessage();
        editBox.value="";
    }
}


function createMyMessage(){
    let myMessageBox =document.createElement('div');
    myMessageBox.className='my-message-box';

    let messageContent =document.createElement('div');
    messageContent.className='message-content';
    let text=document.createElement('span');
    text.innerHTML=editBox.value;
    messageContent.appendChild(text);
    myMessageBox.appendChild(messageContent);

    let arrow=document.createElement('div');
    arrow.className='message-arrow';
    myMessageBox.appendChild(arrow);

    let userInformation = document.createElement('div');
    userInformation.className='user-information';
    let userChatImg=document.createElement('img');
    userChatImg.className='user-chat-img';
    userChatImg.src=userImg.src;
    let userChatName=document.createElement('div');
    userChatName.className='user-chat-name';
    userChatName.innerHTML=userName.textContent;
    userInformation.appendChild(userChatImg);
    userInformation.appendChild(userChatName);
    myMessageBox.appendChild(userInformation);
    chatContent.scrollTop=chatContent.scrollHeight;

}


function createOtherMessage(information){
    let otherMessageBox=document.createElement('div');
    otherMessageBox.className='other-message-box';
    let otherUserInformation =document.createElement('div');
    otherUserInformation.className='other-user-information';
    let userChatImg =document.createElement('img');
    userChatImg.className='user-chat-img';
    userChatImg.src=information.img;
    let userChatName=document.createElement('span');
    userChatName.className='user-chat-name';
    userChatName.innerHTML=information.name;
    otherUserInformation.appendChild(userChatImg);
    otherUserInformation.appendChild(userChatName);
    otherMessageBox.appendChild(otherUserInformation);

    let otherMessageArrow=document.createElement('div');
    otherMessageArrow.className='other-message-arrow';
    otherMessageBox.appendChild(otherMessageArrow);

    let otherMessageContent=document.createElement('div');
    otherMessageContent.className='other-message-content';
    let text=document.createElement('span');
    text.innerHTML=information.chatContent;
    otherMessageContent.appendChild(text);
    otherMessageBox.appendChild(otherMessageContent);
    chatContent.appendChild(otherMessageBox);
    chatContent.scrollTop=chatContent.scrollHeight;
}



