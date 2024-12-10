const express=require('express')
const app=express();

const bodyParser=require('body-parser');
const cors=require('cors')
const AuthRouters=require('./routes/AuthRouters')
require('dotenv').config();
require('./models/db')
app.use(express.static('public'));
const PORT=process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(cors())
app.use('/auth',AuthRouters)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})