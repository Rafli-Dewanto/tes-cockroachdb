import express from 'express';
import { getProduct, createProduct } from '../controller/products-controller.js'

export const router = express.Router()

router.get('/', getProduct)
router.post('/', createProduct)

