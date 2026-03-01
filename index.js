
import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDB from './db/mongoDb.js';

const app = express();

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/subscriptions',subscriptionRouter)

await connectToDB()

app.get('/',(req,res)=>{
    res.send("Yay Server is running")
})

const PORT=process.env.PORT;

app.listen(PORT,async()=>{
    console.log(`Server running on PORT :${PORT}`);
})