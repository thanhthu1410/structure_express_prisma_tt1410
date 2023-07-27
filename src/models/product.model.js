import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
module.exports = {
    getProducts : async function(){
        let result = await prisma.products.findMany()
        console.log("resulf",result);
    },
    createProducts : async function(newProduct){
        let result = await prisma.products.create({
            data: newProduct
        })
        console.log("resulf",result);
    }
}