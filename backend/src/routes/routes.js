const {Router} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require('../models/item')

const router = Router();

router.post('/register', async (req,res)=>{
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let confirmPassword = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword,salt);

    const record = await user.findOne({email:email})
    if(record){
        return res.status(400).send({
            message: "Email is already registered"
        })
    }else{
        const userCred = new user({
            name:name,
            email:email,
            password:hashedPassword,
            confirmPassword:hashedConfirmPassword
        })

        const result = await userCred.save();

        //JWT token
        const {_id} = await result.toJSON()
        const token = jwt.sign({_id:_id},"secret")
        res.cookie("jwt",token,{
            httpOnly: true,
            maxAge: 24*60*60*1000
        })

        res.json({
            id:result._id
        })
    }
})

router.post('/login', async (req,res)=>{
    const record = await user.findOne({email:req.body.email})
    if(!record){
        return res.status(404).send({
            message: "User not found"
        })
    }
    if(!(await bcrypt.compare(req.body.password,record.password))){
        return res.status(404).send({
            message: "Incorrect Password"
        })
    }
    const token = jwt.sign({_id:record},"secret")
    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge: 24*60*60*1000
    })
    res.send({
        message: "success"
    })
})

router.post('/logout',(req,res)=>{
    res.cookie('jwt','',{maxAge: 0})
    res.send({message: "success"})
})

router.get('/user',async (req,res)=>{
    try{
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie,'secret')
        if(!claims){
            return res.status(401).send({
                message : UnAuthorized
            })
        }
        const record = await user.findOne({_id:claims._id});
        const {password,...data} = await record.toJSON()
        res.send(data);
    }catch(err){
        return res.status(401).send({
            message : UnAuthorized
        })
    }
})

module.exports = router;