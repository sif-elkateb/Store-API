require('dotenv').config();
require('express-async-errors');


const express= require('express');
const morgan =require('morgan');

const errorHandlerMiddleware=require('./middleware/error-handler');

const notFoundMiddleware=require('./middleware/not-found');

const port=process.env.PORT||3000;

const app=express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(morgan('common'));




//routes

app.get('/',(req,res)=>{
    res.send('<h1>welcome to our Store API</h1>')
})

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);


app.listen(port,()=>{
    console.log(`started listening at port ${port}`);
})
