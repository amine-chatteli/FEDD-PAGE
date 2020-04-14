
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
        if(xhr.readyState==4){ 
            var obj=JSON.parse(xhr.response)
            let html='<p class="post-top-style lead"><b>Name: </b>'+obj[0].name+'<b><br>Topic: </b>'
            +obj[0].topic+'<br></p><p class="post-style lead">'+obj[0].post+'</p>';
                  
           message.innerHTML=html
        }
    }
    xhr.open('GET','http://localhost:3004/posts?id='+1,true)
    xhr.send()
    loadComments()

}

document.querySelector('#myform').addEventListener('submit',function(e){
    e.preventDefault();
    var name=document.querySelector('input[name="name"]').value;
    var topic=document.querySelector('input[name="topic"]').value;
    var post=document.querySelector('textarea[name="post"]').value;
    var data ='name='+name+'&topic='+topic+'&post='+post;
    console.log(data);
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
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
        if(xhr.readyState==4){
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
        if(xhr.readyState==4){
            var obj=JSON.parse(xhr.response)
            for(let i=0;i<obj.length;i++){
                    html+='Name : '+obj[i].name+'<br>'+'Topic: '+obj[i].topic+'<br>'
                    +'Post: '+obj[i].post+'<br>';
            }      
            searchResult.innerHTML=html;
            searchResult.classList=' search-result search-result-style'
            if(search===''){
                searchResult.innerHTML='';
                searchResult.classList=' search-result'
            }
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
   
    
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){ 
            var obj=JSON.parse(xhr.response)
            let html='<p class="post-top-style lead"><b>Name: </b>'+obj[0].name+'<b><br>Topic: </b>'
            +obj[0].topic+'<br></p><p class="post-style lead">'+obj[0].post+'</p>';
                                    
           message.innerHTML=html
        }
    }
    xhr.open('GET','http://localhost:3004/posts?id='+currentId,true)
    
    xhr.send()
    
    loadComments()
}
function loadComments(){
    var html=''
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){ 
            var obj=JSON.parse(xhr.response)
           for( var key in obj){
            html+=`<ul class="comments-style lead"><li><span class="one-word">Comment:</span> ${obj[key].body}</li></ul>`
            
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
        if(xhr.readyState==4){
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
        if(xhr.readyState==4){ 
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