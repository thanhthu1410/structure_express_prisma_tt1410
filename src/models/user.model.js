import express from 'express'
import { mySQL } from '../databases/mySQL'

module.exports = {
    getUsers: function () {
        return new Promise((resolve, reject) => {
            let queryString = `
            SELECT users.* FROM users
            `
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "lỗi trong quá trình truy vấn!",
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "Danh sách người dùng!",
                        data: result
                    }
                )
            })
        }).catch(
            error => {
                console.log('Error in getting users')
                return {
                    status: false,
                    message: "Something went wrong"
                }
            }

        )
    },
    getUserById: function (userId) {
        return new Promise((resolve, reject) => {
            let queryString = `
            SELECT users.* FROM users WHERE users.id = ${userId}
            `
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "lỗi trong quá trình truy vấn!",
                        }
                    )
                }
                if (result.length == 0) {
                    return resolve(
                        {
                            status: false,
                            message: "User not found!"
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "Danh sách người dùng theo Id!",
                        data: result
                    }
                )
            })
        }).catch(
            error => {
                console.log('Error in getting users')
                return {
                    status: false,
                    message: "Something went wrong"
                }
            }

        )
    },
    getUserDetailById: function (userId) {
        return new Promise((resolve, reject) => {
            let queryString = `
            SELECT users.*, user_address.id as addressId, user_address.name as addressName, user_address.provinceId, user_address.wardId
            FROM users
            LEFT JOIN user_address on users.id = user_address.userId
            WHERE users.id = ${userId}
            `
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "lỗi trong quá trình truy vấn!",
                        }
                    )
                }
                let user;
                for (let i in result) {
                    if (!user) {
                        user = {
                            id: result[i].id,
                            name: result[i].name,
                            email: result[i].email,
                            address: result[i].addressId
                                ? [
                                    {
                                        id: result[i].addressId,
                                        name: result[i].addressName,
                                        provinceId: result[i].provinceId,
                                        wardId: result[i].wardId
                                    }
                                ]
                                : []
                        }
                        continue;
                    }
                    user.address.push(
                        {
                            id: result[i].addressId,
                            name: result[i].addressName,
                            provinceId: result[i].provinceId,
                            wardId: result[i].wardId
                        }
                    )
                }

                if(!user){
                    return resolve(
                        {
                            status: false,
                            message: "User not found!"
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "Get detail user successfull",
                        data: user

                    }
                )
            })
        }).catch(
            error => {
                console.log('Error in getting users')
                return {
                    status: false,
                    message: "Something went wrong"
                }
            }

        )
    },
    createUser: function (newUser) {
        return new Promise((resolve, reject) => {
            let queryString = `
           INSERT INTO users SET ?
            `
            mySQL.query(queryString, newUser, async (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: err.code == 'ER_DUP_ENTRY' ? "Email đã tồn tại" : "lỗi trong quá trình truy vấn!",
                        }
                    )
                }
                let insertData = await this.getUserById(result.insertId)
                return resolve(
                    {
                        status: true,
                        message: "Thêm người dùng thành công",
                        data: insertData
                    }
                )
            })
        }).catch(
            error => {
                console.log('Error in getting users')
                return {
                    status: false,
                    message: "Something went wrong"
                }
            }

        )
    },
    deleteUser: function (userId) {
        return new Promise((resolve, reject) => {
            const queryString = `DELETE FROM users WHERE id=${userId}`
            mySQL.query(queryString, (err, result) => {
                if (err || result.affectedRows == 0) {
                    if(result.affectedRows == 0){
                        return resolve(
                            {
                                status: false,
                                message: "Không thể xóa vì userId khong ton tai"
                            }
                        )
                    }
                    return resolve(
                        {
                            status: false,
                            message: err.code == "ER_ROW_IS_REFERENCED_2"? "Tài khoản có liên kết khóa ngoại - không thể xóa" : "lỗi trong quá trình truy vấn!",
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: 'Xóa tài khoản thành công!'
                    }
                )
            })
        }).catch(
            error => {
                console.log('Error in getting users')
                return {
                    status: false,
                    message: "Lỗi hệ thống!"
                }
            }

        )
    },
    updateUser: function (userId,updateUser) {
        return new Promise((resolve, reject) => {
            const queryString = `UPDATE users
             SET name="${updateUser.name}", email="${updateUser.email}"
             WHERE id=${userId}`;

          
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    console.log("erro model");
                    return resolve(
                        {
                            status: false,
                            message: "lỗi trong quá trình truy vấn!",
                        }
                    )
                }
            
                return resolve(
                    {
                        status: true,
                        message:"Cập nhật người dùng thành công",
                        data: result
                    }
                )
            })
        }).catch(
            error => {
                console.log('Error in getting users')
                return {
                    status: false,
                    message: "Something went wrong"
                }
            }

        )
    },
    updateFieldUser: function (userId,patchData) {
        return new Promise((resolve, reject) => {
          let patchString = ``;
          for(let i in patchData){
            patchString += `${i}="${patchData[i]}",`
          }
          let queryString = `
            UPDATE users 
            SET ${patchString.substring(0,patchString.length - 1)}
            WHERE users.id=${userId}
          `
          
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    console.log("erro model");
                    return resolve(
                        {
                            status: false,
                            message: "lỗi trong quá trình truy vấn!",
                        }
                    )
                }
            
                return resolve(
                    {
                        status: true,
                        message:"Cập nhật người dùng thành công",
                        data: result
                    }
                )
            })
        }).catch(
            error => {
                console.log('Error in getting users')
                return {
                    status: false,
                    message: "Something went wrong"
                }
            }

        )
    }
   

}