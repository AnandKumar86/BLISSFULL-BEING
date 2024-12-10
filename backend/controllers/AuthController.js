// const bcrypt=require('bcrypt')
// const {UserModel,BookingModel}=require('../models/user')
// const jwt=require('jsonwebtoken')
// const signup=async(req,res)=>{
//     try{
//         const {name,email,password}=req.body
//         const user=await UserModel.findOne({email})
//         if(user){
//             return res.status(409).json({message:'user already exist',success:false})
//         }
//         const userModel=new UserModel({name,email,password})
//        userModel.password=await bcrypt.hash(password,10)
//        await userModel.save()
//        res.status(201).json({message:'signup successful',success:true})
//     }
//     catch(e){
//         res.status(500).json({message:'internal server error',success:false})
//     }
// }
//     const login=async(req,res)=>{
//         try{
//             const {email,password}=req.body
//             const user=await UserModel.findOne({email})
//             const errorMessage='Authentication Failed due to incorrect password and email or user not exist please register...'
//             if(!user){
//                 return res.status(403).json({message:errorMessage,success:false})
//             }
//             const isPassEqual=await bcrypt.compare(password,user.password)
//             if(!isPassEqual){
//                 return res.status(403).json({message:errorMessage,success:false})
//             }
            
//             const jwtToken=jwt.sign(
//                 {email:user.email,_id:user._id},
//                 process.env.JWT_SECRET,
//                 {expiresIn:'24h'}
//             )
          
           
//            res.status(201).json(
//             {message:'login successful',success:true,
//              jwtToken,
//              email,
//              name :user.name
//             },
            
//         )
//         }
//         catch(e){
//             res.status(500).json({message:'internal server error',success:false})
//         }
// }
// const bookSlot = async (req, res) => {
//     try {
//       const { name, mobile, email, appointmentDate, address } = req.body;
//       const newBooking = new BookingModel({
//         name,
//         mobile,
//         email,
//         appointmentDate,
//         address
//       });
//       await newBooking.save();
//       res.status(201).json({ message: 'Booking successful', success: true });
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error', success: false });
//     }
//   }
// module.exports={
//     signup,
//     login,
//     bookSlot
// }
const bcrypt = require('bcrypt');
const { UserModel, BookingModel } = require('../models/user');
const jwt = require('jsonwebtoken');

// Signup function
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful', success: true });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMessage = 'Authentication failed: incorrect email or password. Please register if you do not have an account.';

        if (!user) {
            return res.status(403).json({ message: errorMessage, success: false });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: errorMessage, success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Login successful',
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Booking function
const bookSlot = async (req, res) => {
    try {
        const { name, mobile, email, appointmentDate, address } = req.body;
        const newBooking = new BookingModel({
            name,
            mobile,
            email,
            appointmentDate,
            address
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking successful', success: true });
    } catch (error) {
        console.error("Error in booking:", error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    signup,
    login,
    bookSlot
};
