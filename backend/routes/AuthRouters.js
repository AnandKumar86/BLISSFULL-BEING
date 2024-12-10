const {signUpValidation, loginValidation,bookingValidation}=require('../middleware/AuthValidation')
const {signup, login,bookSlot}=require('../controllers/AuthController')

const router=require('express').Router();




router.post('/login',loginValidation,login)
router.post('/signup',signUpValidation,signup)
router.post('/book', bookingValidation, bookSlot);
module.exports=router;