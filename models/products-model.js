const mongoose=require('mongoose');


const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"you must provide the name of the product"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    price:{
        type:Number,
        require:[true,'you must provide the price of the product']
    },
    date:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message:'{VALUE} is not supported'

        }
    }
})

const Product=mongoose.model('Product',productSchema);

module.exports=Product;
