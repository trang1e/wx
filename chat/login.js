let imgArray = ['1','2','3','4','5'];

let leftArrow=document.getElementsByClassName('left-arrow')[0];
let rightArrow=document.getElementsByClassName('right-arrow')[0];

let userName=document.getElementsByClassName('user-name')[0];

let loginButton=document.getElementsByClassName('login-button')[0];

let errorMessage=document.getElementsByClassName('error-message')[0];

leftArrow.addEventListener('click',function(){
    imgArray.push(imgArray[0]);
    imgArray.shift();
    carouselImg();
});

rightArrow.addEventListener('click',function(){
    imgArray.unshift(imgArray[imgArray.length-1]);
    imgArray.pop();
    carouselImg();
});

function carouselImg(){
    for(let count=0; count<imgArray.length;count++){
        document.getElementsByTagName('img')[count].src='img/'+imgArray[count]+'.png';
        document.getElementsByTagName('img')[count].alt=imgArray[count]+'.png';

    }
}

loginButton.addEventListener('click',function(){
    if(userName.value === ''){
        errorMessage.innerHTML='Please Type Your Name';
        errorMessage.style.visibility='visible';
    }else if(userName.value.length>8){
        errorMessage.innerHTML='Your Name Cannot Over 8 Words';
        errorMessage.style.visibility='visible';
    }else{
        window.location.href=encodeURI('index.html?selectpicture='+document.getElementsByClassName('p3')[0].alt+'&username='+userName.value);
    }

});

document.onkeydown=function (event) {
    let e=event || window.event;
    if(e && e.keyCode ===13){
        loginButton.click();
    }
}