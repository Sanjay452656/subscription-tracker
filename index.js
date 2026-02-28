import express from 'express'
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.get('/',(req,res)=>{
    res.send("Yay Server is running")
})

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running on PORT :${PORT}`);
})