const users =require("../Models/userModel")
const jwt = require('jsonwebtoken')

exports.userRegister =async (req, res) => {

    const {username,password,email} = req.body

    console.log(req.body);

    try{

        const existinguser = await users.findOne({email})

        if(existinguser){

            res.status(401).json("User alredy Exist")
        }
        else{

            const newuser =new users({
                username,password,email,profile:"",github:"",linkedin:""

            })
            await newuser.save()
            res.status(200).json(newuser)
        }
    }

    catch(error){
        console.log(error);
        res.status(404).json(error)
    }

}



exports.userlogin = async(req,res)=>{

    const {email,password} = req.body

    try{
        const existinguser = await users.findOne({email,password})

        if(existinguser){

            
            const token = jwt.sign({email:existinguser.email,username:existinguser.username,userid:existinguser._id},process.env.Secret_key)
            const rest ={token,user:existinguser.username}
            res.status(200).json(rest)
        }

        else{

            res.status(406).json("Invaild Username/password")
        } 

    }

    catch(err){
        console.log(err);
        res.status(401).json(err)
    }

}