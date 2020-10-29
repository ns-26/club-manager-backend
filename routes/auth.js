const express = require('express');

const router = express.Router();

const User = require('../models/User');
const joi = require('@hapi/joi')
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

//VALIDATION

const schema = joi.object( {
    username : joi.string().min(6).required(),
    password : joi.string().min(8).required()
});

router.post('/register', async (req,res)=>{

    //first validate
  const {error} = schema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  //check if username already exist
   const exist= await User.findOne({username:req.body.username});
   if(exist)return res.status(400).send('username already exist');

    //hash password
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(req.body.password,salt);


    const user = new User({

        username : req.body.username,
        password : hash


    });
    try{
        const newUser = await user.save();
        // res.send(newUser);
        return res.send('Registered!')

    }catch(err)
    {
      return  res.status(400).send(err);
    }
});

router.post('/login',async (req,res)=>{
 
        //first validate
  const {error} = schema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  // if exist
  const user = await User.findOne({username:req.body.username});
  if(!user)return res.status(400).send('username not exist');

  //comparing password
   const pass= await bcrypt.compare(req.body.password,user.password);
   if(!pass)return res.status(400).send('password is incorrect');

//token
   const token  =jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
   res.header('auth-token',token).send(token);

   res.send('logged in!');


});
module.exports = router;