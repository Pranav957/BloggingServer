const User=require('../../../models/user')
const jwt=require('jsonwebtoken');

module.exports.createUser= async function(req,res)
{
    try {
        // const { email , password, name, lastName } = req.body;
       
        const user1 = await User.findOne({email:req.body.email});
        // console.log(req.body.email,"user:",user1);
        if(user1)
          return res.json(200, { message: "User with this email already exists" }); 

          if(req.body.password!=req.body.confirm_password)
          {
             return res.status(200).json({message:"password does not match"})
          }

        // console.log("here iam",req.body);
        const user = await User.create(req.body);
        return res.json(201, { message: "User Added successfully", user:user });
    } catch (error) {
        console.log("error",error);
        return res.json(500, { message: "Internal Server Error" });
    }
};


module.exports.updateUser= async function(req,res)
{
    try {
        const userId = req.params.id.trim();
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
            return res.json(404, { message: "User not found" });
        }
        return res.json(200, { message: "User updated successfully", user: user });
    } catch (error) {
        console.log("issue arrived",error);
        return res.json(500, { message: "Internal Server Error" });
    }
};


module.exports.getUserById= async function(req,res)
{
    try {
        const user = await User.findById(req.params.id,'-password');
        if (!user) {
            return res.json(404, { message: "User not found" });
        }
        return res.json(200, { message: "User found", user });
    } catch (error) {
        return res.json(500, { message: "Internal Server Error" });
    }
};


module.exports.getAllUsers= async function(req,res)
{
    try {
          const users = await User.find({},'-password').sort('-createdAt');
          return res.json(200, { message: "List of users", users });
        } catch (error) {
           return res.json(500, { message: "Internal Server Error" });
         }
};


module.exports.deleteUser= async function(req,res)
{
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.json(404, { message: "User not found" });
        }
        return res.json(200, { message: "User deleted successfully", user:deletedUser });
    } catch (error) {
        return res.json(500, { message: "Internal Server Error" });
    }
};


module.exports.createSession=async function(req,res)
{
    try{

        let user=await User.findOne({email:req.body.email});

        if(!user||user.password!=req.body.password)
        {
            return res.json(422,{
                message:"Invalid Username or Password"
            });
        }
        // let name=user.name

        return res.json(200,{
            message:'Sign in Successfull, here is your tocken please keep it safe!',
            data:{
                token:jwt.sign(user.toJSON(),"bloging",{expiresIn:'10000000'})
            }
        });
    }catch(err)
    {
        console.log('*****',err);
        return res.json(500,{message:"Internal Server Error"});
    }
}