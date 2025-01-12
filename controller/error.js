exports.error = (req,res,next)=>{
    res.status(404).render('error',{title:"Error",path:"/error"});
}