import express from 'express';
const router = express.Router();

import categoryModel from '../models/category.model';
router.get('/', async (req, res) => {
    let result = await categoryModel.readMany(true)
    console.log("result",result)
}),
router.post('/', async (req, res) => {
    let result = await categoryModel.create(req.body)
    console.log("result",result)
}),
router.patch('/', async (req, res) => {
    let result = await categoryModel.update(1, { title: "hoa update" })
    console.log("resultUpdate",result)
})

module.exports = router;