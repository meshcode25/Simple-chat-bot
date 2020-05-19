const express=require("express");
const app=express();
app.get("/",(req, res)=>{
    //res.send("hey love you, you are doing great");
    res.json({
        "Message": "now you know a little bit about json shit",
    })
})
function isValidTweet(tweeter){
    return  tweeter.name && tweeter.name.toString().trim()!=="" &&
            tweeter.tweet&&  tweeter.tweet.toString().trim()!=="";

}
app.post("/tweet", (req, res)=>{
    if (isValidTweet(req.body)){
        //insert into database
        const tweet= {
            name:req.body.name.toString(),
            tweet:req.body.tweet.toString(),
        }
        console.log(tweet); 
        
    }
    else{
        console.log("Your validation went great only that what you just inputed is bullshit");

    }
})


module.exports=app;