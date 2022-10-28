const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password, 
    task:req.body.task
  });
  try {
    const pre=await User.findOne({email:req.body.email});
    if(!pre){
      const user = await newUser.save();
      res.status(201).json(user);
    }else{
    pre&&res.status(403).json("User with this mail already found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){res.status(401).json("record not Found on this Email")}
    else{
     if(user.password !== req.body.password){
      res.status(401).json("Wrong password try again...");
     }
      else{
        const accessToken = jwt.sign(
          { id: user._id},
          'rahul',
          { expiresIn: "5d" }
          );
  
      const { password, ...info } = user._doc;
  
      res.status(200).json({ ...info, accessToken });
      }
      
      }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;