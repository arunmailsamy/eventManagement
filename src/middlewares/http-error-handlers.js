exports.httpErrors=(req,res,next)=>{
    res.status(400).json({
        message:'Invalid Route'
    })
}
exports.genericErrors = (err,req,res,next)=>{
    const{statusCode,message,data}=err;
    res.status(statusCode || 500).json({message,data});
}