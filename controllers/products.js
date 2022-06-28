const getProductsStatic=(req,res)=>{
    res.send('all productes static');
}

const getProducts=(req,res)=>{
    res.send('all products');
}



module.exports={
    getProductsStatic,getProducts
}