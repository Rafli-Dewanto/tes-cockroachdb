import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})

app.post('/products', async (req, res) => {
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
});



app.listen(process.env.PORT, () => console.log(`listening on http://localhost:${process.env.PORT}`));