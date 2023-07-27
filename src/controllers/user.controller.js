import userModel from '../models/user.model';


module.exports = {
    getUsers: async function (req, res) {
        console.log(req.query);
        if (req.query.userId) {
            if (JSON.parse(req.query.detail)) {
                let result = await userModel.getUserDetailById(req.query.userId);
                if (result.status) {
                    return res.status(200).json(
                        {
                            message: result.message,
                            data: result.data
                        }
                    )
                } else {
                    return res.status(500).json({
                        message: result.message
                    })
                }
            } else {
                let result = await userModel.getUserById(req.query.userId);
                console.log(result)
                if (result.status) {
                    return res.status(200).json(
                        {
                            message: result.message,
                            data: result.data
                        }
                    )
                } else {
                 return res.status(500).json({
                        message: result.message,
                    })
                }
            }


        }

        let result = await userModel.getUsers();
        console.log(result)
        if (result.status) {
            return res.status(200).json(
                {
                    message: result.message,
                    data: result.data
                }
            )
        } else {
            res.status(500).json({
                message: result.message,
            })
        }
    },
    createUser: async function (req, res) {
        let result = await userModel.createUser(req.body);
        if (result.status) {
            return res.status(200).json(
                {
                    message: result.message,
                    data: result.data
                }
            )
        } else {
            res.status(500).json({
                message: result.message,
            })
        }
    },
    deleteUserById:async function (req,res){

        let result = await userModel.deleteUser(req.params.id)
        if (result.status) {
            return res.status(200).json(
                {
                    message: result.message,
                    data: result.data
                }
            )
        } else {
            return res.status(500).json({
                message: result.message
            })
        }
    },
    updateUserById : async  function (req,res){
        const id= req.params.id;
        let result = await userModel.updateUser(req.params.id,req.body )
        console.log("update by Id",id,"with body ",req.body );
        if (result.status) {
            return res.status(200).json(
                {
                    message: result.message,
                    data: result.data
                }
            )
        } else {
            res.status(500).json({
                message: result.message,
            })
        }

    },
    updateFieldUserById : async  function (req,res){

        let result = await userModel.updateFieldUser(req.params.id,req.body )
        if (result.status) {
            return res.status(200).json(
                {
                    message: result.message,
                    data: result.data
                }
            )
        } else {
            res.status(500).json({
                message: result.message,
            })
        }

    }

}