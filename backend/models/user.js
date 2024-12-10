const mongoose=require('mongoose');
const Schema=mongoose.Schema
const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,},
    password:{type:String,required:true},
})
const bookingSchema = new Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    address: {
      area: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true }
    }
  });
  
  const BookingModel = mongoose.model('Booking', bookingSchema);
const UserModel=mongoose.model('users',userSchema)
module.exports={UserModel,BookingModel}