const getProductsStatic=(req,res)=>{
;
    throw new Error("fuck you ")
    res.send('all productes static')
}

const getProducts=(req,res)=>{
    res.send('all products');
}



module.exports={
    getProductsStatic,getProducts
}