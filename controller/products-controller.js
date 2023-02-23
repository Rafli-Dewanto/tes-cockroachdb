import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getProduct = async (req, res) => {
    try {
        const products = await prisma.product.findMany()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const product = await prisma.product.create({
            data: {
                name,
                price,
            },
        });
        res.status(201).json({
            message: 'data created',
            product,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}