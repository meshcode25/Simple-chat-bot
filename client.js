
const loading=document.querySelector(".loading");
const form=document.querySelector("#form");
const contain=document.querySelector(".contain");
const container=document.querySelector(".container");

const api_uri="http://localhost:8000/tweet";
loading.style.display="";
alltweets();

document.addEventListener("submit", (e)=>{
    e.preventDefault();
    const formdata= new FormData(form);
    const name=formdata.get("name");
    const tweet=formdata.get("tweet");

      if(name==="" || tweet===""){
        const disappear=()=>{
          const p=document.createElement("p");
          p.className="para";
        p.textContent="sorry you cannot leave the spaces blank!!";
        p.style.color="red";
        p.style.margin="-.4rem";
        container.insertBefore(p,form);
      
      }
      disappear();
      function clear(){
        document.querySelector(".para").remove();
      }
      setTimeout(clear,2000);
      
    }
      else{
        const tweets={
          name,
          tweet
      }
      form.reset();
      form.style.display="";    
      loading.style.display="";
  
  fetch(api_uri, {
          method: "POST",
          body: JSON.stringify(tweets),
          headers: {
            "content-type" : "application/json" 
          } 
          
        }).then(res=>res.json())
        .then(createdtweet=>{
          loading.style.display="none";
          let container= document.createElement("div");
          let para1=document.createElement("p");
          let para2=document.createElement("p");
          let span1=document.createElement("p");
          let span2=document.createElement("p");
          let button=document.createElement("button");
          container.className="whole";
           button.className="delete";
          span1.textContent=`ID:${createdtweet._id}`;
          span2.textContent=`${createdtweet.date}`;
          para1.textContent=`${createdtweet.name}`;
          para2.textContent=`${createdtweet.tweet}`;
          button.textContent="Delete Post";
          console.log(createdtweet);
          contain.innerHTML="";
          container.appendChild(span1);
          container.appendChild(para1);
          container.appendChild(para2);
          container.appendChild(span2);
          container.appendChild(button);
          contain.appendChild(container);       
      
          container.addEventListener("click", (e)=>{
            e.target.parentElement.remove();
            });
    })
          
  }
    
 });

 function alltweets(){
    fetch(api_uri)
                  .then(response=>response.json())
                  .then(tweetmodels=>{
                    tweetmodels.reverse();
                    tweetmodels.forEach((tweetmodel)=>{
                      let container= document.createElement("div");
          let para1=document.createElement("p");
          let para2=document.createElement("p");
          let span1=document.createElement("p");
          let span2=document.createElement("p");
          let button=document.createElement("button");
          container.className="whole";
           button.className="delete";
          span1.textContent=`ID:${tweetmodel._id}`;
          span2.textContent=`${tweetmodel.date}`;
          para1.textContent=`${tweetmodel.name}`;
          para2.textContent=`${tweetmodel.tweet}`;
          button.textContent="Delete Post";
          
          container.appendChild(span1);
          container.appendChild(para1);
          container.appendChild(para2);
          container.appendChild(span2);
          container.appendChild(button);
          contain.appendChild(container);       
 
          container.addEventListener("click", (e)=>{
            e.target.parentElement.remove();
            });
    

          })
        })         
    
      
}