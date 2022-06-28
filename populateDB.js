require('dotenv').config();

const productModel=require('./models/products-model');

const connectDB=require('./db/connectDB');

const productsList=require('./products.json');



const start=async()=>{
    try{
        await connectDB();
        await productModel.deleteMany();
        await productModel.create(productsList)
        console.log('done');
        process.exit(0);
    }
    catch(err){
        console.log(err);
        process.exit(1);

    }
}

start();