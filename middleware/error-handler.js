const errorHandlerMiddleware=(err,req,res,next)=>{
    console.log(error);
    res.status(500).json({msg:'An error has occured please try again'})

}


module.exports=errorHandlerMiddleware;