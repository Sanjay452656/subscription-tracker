import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter=Router();

subscriptionRouter.get('/',(req,res)=>res.send({title:'get all subscriptions'}))
subscriptionRouter.get('/:id',(req,res)=>res.send({title:'get subscription by id'}))
subscriptionRouter.post('/',authorize,createSubscription)
subscriptionRouter.put('/:id',(req,res)=>res.send({title:'update subscriptions'}))
subscriptionRouter.delete('/:id',(req,res)=>res.send({title:'delete subscriptions'}))
subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions)
subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({title:'cancel subscription'}))
subscriptionRouter.get('/upcoming-renewals',(req,res)=>res.send({title:'get upcoming renewals'}))



export default subscriptionRouter;