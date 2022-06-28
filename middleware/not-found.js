const notFoundMiddleware=(req,res,next)=>{
    res.status(404).send('<h1>The Resource You Are Looking For Is Not Available</h1>');

}



module.exports=notFoundMiddleware;