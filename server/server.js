const mongoose= require("mongoose");
const express= require("express");
const nodemon=require ("nodemon");
const cors= require("cors");

let app=express();
//Database shit
const uri="mongodb+srv://mesh:mesh@cluster0-5dcny.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri,{
    useUnifiedTopology:true, 
    useNewUrlParser:true,
})
 
 
    const Schema=mongoose.Schema;
    const tweetSchima= new Schema({
        name: String,
        tweet: String,
        date: {
            type: String,
            default:new Date(),
        },
    })
    
const tweetmodel= mongoose.model("tweetmodel", tweetSchima);

 app.use(cors());
app.use(express.json());
//routes
app.get("/tweet", async (req, res)=>{

  await   tweetmodel.find({})
                                    .then((tweetmodels)=>{
                                        console.log("name:", tweetmodels);
                                        res.json(tweetmodels);
                                    })
                                    .catch((error)=>{
                                        console.log("error:", error)
                                    })
    
  
                    
})
function isValidTweet(tweeter){
    return  tweeter.name && tweeter.name.toString().trim()!=="" &&
            tweeter.tweet&&  tweeter.tweet.toString().trim()!=="";

}
app.post("/tweet", async (req, res)=>{
    if (isValidTweet(req.body)){
        //insert into database
        const tweet= {
            name:req.body.name.toString(),
            tweet:req.body.tweet.toString(),
        }
        const savedtweet= new tweetmodel(tweet);
       await savedtweet.save(error=>{
            if(error){
                console.log("oops the tweet could not be saved to the database");
            }
            else{
                console.log("the tweet has been saved");
            }
        })
            
            res.json(savedtweet);
            console.log(savedtweet);
        
        
        
        
        
        
    }
    else{
        console.log("Your validation went great only that what you just inputed is bullshit");

    }
})


app.listen(8000,()=>{
    console.log("server running on http://localhost:8000");
})