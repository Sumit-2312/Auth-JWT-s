const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json())

const SECRET_KEY = "your_secret_key"; // Use a secure key in production


const users= [];

app.get("/signup",(req,res)=>{

  const username = req.body.username;
  const password =  req.body.password;

  users.push({
    username: username,
    password: password
  })

  res.json({
    username: username,
    password : password
  })
  console.log(users);

})


app.post('/signin',function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  const foundedUser =  users.find((user)=>user.username === username && user.password === password);
 if(foundedUser){
  // const token = generateToken();  in this approach we do not randomly generate the token rather we will use the JWT's
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" }); // Generate JWT with 1-hour validity

  // foundedUser.token = token; we do not add the token to the database now 


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


app.get("/me",(req,res)=>{

  const token = req.headers.token; // when user is signed in then for any kind of details he need to send its token with each request

  // try{
  //   const decoded = jwt.verify(token,SECRET_KEY);
  //   res.json({
  //     username: decoded.username
  //   })
  // }
  // catch{
  //   res.send("not an valid token")
  // }

  jwt.verify(token,SECRET_KEY,(err,decoded)=>{
    if(err){
      res.send("not an valid token")
    }
    else{
      res.json({
        username: decoded.username
      })
    }
  })

})

app.listen(3001);