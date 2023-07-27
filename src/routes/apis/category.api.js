import express from 'express';
const router = express.Router();

import categoryMiddleware from '../../middlewares/category.middleware'

import categoryController from '../../controllers/category.controller'
router.post('/',categoryMiddleware.createValidate,categoryController.create)
router.get("/",categoryMiddleware.readManyValidate,categoryController.readMany)
router.patch("/:categoryId",categoryMiddleware.updateValidate,categoryController.update)

module.exports = router;