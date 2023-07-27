import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = {
    create: async function (newCategory) {
        try {
            let category = await prisma.Categories.create({
                data: newCategory
            })
            return {
                status: true,
                message: 'Thêm danh mục thành công!',
                result: category
            }

        } catch (err) {
            if (err.meta?.target == "Categories_title_key") {
                return {
                    status: false,
                    message: "Danh mục đã tồn tại"
                }
            }
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
    readMany: async function (status = undefined) {
        try {
            let categories = await prisma.Categories.findMany({
                where: status == undefined ? {
                    deleted: false
                } : {
                    status,
                    deleted: false
                }
            })
            return {
                status: true,
                message: status == undefined ? "get all successfull" : `lay danh muc ${status ? " dang hoat dong" : "da dung hoat dong"} thanh cong`,
                data: categories
            }

        } catch (err) {

            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
    update: async function (categoryId, categoryEditData) {

        try {
            let categoryEdited = await prisma.Categories.update({
                where: {
                    id: categoryId
                },
                data: categoryEditData
            })
            console.log("categoryEdited",categoryEdited.data);
            return {
                status: true,
                message: 'update successfull!',
                data: categoryEdited
            }

        } catch (err) {
            console.log("err model category",err)
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
}