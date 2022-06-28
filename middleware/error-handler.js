const errorHandlerMiddleware=(err,req,res,next)=>{
    console.log(err);
    res.status(500).json({msg:'An error has occured please try again'})

}


module.exports=errorHandlerMiddleware;