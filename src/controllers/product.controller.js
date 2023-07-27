import productModel from "../models/product.model"

module.exports={
    getProducts : function(req,res){
        let result = productModel.getProducts()
        try{
            if(result.status){
                return res.status(200).json(
                    {
                        message : result.message,
                        data: result.data
                    }
                )
                
            }else{
                return res.status(500).json(
                    {
                        message: result.message
                    }
                )
            }
        }catch(err){
            return res.status(500).json({
                message : "loi truy van "
            })
        }
    },
    createProduct : function(req,res){
        let result = productModel.createProducts(req.body)
    }
}