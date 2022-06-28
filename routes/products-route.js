const express=require('express');

const productsRouter=express.Router();

const {getProductsStatic,getProducts}=require('../controllers/products');


productsRouter.route('/').get(getProducts);

productsRouter.route('/static').get(getProductsStatic);


module.exports=productsRouter;