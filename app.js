const express = require("express");
const bodyParser = require("body-parser");

const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.use(express.static("public"))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect("mongodb://127.0.0.1:27017/userDB1",{useNewUrlParser:true,useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

const userSchema ={
    email:String,
    password:String
}
const facts= "Brain information travels upto 268 miles per hour";



const User = new mongoose.model("User",userSchema);

app.get("/",(req , res)=> {
    res.render("home")
})

app.get("/login",(req , res)=> {
    res.render("login")
})

app.get("/register" ,(req , res)=>{
      res.render("register")
})

app.post("/register", function(req,res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.render("facts")
        }
    })
})

app.post("/login",function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email: username}, function(err , foundUser){
        if(err){
            console.log(err)
        }
        else{
            if(foundUser){
                if(foundUser.password === password){
                  res.render("facts")
                }
            }
        }
    })
})

app.get("/logout",(req,res)=>{
    res.render("login");
})

app.get("/submit", (req,res) =>{
    res.render("home")
})



app.listen(1111, function() {
    console.log("sucessfully")
})
