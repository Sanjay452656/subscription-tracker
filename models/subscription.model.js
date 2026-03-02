import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Subscription name is required'],
        trim:true,
        minlength:2,
        maxlength:30,
    },
    price:{
        type:Number,
        required:[true,'Subscription price is required'],
        min:[0,'Price must be a positive number']
    },
    currency:{
        type:String,
        enum:['USD','EUR','GBP','INR'],
        default: 'INR'
    },
    frequency:{
        type:String,
        enum:['daily ,weekly','monthly','yearly'],
    },
    category:{
        type:String,
        enum:['entertainment','education','productivity','health','other'],
        required:[true,'Subscription category is required']
    },
    payment:{
        type:String,
        required:[true,'Payment method is required'],
        trim:true,
    },
    status:{
        type:String,
        enum:['active','expired','cancelled'],
        default:'active',
    },
    startDate:{
        type:Date,
        required:[true,'Subscripton start date is required'],
        validate:{
            validator:function(value){
                return value <= new Date();
            },
            message:'Start date cannot be in the future'
        }
    },
    renewalDate:{
        type:Date,
        validate:{
            validator:function(value){
                return value> this.startDate;
            },
            message:'End date must be after start date'
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User reference is required'],
        index:true,
    }
},{timestamps:true});

subscriptionSchema.pre('save', function () {
  if (!this.renewalDate) {
    const renewalIntervals = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalIntervals[this.frequency]
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }
});

const Subscription = mongoose.model('Subscription',subscriptionSchema);

export default Subscription;