const Joi=require('joi')
const signUpValidation=(req,res,next)=>{
    const schema=Joi.object({
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(20).required()
    });
    const {error}=schema.validate( req.body );
    if(error){
        return res.status(400).json({message:'Bad request',error})
    }
    next();
}
const loginValidation=(req,res,next)=>{
    const schema=Joi.object({
       
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(20).required()
    });
    const {error}=schema.validate( req.body );
    if(error){
        return res.status(400).json({message:'Bad request',error})
    }
    next();
}
const bookingValidation = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      mobile: Joi.string().min(10).max(15).required(),
      email: Joi.string().email().required(),
      appointmentDate: Joi.date().required(),
      address: Joi.object({
        area: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        postalCode: Joi.string().required()
      }).required()
    });
  
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Bad request', error });
    }
    next();
  };
module.exports={
    signUpValidation,
    loginValidation,
    bookingValidation
}