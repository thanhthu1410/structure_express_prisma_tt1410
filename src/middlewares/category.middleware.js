module.exports = {
    createValidate : function(req,res,next){
        if(req.body == undefined){
           return res.status(500).json({
                message: "truyen danh muc muon them"
            })
        }
        if(req.body.title?.length > 15 || req.body.title?.length < 6 || req.body.title == undefined ){
            return res.status(500).json({
                message: "tên danh mục từ 6-15 tự "
            })
        }
        if(req.body.avatar == undefined ){
            return res.status(500).json({
                message: "Them avatar cho danh muc "
            })
        }
        req.body = {
            title: req.body.title,
            avatar: req.body.avatar
        }
        next();
    },
    readManyValidate : function(req,res,next){
        try{
            if(req.query.status == undefined){
                next();
                return
            }
            let statusParam = JSON.parse(req.query.status)
            if(typeof statusParam != "boolean"){
               return res.status(500).json({
                    message :"status phai la boolean!"
                })
            }
            req.query.status = statusParam;
            next()
        }catch(err){
           res.status(500).json({
                message:"status phai la boolean !"
            })

        }
       
       
    },
    updateValidate: function(req, res, next) {
       
        if (isNaN(Number(req.params.categoryId)) || Number(req.params.categoryId) <= 0) {
            return res.status(500).json(
                {
                    message: "Category Id phải là số nguyên dương!"
                }
            )
        }
         
        req.params.categoryId = Number(req.params.categoryId)

        let fieldAccept = ["title", "status", "avatar"];

        for (let i in req.body) {
            if (fieldAccept.indexOf(i) == -1) {
                delete req.body[i];
            }else {
                if (i == "title") {
                    if (req.body.title?.length > 15 || req.body.title?.length < 6 || req.body.title == undefined) {
                        return res.status(500).json({
                            message: "Tên danh mục phải từ 6 tới 15 kí tự!"
                        })
                    }
                }

                if (i == "status") {
                    try {
                        let statusBody = JSON.parse(req.body.status)
                        if(typeof statusBody != "boolean") {
                            return res.status(500).json(
                                {
                                    message: "Status phải là boolean!"
                                }
                            )
                        }
                    }catch(err) {
                        return res.status(500).json(
                            {
                                message: "Status phải là boolean!"
                            }
                        )
                    }
                }

                if (i == "avatar") {
                    
                }
            }
        }
        

        if (JSON.stringify(req.body) === '{}') {
            return res.status(500).json(
                {
                    message: "Dữ liệu cập nhật không đúng format!"
                }
            )
        }


        next();
    },
}