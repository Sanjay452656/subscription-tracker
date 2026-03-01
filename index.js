
import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDB from './db/mongoDb.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/subscriptions',subscriptionRouter)

app.use(errorMiddleware);

await connectToDB()

app.get('/',(req,res)=>{
    res.send("Yay Server is running")
})

const PORT=process.env.PORT;

app.listen(PORT,async()=>{
    console.log(`Server running on PORT :${PORT}`);
})