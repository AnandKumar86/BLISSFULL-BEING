const mongoose=require('mongoose');
const mongo_url=process.env.MONGO_CONN;
mongoose.connect(mongo_url)
.then(()=>{
    console.log('connected to database')
})
.catch((err)=>{
    console.log('database Connection err'+err)
})
