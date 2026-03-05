import cron from 'node-cron'
import sendEmail from '../utils/sendEmails.js'
import Subscription from '../models/subscription.model.js'

const renewalReminderJob = ()=>{

    cron.schedule('* 9 * * *',async()=>{

        console.log('Running renewalReminder job');

        const today = new Date();
        const tommorrow = new Date(today);
        tommorrow.setDate(tommorrow.getDate()+1);

        try {
            const subscriptions = await Subscription.find({
                status:'active',
                reminderSent: true,
                renewalDate:{
                    $gte:today,
                    $lt:tommorrow   
                }
            }).populate('user')

            console.log("Subscriptions found:", subscriptions.length);

            for(const sub of subscriptions){
                console.log("Sending email to:", sub.user.email);
                await sendEmail({
                    email:sub.user.email,
                    subject:'Subscription Renewal Reminder',
                    message: `Hello ${sub.user.name},

Your subscription for ${sub.name} will renew on ${sub.renewalDate}.

Price: ${sub.price} ${sub.currency}

If you want to cancel it, please visit your dashboard.

Thanks
Subscription Tracker`
                })
            }
        } catch (error) {
            console.error('Error in renewalReminder job:',error);
        }
        
    })
}

export default renewalReminderJob;