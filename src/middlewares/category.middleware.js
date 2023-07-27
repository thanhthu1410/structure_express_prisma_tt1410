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
    }
}