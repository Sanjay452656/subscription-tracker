import { Router } from "express";

const subscriptionRouter=Router();

subscriptionRouter.get('/',(req,res)=>res.send({title:'get all subscriptions'}))

export default subscriptionRouter;