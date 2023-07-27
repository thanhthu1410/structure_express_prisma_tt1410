module.exports = {
    getUserValidate : (req,res,next)=>{
        if(req.query.userId){
            if(isNaN(Number(req.query.userId)) || req.query.userId <= 0){
                return res.status(500).json(
                    {
                        message: "Invalid user Id"
                    }
                )
            }
            try{
                if(typeof JSON.parse(req.query.detail) != "boolean"){
                    return res.status(500).json(
                        {
                            message: "detail true - false"
                        }
                    )
                }
            }
            catch(err){
                return res.status(500).json(
                    {
                        message : "detail phai la true - false"
                    }
                )
            }
        }
        next();
    }}