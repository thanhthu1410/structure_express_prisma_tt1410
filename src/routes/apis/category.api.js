import express from 'express';
const router = express.Router();

import categoryMiddleware from '../../middlewares/category.middleware'

import categoryController from '../../controllers/category.controller'
router.post('/',categoryMiddleware.createValidate,categoryController.create)

module.exports = router;