
var message=document.getElementById('message');
var searchResult=document.getElementById('search-result');

var load1=document.querySelector('#load1');
var send1=document.querySelector('#send1');
var displayComments=document.querySelector('#displayComments');
var currentId=1;


document.querySelector('#next').addEventListener('click',function(){
currentId++;
check();

});

document.querySelector('#prev').addEventListener('click',function(){
currentId--;
check()
});

window.onload=function(){
    document.querySelector('#prev').style.display='none';
    var html=''
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){ 
            var obj=JSON.parse(xhr.response)
           for( var key in obj[0]){
            html+='<b>'+key+' :</b> '+obj[0][key]+'<br>'
           }        
           message.innerHTML=html
        }
    }
    xhr.open('GET','http://localhost:3004/posts?id='+1,true)
    xhr.send()
    loadComments()

}

document.querySelector('#myform').addEventListener('submit',function(e){
    e.preventDefault();
    var first=document.querySelector('input[name="first"]').value;
    var last=document.querySelector('input[name="last"]').value;
    var company=document.querySelector('input[name="company"]').value;
    var data ='first='+first+'&last='+last+'&company='+company
    console.log(data);
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            console.log(xhr.response);
        }
    }
    xhr.open('POST','http://localhost:3004/posts',true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
    xhr.send(data) 
    loadPage()
})
document.querySelector('#addcomment').addEventListener('click',function(){
    var comment=document.querySelector('#comments').value;
    var data ='postId='+currentId+'&body='+comment
    console.log(data);
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            loadComments()
        }
    }
    xhr.open('POST','http://localhost:3004/comments',true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
    xhr.send(data) 

})

document.querySelector('input[name="searchbar"]').addEventListener('keyup',function(){

    var html=''
    var search=document.querySelector('input[name="searchbar"]').value;
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            var obj=JSON.parse(xhr.response)
            for(let i=0;i<obj.length;i++){
                    html+='id: '+obj[i].id+'<br>'+'first name : '+obj[i].first+'<br>'+'last name: '+obj[i].last+'<br>'
                    +'Company: '+obj[i].company+'<br>';
            }      
            searchResult.innerHTML=html;
        }
    }
    xhr.open('GET','http://localhost:3004/posts?q='+search,true)
    xhr.send()

})
document.querySelector('#addcomment').addEventListener('click',function(){

})

function loadPage(){
    document.querySelector('#next').style.display='';
    if(currentId>1){
        document.querySelector('#prev').style.display='';
    } else{
        document.querySelector('#prev').style.display='none';
    }
   
    var html=''
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){ 
            var obj=JSON.parse(xhr.response)
           for( var key in obj[0]){
            html+='<b>'+key+' :</b> '+obj[0][key]+'<br>'
           }        
           message.innerHTML=html
        }
    }
    xhr.open('GET','http://localhost:3004/posts?id='+currentId,true)
    
    xhr.send()
    check()
    loadComments()
}
function loadComments(){
    var html=''
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){ 
            var obj=JSON.parse(xhr.response)
           for( var key in obj){
            html+='<b>Comment :</b> '+obj[key].body+'<br>'
           }        
           displayComments.innerHTML=html
        }
    }
    xhr.open('GET','http://localhost:3004/comments?postId='+currentId,true)
    xhr.send()

}



// GET

function makeGet(url){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            console.log(xhr.response);
            
        message.innerHTML=JSON.stringify(xhr.response);
        }
    }
    xhr.open('GET',url,true)
    xhr.send()
}
// POST
       
   function check(url,data){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){ 
            var obj=JSON.parse(xhr.response)
            
           if( currentId<obj.length){
            loadPage();
           }
           else{
            loadPage();
            document.querySelector('#next').style.display='none';  
           }
          
           
        }
    }
    xhr.open('GET','http://localhost:3004/posts',true)
    
    xhr.send()
   }