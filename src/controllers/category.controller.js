 import categoryModel from "../models/category.model";
module.exports = {
    create: async function(req,res){
        console.log("vao controller create category",req.body);
        try{
            let result = await categoryModel.create(req.body);
            if(result.status){
                return res.status(200).json({
                    message : result.message,
                    data : result.data
                })
            }
            return res.status(500).json({
                message : result.message
            })

        }catch(err){
            return res.status(500).json({
                message : "loi khong truy van dc "
            })
        }
    },
    readMany: async function(req,res){
        console.log("vao read many",req.query.status);
        try{
            let result = await categoryModel.readMany(req.query.status);
            console.log("logggggg",result);
            if(result.status){
                return res.status(200).json({
                    message : result.message,
                    data : result.results
                })
            }
            return res.status(500).json({
                message : result.message
            })

        }catch(err){
            return res.status(500).json({
                message : "loi khong truy van dc "
            })
        }
    },
    update: async function(req,res){
        console.log("vao read many",req.params.categoryId);
        console.log("vao read many req.body",req.body);
        try{
            let result = await categoryModel.update(req.params.categoryId,req.body);
            console.log("logggggg",result);
            if(result.status){
                return res.status(200).json({
                    message : result.message,
                    data : result.data
                })
            }
            return res.status(500).json({
                message : result.message
            })

        }catch(err){
            return res.status(500).json({
                message : "loi khong truy van dc controller "
            })
        }
    }
}