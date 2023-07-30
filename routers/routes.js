const express= require('express')
const User= require('../Database/User')
const {registerValidation,LoginValidation}=require('../Middlewares/validation')
const verify= require('../Middlewares/Tokens')
const router= express.Router()
const {sign}=require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose= require('mongoose')


router.route('/register').get((req,res)=>{
    res.send('hello')
}).post(async (req,res)=>{

    //Validate the details    
    const validateErr= registerValidation(req.body)
    if(validateErr.error){
       return res.status(400).send(validateErr.error.details[0].message)
    }

    // Check if the user exists or not
    const EmailExist= await User.findOne({email:req.body.email})
   
    if(EmailExist){
       return res.send(' User already registered with same email')
    }

    // Hashing password
    const salt= await bcrypt.genSalt()
    const hashPassword= await bcrypt.hash(req.body.password,salt)

    const user= new User({
        name: req.body.name,
        email:req.body.email,
        password:hashPassword
    })
    const SavedUser= await user.save()
    res.send(SavedUser)
})

router.route('/login').post(async (req,res)=>{

    //Validate the details    
    const validateErr= LoginValidation(req.body)
    if(validateErr.error){
       return res.status(400).send(validateErr.error.details[0].message)
    }

    // Check if the user exists or not
    const user= await User.findOne({email:req.body.email})
   
    if(!user){
       return res.send(' User doesnt exist')
    }
    const validPass= await bcrypt.compare(req.body.password, user.password)
    if(!validPass){
        res.send('Password not matched')
    }
    
    // Create a token and send
    const token= sign({_id:user._id},process.env.SECRET_TOKEN)
    res.header('auth-token',token).send(token)
    
})

router.route('/posts').get(verify,(req,res)=>{
    res.json({
        title:'first post',
        description:'went to chicago'
    })
})



module.exports= router