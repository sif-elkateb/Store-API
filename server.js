require('dotenv').config();
require('express-async-errors');


const express= require('express');
const morgan =require('morgan');

const errorHandlerMiddleware=require('./middleware/error-handler');

const notFoundMiddleware=require('./middleware/not-found');

const startServer=require('./start-server');

const productsRouter=require('./routes/products-route');

const port=process.env.PORT||3000;

const app=express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(morgan('common'));




//routes

/*
   route app.get('/api/v1/products/static')   controller getProductsStatic  response {sucess,porductsList}
   route app.get('/api/v1/products')   controller getProducts               response {success,productsList}
*/

app.get('/',(req,res)=>{
    res.send('<h1>welcome to our Store API</h1>')
})

app.use('/api/v1/products',productsRouter);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);


startServer(app,port);




