const express=require('express');
require('dotenv').config();
const cors=require('cors');
const connection = require('./db');
const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');

const app=express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(blogRouter);

app.get('/',(req,res)=>{
   res.status(200).send({msg:"homepage"}); 
})

app.listen(process.env.PORT,async()=>{
try {
    await connection;
    console.log('connected')
    console.log(`running on ${process.env.PORT}`)
} catch (error) {
    console.log(error);
}

})
