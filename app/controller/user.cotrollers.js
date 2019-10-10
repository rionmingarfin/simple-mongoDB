"use strict"

const User = require('../models/user.models');
const JWT =require('jsonwebtoken');
require('dotenv/config')

function signToken(user){
    return JWT.sign({
        iss : 'codework',
        sub : user.id,
        iat : new Date().getTime(), //currenttime
        exp : new Date().setDate( new Date().getDate() +1)
    }, process.env.JWT_SCRET)
}
exports.signUp = async(req,res,next) =>{
  const email =req.body.email;
  const password = req.body.password;
 //check email
  const findEmail = await User.findOne({email});
  if (findEmail) {
     return res.status(404).json({message : 'email already exist'})
  }
  //create user 
  const newUser = new User ({email,password})
  await newUser.save()
  .then( data => {
      const token = signToken(newUser)
    return res.status(202).json({
        message : data,
        token : token
    })
  })
  .catch(error => {
    if (error) {
        res.status(404).send({
            message: `error catch${error.message}` || 'err cretaig to category'
        })
    }
  })
}
exports.signIn = (req,res,next) =>{
    const token = signToken(req.user);
    res.status(202).json({
        token : token
    });
}
exports.screet = (req,res,next) =>{
console.log('dapat')
res.json({screet : "resource"})
}