const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltround = 10;

dotenv.config({path:'./config/config.env'});
app.use(express.urlencoded({extended:true}));

const users = [
    {username:'Tom', password:'$2b$10$p.Zep8PFKuoaZUPezPM/i.Tv9MvEGZeMNL75d550uxl6UrT9NBqAe'},
    {username:'Jack', password:'$2b$10$we835pwxs528g4lAnfZ0D.G5AhHLsoKpq3ujgmLco9g1nqXEbGBIe'},
]

app.get('/signup',(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
});

app.post('/signup',(req,res)=>{
    const {username, password} = req.body;

    bcrypt.hash(password,saltround, function(err,hash){

        if(err){
            res.send(err.message)
        }else{
            console.log(hash);
            res.redirect("/");
        }
    })

});

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/login.html");
});

app.post('/',(req,res)=>{
    const {username, password} = req.body;

    const user = users.find((user) => user.username === username);

    if(!user){
        res.send("Invalid User");
    }else{

        bcrypt.compare(password, user.password, function(err,result){
            console.log(result);
            if(result){
                res.redirect("/profile");
                
            }else{
                res.send("Invalid Password");
                
            }
        })
   
    }

});

app.get('/profile', (req,res)=>{
    res.sendFile(__dirname + "/profile.html");
});



app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})