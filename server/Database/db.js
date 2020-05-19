const mongoose= require("mongoose");
 const uri="mongodb+srv://mesh:mesh@cluster0-5dcny.mongodb.net/test?retryWrites=true&w=majority";
const db_connect=()=>{
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
            default:Date.now(),
        },
    })
    
const tweetmodel= mongoose.model("tweetmodel", tweetSchima);
const data= {
    name: "meshack", 
    tweet: "i really really hope this works"
}
const savedtweet= new tweetmodel(data);
savedtweet.save(error=>{
    if(error){
        console.log("oops the tweet could not be saved to the database");
    }
    else{
        console.log("the tweet has been saved");
    }
}) 
    console.log("Database has just connected");
}


module.exports=db_connect;