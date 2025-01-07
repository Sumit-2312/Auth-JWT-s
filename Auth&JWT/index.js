const express = require("express");
const app = express();
app.use(express.json());

function generateToken() {
  const length = 24; // 
  const choices = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
  let token = ''; 

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * choices.length); 
    token += choices[randomIndex]; 
  }
  return token; 
}




const users = [];

app.post('/signup',function(req,res){

  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  })

  res.json({
    username: username,
    password: password
  })

  
console.log(users);
})

app.post('/signin',function(req,res){

  const username = req.body.username;
  const password = req.body.password;

 const foundedUser =  users.find((user)=>user.username === username && user.password === password);

 if(foundedUser){
  const token = generateToken();
  foundedUser.token = token;
  res.json({
    username: username,
    password: password,
    token: token
  })
 }
 else{
  res.send("No such user is signed up! Please sign up first")
 }

 
console.log(users);

})

app.get('/me',function(req,res){

  const token = req.headers.token;
  const tokenHolder = users.find((user)=> user.token === token);
  if(tokenHolder){
    res.send("You have got all your courses");
  }
  else{
    res.send("You are not signed in! Please Sign in first")
  }

  
console.log(users);

})




app.listen(3000);