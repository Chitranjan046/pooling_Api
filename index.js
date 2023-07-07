const Port=8080
const express=require('express')
const bodyParser=require('body-parser')
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
const db=require('./config/mongoose');

app.get("/", function(req, res){
       res.send("Chitranjan");
});
// Routes
app.use('/',require('./routes/index'));
   
app.listen(Port,function(err){
    if(err){
        console.log(err);
    }
    console.log("server is runing ...",Port);
})