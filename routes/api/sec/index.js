const express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
const { use } = require("..");
const mailSender=require("../../../utils/mailer");
let SecModelClass=require('./sec.model.js');
let SecModel=new SecModelClass();

router.post('/login',async(req,res,next)=>{
    try {
        const {email,pswd}=req.body;
        let userLogged= await SecModel.getByEmail(email);
        if(userLogged){
            const isPswdOk= await SecModel.comparePassword(pswd, userLogged.password);
            if(isPswdOk){
                delete userLogged.password;
                delete  userLogged.oldpasswords;
                delete userLogged.laslogin;
                delete userLogged.lastpasswordchange;
                delete userLogger.passwordexpires;
                let payload={
                    jwt:jwt.sign(
                        {
                            email:userLogged.email,
                            _id:userLogged._id,
                            roles:userLogged.roles
                        },
                        process.env.JWT_SECRET,
                        {expiresIn:'1d'}

                    ),
                    user:userLogged
                };
                return res.status(200).json(payload);
            }
        }
        console.log({email,userLogged});
        return res.status(400).json({msg:"Credenciales no son válidas"});
    } catch (err) {
        console.log(err);
        res.status(500).json({"msg":"Error"});
    }
});

router.post('/signin',async(req,res,next)=>{
    try {
        const {email,pswd}=req.body;
        let userAdded=await SecModel.createNewUser(email,pswd);
        delete userAdded.password;
        console.log(userAdded);
        res.status(200).json({"msg":"usuario creado"});
    } catch (err) {
        res.status(500).json({"msg":"Error"});
        
    }
});
 module.exports=router; 